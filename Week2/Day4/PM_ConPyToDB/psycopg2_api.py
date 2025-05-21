import os
import logging
import psycopg2  # PostgreSQL database adapter for Python
from psycopg2 import sql  # Module for safely building SQL queries
from psycopg2.extras import RealDictCursor  # Returns results as dictionaries instead of tuples
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel  # For data validation
from typing import List, Optional  # Type hints
from dotenv import load_dotenv  # Environment variable management
from contextlib import contextmanager  # For creating context managers

# Configure logging - helps with debugging and monitoring
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Database connection parameters - loaded from environment variables with defaults
DB_CONFIG = {
    "dbname": os.getenv("POSTGRES_DB", "dev"),  # Database name
    "user": os.getenv("POSTGRES_USER", "postgres"),  # Database user
    "password": os.getenv("POSTGRES_PASSWORD", "Anzv10475"),  # Database password
    "host": os.getenv("POSTGRES_HOST", "localhost"),  # Database host
    "port": os.getenv("POSTGRES_PORT", "5432")  # Database port
}

# Initialize FastAPI application
app = FastAPI(title="User CRUD API with Psycopg2")

# Context manager for database connections
# This ensures connections are properly closed even if errors occur
@contextmanager
def get_db_connection():
    """Context manager for database connections
    
    Creates a connection to the PostgreSQL database and yields it.
    Ensures the connection is closed when done, even if exceptions occur.
    """
    conn = None
    try:
        # Establish connection to PostgreSQL
        conn = psycopg2.connect(**DB_CONFIG)
        yield conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")
    finally:
        # Always close the connection when done
        if conn is not None:
            conn.close()

# Pydantic models for request/response validation and documentation
class UserBase(BaseModel):
    """Base User model with common attributes"""
    username: str  # Required username field
    email: str     # Required email field
    full_name: Optional[str] = None  # Optional full name field

class UserCreate(UserBase):
    """Model for creating a new user (inherits from UserBase)"""
    pass

class User(UserBase):
    """Model for user responses, includes ID field"""
    id: int  # Database-assigned ID

# Create tables when application starts
@app.on_event("startup")
async def startup_db_client():
    """Initialize database on application startup
    
    Checks if the users table exists and creates it if needed.
    This runs once when the FastAPI application starts.
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Check if table exists in the database
                cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')")
                table_exists = cur.fetchone()[0]
                
                if not table_exists:
                    # Create the users table with proper constraints
                    cur.execute("""
                        CREATE TABLE users (
                            id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
                            username VARCHAR(100) UNIQUE NOT NULL,  -- Must be unique
                            email VARCHAR(150) UNIQUE NOT NULL,  -- Must be unique
                            full_name VARCHAR(200)  -- Optional
                        )
                    """)
                    conn.commit()
                    logger.info("Table 'users' created successfully")
                else:
                    logger.info("Table 'users' already exists")
        logger.info("Database initialization complete")
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

# API Endpoints
@app.get("/")
def read_root():
    """Root endpoint returning a welcome message"""
    return {"message": "User CRUD API with direct psycopg2 connection"}

@app.post("/users/", response_model=User)
def create_user(user: UserCreate):
    """Create a new user
    
    Args:
        user: User data from request body, validated by Pydantic
        
    Returns:
        Newly created user with assigned ID
        
    Raises:
        HTTPException: For database errors or constraint violations
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Insert user and get the newly created record
                cur.execute(
                    """
                    INSERT INTO users (username, email, full_name)
                    VALUES (%s, %s, %s)
                    RETURNING id, username, email, full_name
                    """,
                    (user.username, user.email, user.full_name)
                )
                new_user = cur.fetchone()  # Get the inserted row
                conn.commit()  # Save the changes
                logger.info(f"User created: {user.username}")
                return dict(new_user)
    except psycopg2.errors.UniqueViolation:
        # Handle username/email uniqueness constraint violations
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Username or email already exists: {user.username}, {user.email}")
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        # Handle any other errors
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100):
    """Get a list of users with pagination
    
    Args:
        skip: Number of records to skip (offset)
        limit: Maximum number of records to return
        
    Returns:
        List of users
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Query with limit and offset for pagination
                cur.execute(
                    """
                    SELECT id, username, email, full_name
                    FROM users
                    ORDER BY id
                    LIMIT %s OFFSET %s
                    """,
                    (limit, skip)
                )
                users = cur.fetchall()  # Get all results
                logger.info(f"Retrieved {len(users)} users")
                return [dict(user) for user in users]  # Convert each row to dict
    except Exception as e:
        logger.error(f"Error retrieving users: {e}")
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")

@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int):
    """Get a single user by ID
    
    Args:
        user_id: The ID of the user to retrieve
        
    Returns:
        User object if found
        
    Raises:
        HTTPException: If user not found or other errors
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Find user by ID
                cur.execute(
                    """
                    SELECT id, username, email, full_name
                    FROM users
                    WHERE id = %s
                    """,
                    (user_id,)  # Comma creates a tuple with one element
                )
                user = cur.fetchone()  # Get the first (and only) result
                if user is None:
                    logger.warning(f"User with ID {user_id} not found")
                    raise HTTPException(status_code=404, detail="User not found")
                
                logger.info(f"Retrieved user with ID: {user_id}")
                return dict(user)
    except HTTPException:
        # Re-raise HTTPExceptions (like 404) without modification
        raise
    except Exception as e:
        logger.error(f"Error retrieving user: {e}")
        raise HTTPException(status_code=500, detail=f"Error retrieving user: {str(e)}")

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: UserBase):
    """Update an existing user
    
    Args:
        user_id: ID of the user to update
        user: Updated user data from request body
        
    Returns:
        Updated user data
        
    Raises:
        HTTPException: For not found, constraint violations, or other errors
    """
    try:
        with get_db_connection() as conn:
            # First check if user exists
            with conn.cursor() as cur:
                cur.execute("SELECT 1 FROM users WHERE id = %s", (user_id,))
                if cur.fetchone() is None:
                    logger.warning(f"User with ID {user_id} not found for update")
                    raise HTTPException(status_code=404, detail="User not found")
            
            # Update the user
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s, email = %s, full_name = %s
                    WHERE id = %s
                    RETURNING id, username, email, full_name
                    """,
                    (user.username, user.email, user.full_name, user_id)
                )
                updated_user = cur.fetchone()  # Get updated row
                conn.commit()  # Save changes
                
                logger.info(f"Updated user with ID: {user_id}")
                return dict(updated_user)
    except psycopg2.errors.UniqueViolation:
        # Handle uniqueness constraint violations
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Username or email already exists during update")
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except HTTPException:
        # Re-raise HTTPExceptions without modification
        raise
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error updating user: {e}")
        raise HTTPException(status_code=500, detail=f"Error updating user: {str(e)}")

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    """Delete a user by ID
    
    Args:
        user_id: ID of the user to delete
        
    Returns:
        Success message
        
    Raises:
        HTTPException: If user not found or on error
    """
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Delete user and return the ID if successful
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    RETURNING id
                    """,
                    (user_id,)
                )
                deleted = cur.fetchone()  # Will be None if no user found
                conn.commit()  # Save changes
                
                if deleted is None:
                    logger.warning(f"User with ID {user_id} not found for deletion")
                    raise HTTPException(status_code=404, detail="User not found")
                
                logger.info(f"Deleted user with ID: {user_id}")
                return {"message": "User deleted successfully"}
    except HTTPException:
        # Re-raise HTTPExceptions without modification
        raise
    except Exception as e:
        conn.rollback() if 'conn' in locals() else None
        logger.error(f"Error deleting user: {e}")
        raise HTTPException(status_code=500, detail=f"Error deleting user: {str(e)}")

# Entry point for running the application directly
if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI application using Uvicorn server
    # - "psycopg2_api:app" refers to the app variable in this file
    # - reload=True enables auto-reload on code changes (development)
    uvicorn.run("psycopg2_api:app", host="0.0.0.0", port=8091, reload=True) 