import requests

def test_cms_home():
    url = "http://localhost:8000/api/v1/cms/home"
    try:
        response = requests.get(url)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("Response Data:")
            print(response.json())
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Fetch Error: {e}")

if __name__ == "__main__":
    test_cms_home()
