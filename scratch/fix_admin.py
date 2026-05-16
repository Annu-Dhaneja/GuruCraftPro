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
    user = db.query(User).filter(User.username == "Annu_AD").first()
    if user:
        user.role = "SUPER_ADMIN"
        user.is_approved = True
        print(f"Fixed user {user.username}: role=SUPER_ADMIN, is_approved=True")
        db.commit()
    else:
        print("User Annu_AD not found.")
finally:
    db.close()
