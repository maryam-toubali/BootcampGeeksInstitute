# The database config and engine setup

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin@localhost:5432/book_review_db"  # DATABASE_URL = "sqlite:///./books.db"  # SQLite database file in your project folder

# Create the engine that will interact with the database
engine = create_engine(SQLALCHEMY_DATABASE_URL)  # engine = create_engine( DATABASE_URL, connect_args={"check_same_thread": False})  # Needed for SQLite async


# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that our models will inherit from
Base = declarative_base()
