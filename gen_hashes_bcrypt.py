from passlib.context import CryptContext
import sys

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hash(password: str):
    return pwd_context.hash(password)

if __name__ == "__main__":
    p1 = "AnnuAd@#05628#Om"
    p2 = "Om@628752#Op"
    print(f"H1:{get_hash(p1)}")
    print(f"H2:{get_hash(p2)}")
