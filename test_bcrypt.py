from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

long_password = "a" * 100
truncated = long_password[:72]
print(f"Length: {len(truncated)}")

try:
    hashed = pwd_context.hash(truncated)
    print("Hashed successfully")
    
    verified = pwd_context.verify(truncated, hashed)
    print(f"Verified: {verified}")
    
    # Check if verify fails with 100 chars
    print("Testing with 100 chars...")
    verified_long = pwd_context.verify(long_password, hashed)
    print(f"Verified long: {verified_long}")
except Exception as e:
    print(f"Error: {e}")
