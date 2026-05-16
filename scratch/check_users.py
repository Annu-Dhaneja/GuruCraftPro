import sys
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from core.models import User

# Explicitly use backend/sql_app.db
db_path = os.path.join(os.getcwd(), 'backend', 'sql_app.db')
engine = create_engine(f"sqlite:///{db_path}")
SessionLocal = sessionmaker(bind=engine)

db = SessionLocal()
try:
    print(f"Checking users in {db_path}...")
    users = db.query(User).all()
    if not users:
        print("No users found.")
    for u in users:
        print(f"User: '{u.username}', Role: '{u.role}', Approved: {u.is_approved}")
finally:
    db.close()
