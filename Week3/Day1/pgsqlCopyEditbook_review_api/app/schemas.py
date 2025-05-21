# Pydantic schemas — used for validation of requests/responses

from pydantic import BaseModel, EmailStr  # BaseModel: Every schema you create will inherit from it.
from typing import Optional, List  # Optional: Used to mark a field as optional (it can be None).

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    role: str

    class Config:
        orm_mode = True

class BookBase(BaseModel):
    title: str
    author: str
    description: Optional[str]

class BookCreate(BookBase):
    pass

class BookCreate(BaseModel):
    title: str
    author: str
    description: Optional[str] = None

class BookOut(BookBase):
    id: int

    class Config:
        orm_mode = True

class ReviewBase(BaseModel):
    content: str
    rating: int

class ReviewCreate(ReviewBase):
    pass

class ReviewOut(ReviewBase):
    id: int
    user: UserOut

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
