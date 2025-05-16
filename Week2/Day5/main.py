import os
import logging
import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from contextlib import contextmanager

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database connection parameters
DB_CONFIG = {
    "dbname": os.getenv("POSTGRES_DB", "myapp"),
    "user": os.getenv("POSTGRES_USER", "postgres"),
    "password": os.getenv("POSTGRES_PASSWORD", "admin"),
    "host": os.getenv("POSTGRES_HOST", "localhost"),
    "port": os.getenv("POSTGRES_PORT", "5432")
}

# Initialize FastAPI app
app = FastAPI(title="User CRUD API with Psycopg2")

# Context manager for safe database connection
@contextmanager
def get_db_connection():
    conn = None
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        yield conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")
    finally:
        if conn is not None:
            conn.close()

# Pydantic models
class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

# Auto-create users table if it doesn't exist
@app.on_event("startup")
async def startup_db_client():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(100) UNIQUE NOT NULL,
                        email VARCHAR(150) UNIQUE NOT NULL,
                        full_name VARCHAR(200)
                    )
                """)
                conn.commit()
                logger.info("Checked and ensured users table exists")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

# Root test endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the User CRUD API"}

# Create user
@app.post("/users/", response_model=User)
def create_user(user: UserCreate):
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    INSERT INTO users (username, email, full_name)
                    VALUES (%s, %s, %s)
                    RETURNING id, username, email, full_name
                """, (user.username, user.email, user.full_name))
                conn.commit()
                return cur.fetchone()
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        conn.rollback()
        logger.error(f"Create user error: {e}")
        raise HTTPException(status_code=500, detail="Error creating user")

# Get all users
@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100):
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, username, email, full_name
                    FROM users
                    ORDER BY id
                    LIMIT %s OFFSET %s
                """, (limit, skip))
                return cur.fetchall()
    except Exception as e:
        logger.error(f"Get users error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving users")

# Get user by ID
@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int):
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
                user = cur.fetchone()
                if user is None:
                    raise HTTPException(status_code=404, detail="User not found")
                return user
    except Exception as e:
        logger.error(f"Get user error: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving user")

# Update user
@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: UserBase):
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("SELECT id FROM users WHERE id = %s", (user_id,))
                if cur.fetchone() is None:
                    raise HTTPException(status_code=404, detail="User not found")

                cur.execute("""
                    UPDATE users
                    SET username = %s, email = %s, full_name = %s
                    WHERE id = %s
                    RETURNING id, username, email, full_name
                """, (user.username, user.email, user.full_name, user_id))
                conn.commit()
                return cur.fetchone()
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        conn.rollback()
        logger.error(f"Update user error: {e}")
        raise HTTPException(status_code=500, detail="Error updating user")

# Delete user
@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM users WHERE id = %s RETURNING id", (user_id,))
                deleted = cur.fetchone()
                conn.commit()
                if deleted is None:
                    raise HTTPException(status_code=404, detail="User not found")
                return {"message": "User deleted successfully"}
    except Exception as e:
        conn.rollback()
        logger.error(f"Delete user error: {e}")
        raise HTTPException(status_code=500, detail="Error deleting user")
