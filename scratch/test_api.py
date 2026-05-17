import requests

BASE_URL = "http://127.0.0.1:8000"

def test_login(username, password):
    print(f"\n[LOGIN] Testing login for {username}...")
    url = f"{BASE_URL}/api/v1/auth/login"
    data = {
        "username": username,
        "password": password
    }
    try:
        response = requests.post(url, data=data)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            res_data = response.json()
            print("Login Success!")
            print(f"Token: {res_data.get('access_token')[:30]}...")
            print(f"Role: {res_data.get('role')}")
            print(f"User: {res_data.get('user')}")
            return res_data.get("access_token")
        else:
            print(f"Login Failed: {response.text}")
    except Exception as e:
        print(f"Connection Error: {e}")
    return None

def test_cms_page(slug, token=None):
    print(f"\n[CMS] Testing CMS Page Fetch for '{slug}'...")
    url = f"{BASE_URL}/api/v1/cms/{slug}"
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    try:
        response = requests.get(url, headers=headers)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            page_data = response.json()
            print("CMS Content Fetch Success!")
            print(f"Page Title: {page_data.get('title')}")
            print(f"Slug: {page_data.get('slug')}")
            print(f"Status: {page_data.get('status')}")
            components = page_data.get('components', [])
            print(f"Number of Components: {len(components)}")
            if components:
                print("First Component Info:")
                print(f" - Name: {components[0].get('name')}")
                print(f" - Type: {components[0].get('type')}")
        else:
            print(f"CMS Content Fetch Failed: {response.text}")
    except Exception as e:
        print(f"Connection Error: {e}")

def test_admin_pages(token):
    print("\n[ADMIN] Testing Protected Admin endpoints...")
    endpoints = [
        "/api/v1/cms/pages",
        "/api/v1/admin/submissions",
        "/api/v1/auth/users"
    ]
    headers = {"Authorization": f"Bearer {token}"}
    for ep in endpoints:
        url = f"{BASE_URL}{ep}"
        try:
            response = requests.get(url, headers=headers)
            print(f"Endpoint {ep} -> Status Code: {response.status_code}")
            if response.status_code == 200:
                print(f" Success: Found {len(response.json())} items.")
            else:
                print(f" Failed: {response.text}")
        except Exception as e:
            print(f" Connection Error for {ep}: {e}")

if __name__ == "__main__":
    token = test_login("Annu_AD", "Annu_AD#05@1!2000")
    if token:
        test_cms_page("home")
        test_admin_pages(token)
    
    test_login("Om@Op", "Oma628752#Op")
