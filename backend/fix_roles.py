from sqlalchemy.orm import Session
from core.database import SessionLocal
from core.models import User

def fix_user_roles():
    db: Session = SessionLocal()
    try:
        print("Auditing existing user roles...")
        users = db.query(User).order_by(User.id).all()
        
        for user in users:
            old_role = user.role
            # Enforce: ID 1 and 2 are Admin, others are User
            if user.id <= 2:
                user.role = "admin"
            else:
                user.role = "user"
            
            if old_role != user.role:
                print(f"Updated User ID {user.id} ({user.username}): {old_role} -> {user.role}")
            else:
                print(f"User ID {user.id} ({user.username}) already has correct role: {user.role}")
        
        db.commit()
        print("Successfully synchronized user roles!")
    except Exception as e:
        print(f"Error fixing roles: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_user_roles()
