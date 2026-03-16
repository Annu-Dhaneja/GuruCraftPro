import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from core import database, models, auth
from sqlalchemy.orm import Session

def check_users():
    try:
        db = next(database.get_db())
        users = db.query(models.User).all()
        print(f"Total Users: {len(users)}")
        for user in users:
            print(f"User: {user.username}, Role: {user.role}, Hash Pref: {user.hashed_password[:10] if user.hashed_password else 'NONE'}")
            if user.hashed_password:
                try:
                    # Test if passlib can even read it
                    is_valid = auth.verify_password("wrong_pass", user.hashed_password)
                    print(f"  Verify 'wrong_pass' result: {is_valid} (no crash)")
                except Exception as e:
                    print(f"  CRASH during verify: {str(e)}")
            else:
                print("  WARNING: This user has no password hash!")
    except Exception as e:
        print(f"ERROR: {str(e)}")

if __name__ == "__main__":
    check_users()
