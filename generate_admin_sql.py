import sys
import os
from pathlib import Path

# Add backend to path to use the same hashing logic
backend_dir = r"e:\Project\virtual_try-main\backend"
sys.path.append(backend_dir)

from core import auth

def generate_sql():
    print("--- SQL ADMIN GENERATOR ---")
    username = input("Desired Username: ")
    email = input("Desired Email: ")
    name = input("Visible Name: ")
    password = input("Desired Password: ")
    
    hashed = auth.get_password_hash(password)
    
    sql = f"""
-- COPY AND RUN THIS SQL IN YOUR TERMINAL:
INSERT INTO users (name, email, username, hashed_password, role) 
VALUES ('{name}', '{email}', '{username}', '{hashed}', 'admin');
    """
    
    print("\n" + "="*30)
    print(sql)
    print("="*30)
    print("\nNote: Only run this on your Render PostgreSQL console.")

if __name__ == "__main__":
    generate_sql()
