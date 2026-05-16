import requests

base_url = "http://localhost:8000" # Assume default port
endpoint = "/api/v1/cms/media/bulk-url-import"

def test_unauthorized():
    print("Testing unauthorized access...")
    try:
        res = requests.post(f"{base_url}{endpoint}", json={"urls": []})
        print(f"Status: {res.status_code}")
        print(f"Response: {res.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_unauthorized()
