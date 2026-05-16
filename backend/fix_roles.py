from sqlalchemy.orm import Session
from core.database import SessionLocal
from core.models import User, Role
import json

def fix_user_roles():
    db: Session = SessionLocal()
    try:
        print("Auditing existing user roles...")
        
        # 1. Ensure Roles exist
        default_roles = [
            {"name": "super-admin", "description": "Full system owner access", "permissions_json": json.dumps({"cms": ["*"], "users": ["*"], "forms": ["*"], "media": ["*"], "settings": ["*"]})},
            {"name": "admin", "description": "General administrative access", "permissions_json": json.dumps({"cms": ["read", "write", "delete"], "users": ["read", "write"], "forms": ["read", "write", "delete"], "media": ["read", "write", "delete"]})},
            {"name": "editor", "description": "Content editing access", "permissions_json": json.dumps({"cms": ["read", "write"], "media": ["read", "write"]})},
            {"name": "user", "description": "Standard user access", "permissions_json": json.dumps({"cms": ["read"]})},
        ]
        
        for r_data in default_roles:
            existing_role = db.query(Role).filter(Role.name == r_data["name"]).first()
            if not existing_role:
                db.add(Role(**r_data))
                print(f"Created role: {r_data['name']}")
        
        db.commit()

        # 2. Audit Users
        users = db.query(User).order_by(User.id).all()
        
        for i, user in enumerate(users):
            old_role = user.role
            
            # Enforce strict ID-based logic:
            # User 1 -> super-admin
            # User 2 -> admin
            # Everyone else -> user
            if i == 0:
                user.role = "super-admin"
            elif i == 1:
                user.role = "admin"
            else:
                user.role = "user"
            
            if old_role != user.role:
                print(f"Updated User ID {user.id} ({user.username}): {old_role} -> {user.role}")
            else:
                print(f"User ID {user.id} ({user.username}) remains: {user.role}")
        
        db.commit()
        print("Successfully synchronized user roles and permissions!")
    except Exception as e:
        print(f"Error fixing roles: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_user_roles()
