import sqlite3
import os

DB_PATH = 'database.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    c = conn.cursor()
    
    # Create genes table
    c.execute('''
        CREATE TABLE IF NOT EXISTS genes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            sequence TEXT NOT NULL,
            length INTEGER NOT NULL
        )
    ''')
    
    # Create guides table
    c.execute('''
        CREATE TABLE IF NOT EXISTS guides (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gene_id INTEGER,
            sequence TEXT NOT NULL,
            pam TEXT NOT NULL,
            position INTEGER NOT NULL,
            efficiency_score REAL,
            FOREIGN KEY(gene_id) REFERENCES genes(id)
        )
    ''')
    
    # Create off_targets table
    c.execute('''
        CREATE TABLE IF NOT EXISTS off_targets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guide_id INTEGER,
            off_target_count INTEGER,
            specificity_score REAL,
            risk_level TEXT,
            FOREIGN KEY(guide_id) REFERENCES guides(id)
        )
    ''')
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized.")
