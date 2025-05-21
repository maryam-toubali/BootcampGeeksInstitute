# SQLAlchemy models — the structure of database
#    | Table  | Related To  | Relationship |
#    | ------ | ----------- | ------------ |
#    | User   | Reviews     | One-to-Many  |
#    | Book   | Reviews     | One-to-Many  |
#    | Review | User & Book | Many-to-One  |

from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship  # define relationships (links) between tables.
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)  # index=True means it’ll be searchable.
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)  # Stores the user's password in a hashed format (not plain text).
    role = Column(String, default="user")  # 'user' or 'admin'
    reviews = relationship("Review", back_populates="user")

class Book(Base):
    __tablename__ = "books"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author = Column(String)
    description = Column(Text)
    reviews = relationship("Review", back_populates="book")

class Review(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    rating = Column(Integer)
    user_id = Column(Integer, ForeignKey("users.id"))  # ForeignKey here means each Review points to one User
    book_id = Column(Integer, ForeignKey("books.id"))
    user = relationship("User", back_populates="reviews")
    book = relationship("Book", back_populates="reviews")

