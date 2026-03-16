import requests
import json

BASE_URL = "http://localhost:8000/api/v1"

def test_login_cases():
    print("--- STARTING LOGIN TEST CASES ---")
    
    # Case 1: Valid Credentials (Annu)
    print("\nCase 1: Valid Login (annuad@#05)")
    try:
        res = requests.post(
            f"{BASE_URL}/auth/login",
            data={"username": "annuad@#05", "password": "annuad@#05"}
        )
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            token = res.json().get("access_token")
            print(f"Success! Token received (starts with): {token[:10]}...")
        else:
            print(f"Failed: {res.text}")
    except Exception as e:
        print(f"Error connecting to backend: {e}")

    # Case 2: Valid Credentials (Om)
    print("\nCase 2: Valid Login (Om@Op)")
    try:
        res = requests.post(
            f"{BASE_URL}/auth/login",
            data={"username": "Om@Op", "password": "Om@Op"}
        )
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print(f"Success! Token received.")
        else:
            print(f"Failed: {res.text}")
    except Exception as e:
        print(f"Error: {e}")

    # Case 3: Invalid Password
    print("\nCase 3: Invalid Password")
    res = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": "annuad@#05", "password": "wrongpassword"}
    )
    print(f"Status: {res.status_code} (Expected 401)")
    
    # Case 4: Non-existent User
    print("\nCase 4: Invalid Username")
    res = requests.post(
        f"{BASE_URL}/auth/login",
        data={"username": "ghost_user", "password": "password"}
    )
    print(f"Status: {res.status_code} (Expected 401)")

    print("\n--- TESTS COMPLETED ---")

if __name__ == "__main__":
    test_login_cases()
