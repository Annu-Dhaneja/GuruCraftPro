import sys
import os
from pathlib import Path

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), "backend"))

from core import auth

def get_hashes():
    p1 = "AnnuAd@#05628#Om"
    p2 = "Om@628752#Op"
    
    h1 = auth.get_password_hash(p1)
    h2 = auth.get_password_hash(p2)
    
    sql = f"""
-- 1. CREATE THE TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    hashed_password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. INSERT THE ADMINS
INSERT INTO users (name, email, username, hashed_password, role) 
VALUES 
('Annu Admin', 'annuad_05@annudesign.com', 'annuad@#05', '{h1}', 'admin'),
('Om Admin', 'om_op@annudesign.com', 'Om@Op', '{h2}', 'admin')
ON CONFLICT (username) DO NOTHING;
"""
    print(sql)

if __name__ == "__main__":
    get_hashes()
