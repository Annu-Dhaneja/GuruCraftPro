import requests

url = "https://virtual-trys.onrender.com/health"

def check_health():
    try:
        print(f"Checking: {url}")
        response = requests.get(url, timeout=15)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_health()
