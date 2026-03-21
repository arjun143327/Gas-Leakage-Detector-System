import sqlite3
from datetime import datetime

DB_FILE = 'gas_data.db'

def init_db():
    conn = sqlite3.connect(DB_FILE)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS readings (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            ppm       INTEGER NOT NULL,
            status    TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            ppm       INTEGER NOT NULL,
            status    TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def save_reading(ppm, status):
    conn = sqlite3.connect(DB_FILE)
    conn.execute('INSERT INTO readings (ppm, status, timestamp) VALUES (?,?,?)',
                 (ppm, status, datetime.now().isoformat()))
    conn.commit()
    conn.close()

def save_alert(ppm, status):
    conn = sqlite3.connect(DB_FILE)
    conn.execute('INSERT INTO alerts (ppm, status, timestamp) VALUES (?,?,?)',
                 (ppm, status, datetime.now().isoformat()))
    conn.commit()
    conn.close()

def get_recent_readings(limit=60):
    conn = sqlite3.connect(DB_FILE)
    rows = conn.execute(
        'SELECT ppm, status, timestamp FROM readings ORDER BY id DESC LIMIT ?',
        (limit,)).fetchall()
    conn.close()
    return [{'ppm': r[0], 'status': r[1], 'timestamp': r[2]} for r in reversed(rows)]

def get_recent_alerts(limit=10):
    conn = sqlite3.connect(DB_FILE)
    rows = conn.execute(
        'SELECT ppm, status, timestamp FROM alerts ORDER BY id DESC LIMIT ?',
        (limit,)).fetchall()
    conn.close()
    return [{'ppm': r[0], 'status': r[1], 'timestamp': r[2]} for r in rows]
