# books.py
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session

app = FastAPI()

# Create DB tables (run-once safe)
models.Base.metadata.create_all(bind=engine)

# Serve static files (JS, CSS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates folder
templates = Jinja2Templates(directory="templates")


# ----------------------
# Pydantic schema (request validation)
# ----------------------
class BookSchema(BaseModel):
    title: str = Field(min_length=1)
    author: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=100)
    rating: int = Field(gt=-1, lt=101)

    class Config:
        orm_mode = True  # allows Pydantic to read SQLAlchemy objects


# ----------------------
# DB dependency
# ----------------------
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


# ----------------------
# Frontend route (serves templates/index.html)
# ----------------------
@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# ----------------------
# API routes (under /api/books)
# ----------------------
@app.get("/api/books")
def read_books(db: Session = Depends(get_db)):
    return db.query(models.Books).all()


@app.post("/api/books")
def create_book(book: BookSchema, db: Session = Depends(get_db)):
    book_model = models.Books()
    book_model.title = book.title
    book_model.author = book.author
    book_model.description = book.description
    book_model.rating = book.rating

    db.add(book_model)
    db.commit()
    db.refresh(book_model)  # load DB-generated fields (id)
    return book_model


@app.put("/api/books/{book_id}")
def update_book(book_id: int, book: BookSchema, db: Session = Depends(get_db)):
    book_model = db.query(models.Books).filter(models.Books.id == book_id).first()
    if book_model is None:
        raise HTTPException(status_code=404, detail=f"id {book_id} does not exist")

    book_model.title = book.title
    book_model.author = book.author
    book_model.description = book.description
    book_model.rating = book.rating

    db.add(book_model)
    db.commit()
    db.refresh(book_model)
    return book_model


@app.delete("/api/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book_model = db.query(models.Books).filter(models.Books.id == book_id).first()
    if book_model is None:
        raise HTTPException(status_code=404, detail=f"id {book_id} does not exist")

    db.delete(book_model)
    db.commit()
    return {"message": "deleted"}
