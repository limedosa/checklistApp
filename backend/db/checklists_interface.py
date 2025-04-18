import json
import os
from datetime import datetime, timezone

# Local database setup
DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DB_DIR, "localChecklist.json")

# Initialize local database if it doesn't exist
def ensure_db_exists():
    os.makedirs(DB_DIR, exist_ok=True)
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w") as db:
            json.dump({"checklists": {}}, db)

ensure_db_exists()

def load_db():
    try:
        with open(DB_FILE, "r") as db:
            return json.load(db)
    except (json.JSONDecodeError, FileNotFoundError):
        # If the file is empty, not valid JSON, or doesn't exist, initialize it
        data = {"checklists": {}}
        save_db(data)
        return data

def save_db(data):
    with open(DB_FILE, "w") as db:
        json.dump(data, db, indent=2)

# Checklist functions
def create_checklist(data):
    db = load_db()
    checklist_id = data.get("id")
    if not checklist_id:
        checklist_id = str(len(db["checklists"]) + 1)
        data["id"] = checklist_id
    
    current_time = datetime.now(timezone.utc).isoformat()
    if "created_at" not in data:
        data["created_at"] = current_time
    
    data["updated_at"] = current_time
    db["checklists"][checklist_id] = data
    
    save_db(db)
    return checklist_id

def get_checklist(checklist_id):
    db = load_db()
    return db["checklists"].get(checklist_id)

def update_checklist(checklist_id, data):
    db = load_db()
    if checklist_id not in db["checklists"]:
        return False
    
    current_checklist = db["checklists"][checklist_id]
    updated_checklist = {**current_checklist, **data}
    updated_checklist["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    db["checklists"][checklist_id] = updated_checklist
    save_db(db)
    return True

def delete_checklist(checklist_id):
    db = load_db()
    if checklist_id in db["checklists"]:
        del db["checklists"][checklist_id]
        save_db(db)
        return True
    return False

def list_checklists(filters=None):
    db = load_db()
    if not filters:
        return list(db["checklists"].values())
    
    filtered_checklists = [
        checklist for checklist in db["checklists"].values()
        if all(checklist.get(key) == value for key, value in filters.items())
    ]
    return filtered_checklists

def create_tables():
    """Initialize the local database file with checklists structure."""
    ensure_db_exists()
    return True