import sqlite3
import os

# Use local SQLite database file
DB_FILE = os.path.join(os.path.dirname(__file__), '..', 'db.sqlite3')

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS analysis_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            resume_name TEXT,
            jd_snippet TEXT,
            score INTEGER,
            matched_skills TEXT,
            missing_skills TEXT,
            suggestions TEXT
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS job_descriptions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Initialize tables on load
init_db()

def save_analysis(resume_name, jd_text, match_results):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('''
            INSERT INTO analysis_history 
            (resume_name, jd_snippet, score, matched_skills, missing_skills, suggestions)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            resume_name,
            jd_text[:100] + "...",
            match_results.get("match_score"),
            ",".join(match_results.get("matched_skills", [])),
            ",".join(match_results.get("missing_skills", [])),
            ",".join(match_results.get("suggestions", []))
        ))
        conn.commit()
    except Exception as e:
        print(f"Error saving to SQLite: {e}")
    finally:
        if 'conn' in locals():
            conn.close()

# --- Job Descriptions CRUD ---

def get_all_jobs():
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('SELECT id, title, description FROM job_descriptions ORDER BY id DESC')
        rows = c.fetchall()
        jobs = []
        for row in rows:
            jobs.append({
                "id": str(row["id"]),
                "title": row["title"],
                "description": row["description"]
            })
        return jobs
    except Exception as e:
        print(f"Error getting jobs: {e}")
        return []
    finally:
        if 'conn' in locals():
            conn.close()

def get_job(job_id):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('SELECT id, title, description FROM job_descriptions WHERE id = ?', (job_id,))
        row = c.fetchone()
        if row:
            return {
                "id": str(row["id"]),
                "title": row["title"],
                "description": row["description"]
            }
        return None
    except Exception as e:
        print(f"Error getting job: {e}")
        return None
    finally:
        if 'conn' in locals():
            conn.close()

def create_job(title, description):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('INSERT INTO job_descriptions (title, description) VALUES (?, ?)', (title, description))
        conn.commit()
        return str(c.lastrowid)
    except Exception as e:
        print(f"Error creating job: {e}")
        return None
    finally:
        if 'conn' in locals():
            conn.close()

def update_job(job_id, title, description):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('UPDATE job_descriptions SET title = ?, description = ? WHERE id = ?', (title, description, job_id))
        conn.commit()
        return c.rowcount > 0
    except Exception as e:
        print(f"Error updating job: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()

def delete_job(job_id):
    try:
        conn = get_connection()
        c = conn.cursor()
        c.execute('DELETE FROM job_descriptions WHERE id = ?', (job_id,))
        conn.commit()
        return c.rowcount > 0
    except Exception as e:
        print(f"Error deleting job: {e}")
        return False
    finally:
        if 'conn' in locals():
            conn.close()
