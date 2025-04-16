from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
from datetime import date
import logging
from fastapi.middleware.cors import CORSMiddleware


DB_NAME = 'quotes.db'

# Logger setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow this specific origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Pydantic model for input validation
class Quote(BaseModel):
    contractor_name: str
    company: str
    roof_size: float
    roof_type: str
    city: str
    state: str
    project_date: date
    

# Create table if it doesn’t exist
def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contractor_name TEXT,
            company TEXT,
            roof_size REAL,
            roof_type TEXT,
            city TEXT,
            state TEXT,
            project_date TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# POST: Add a quote
@app.get("/quotes")
def get_quotes(state: str = None, roof_type: str = None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    logger.info(f"Retrieving quotes with state={state}, roof_type={roof_type}")

    query = "SELECT * FROM quotes"
    params = []

    if state and roof_type:
        query += " WHERE state = ? AND roof_type = ?"
        params = [state, roof_type]
    elif state:
        query += " WHERE state = ?"
        params = [state]
    elif roof_type:
        query += " WHERE roof_type = ?"
        params = [roof_type]

    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    quotes = [
        {
            "id": row[0],
            "contractor_name": row[1],
            "company": row[2],
            "roof_size": row[3],
            "roof_type": row[4],
            "city": row[5],
            "state": row[6],
            "project_date": row[7]
        }
        for row in rows
    ]

    return quotes

#add a quote
@app.post("/quotes")
def add_quote(quote: Quote):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO quotes (contractor_name, company, roof_size, roof_type, city, state, project_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        quote.contractor_name,
        quote.company,
        quote.roof_size,
        quote.roof_type,
        quote.city,
        quote.state,
        quote.project_date.isoformat()
    ))

    conn.commit()
    conn.close()

    logger.info(f"Quote added: {quote}")
    return {"message": "Quote added successfully"}