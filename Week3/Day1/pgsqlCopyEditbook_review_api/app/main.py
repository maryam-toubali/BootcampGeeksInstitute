# The entry point of the app — where the FastAPI app starts and routes/middleware are added

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from . import models, schemas, crud, auth, database, dependencies
from .middleware import AuthMiddleware

# Create all tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

app.add_middleware(AuthMiddleware)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user)

@app.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/books", response_model=schemas.BookOut)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db), user=Depends(dependencies.get_current_user)):
    return crud.create_book(db, book)

@app.get("/books", response_model=list[schemas.BookOut])
def read_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_books(db, skip=skip, limit=limit)

@app.put("/books/{book_id}", response_model=schemas.BookOut)
def update_book(book_id: int, book: schemas.BookCreate, db: Session = Depends(get_db), user=Depends(dependencies.get_current_user)):
    db_book = crud.get_book(db, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    # Optional: check if user is owner or admin, but here assume all can update
    return crud.update_book(db, book_id, book)

@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(book_id: int, db: Session = Depends(get_db), admin=Depends(dependencies.get_admin_user)):
    crud.delete_book(db, book_id)
    return

@app.post("/books/{book_id}/review", response_model=schemas.ReviewOut)
def add_review(book_id: int, review: schemas.ReviewCreate, db: Session = Depends(get_db), user=Depends(dependencies.get_current_user)):
    db_book = crud.get_book(db, book_id)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return crud.create_review(db, review, user.id, book_id)

@app.get("/books/{book_id}/reviews", response_model=list[schemas.ReviewOut])
def read_reviews(book_id: int, db: Session = Depends(get_db)):
    return crud.get_reviews_by_book(db, book_id)

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db), admin=Depends(dependencies.get_admin_user)):
    crud.delete_user(db, user_id)
    return

