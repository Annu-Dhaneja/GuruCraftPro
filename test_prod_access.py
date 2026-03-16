import requests

PROD_URL = "https://virtual-trys.onrender.com/api/v1/auth/login"

def test_prod_login():
    print(f"--- TESTING PRODUCTION LOGIN: {PROD_URL} ---")
    try:
        # Testing with Annu's credentials
        res = requests.post(
            PROD_URL,
            data={"username": "annuad@#05", "password": "annuad@#05"},
            timeout=15
        )
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            print("SUCCESS: Production server is reachable and accepting credentials.")
        elif res.status_code == 401:
            print("FAILED: Unauthorized. Please Ensure you ran the SQL block on the production DB.")
        else:
            print(f"FAILED: Server returned {res.status_code}")
            print(f"Response: {res.text}")
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")

if __name__ == "__main__":
    test_prod_login()
