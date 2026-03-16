import bcrypt
from passlib.context import CryptContext

def test_bcrypt():
    pc = CryptContext(schemes=["bcrypt"], deprecated="auto")
    password = "annuad@#05"
    h = pc.hash(password)
    print(f"Password: {password}")
    print(f"Hash: {h} (Len: {len(h)})")
    
    try:
        is_valid = pc.verify(password, h)
        print(f"Verification Success: {is_valid}")
    except Exception as e:
        print(f"Verification Error: {e}")

    # Test long password
    long_pwd = "a" * 73
    try:
        pc.hash(long_pwd)
        print("Long password hashed successfully (Passlib might have handled it)")
    except Exception as e:
        print(f"Long password hash error: {e}")

    # Test direct bcrypt
    try:
        salt = bcrypt.gensalt()
        bcrypt.hashpw(password.encode(), salt)
        print("Direct bcrypt success")
    except Exception as e:
        print(f"Direct bcrypt error: {e}")

if __name__ == "__main__":
    test_bcrypt()
