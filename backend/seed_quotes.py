# seed_quotes.py

import sqlite3
from faker import Faker
import random
from datetime import datetime, timedelta

DB_NAME = 'quotes.db'
fake = Faker()

roof_types = ['Metal', 'TPO', 'Foam', 'Asphalt', 'PVC']
states = ['AZ', 'CA', 'TX', 'NV', 'CO', 'FL', 'NY', 'WA']
num_records = 1000

def seed():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    for _ in range(num_records):
        contractor_name = fake.name()
        company = fake.company()
        roof_size = round(random.uniform(1000, 8000), 2)
        roof_type = random.choice(roof_types)
        city = fake.city()
        state = random.choice(states)
        days_ago = random.randint(0, 730)  # Last 2 years
        project_date = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%d')

        cursor.execute("""
            INSERT INTO quotes (contractor_name, company, roof_size, roof_type, city, state, project_date)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (contractor_name, company, roof_size, roof_type, city, state, project_date))

    conn.commit()
    conn.close()
    print(f"Inserted {num_records} fake records into {DB_NAME}")

if __name__ == "__main__":
    print("Seeding database...")
    seed()
    