import requests

def test_remote_login():
    url = "https://virtual-trys.onrender.com/api/v1/auth/login"
    
    print(f"Testing GET {url}...")
    r_get = requests.get(url)
    print(f"GET Status: {r_get.status_code}")
    print(f"GET Response: {r_get.text}")
    
    print(f"\nTesting POST {url} with empty data...")
    r_post = requests.post(url)
    print(f"POST Status: {r_post.status_code}")
    print(f"POST Response: {r_post.text}")

if __name__ == "__main__":
    test_remote_login()
