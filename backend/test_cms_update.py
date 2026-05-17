import requests
import json

BASE_URL = "https://guru-craft-pro.vercel.app"

def test_flow():
    print("1. Requesting Admin Authorization Token...")
    login_url = f"{BASE_URL}/api/v1/auth/login"
    payload = {"username": "Annu_AD", "password": "Annu_AD#05@1!2000"}
    
    try:
        response = requests.post(login_url, data=payload, timeout=15)
        if response.status_code != 200:
            print(f"Login failed: HTTP {response.status_code}")
            print(response.text)
            return
            
        data = response.json()
        print(f"Login Response Data: {data}")
        token = data.get("access_token")
        if not token:
            print("Access token not found in response!")
            return
            
        print("Authorization Token successfully acquired!")
        
        # Define headers
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        # Let's perform a dynamic update of the about page component!
        print("\n2. Sending PUT update to /api/v1/cms/about...")
        update_url = f"{BASE_URL}/api/v1/cms/about"
        
        # Test content payload: Slightly update the description to verify real-time CMS modification
        update_payload = {
            "title": "Our Story | GuruCraft Studio",
            "components": [
                {
                    "name": "hero_centered",
                    "type": "hero_centered",
                    "props": {
                        "badge": "ABOUT THE STUDIO",
                        "title_prefix": "Where Artistry Meets",
                        "title_highlight": "Thoughtful Design",
                        "description": "We are a passionate team of designers, experience curators, and engineers dedicated to high-fidelity visual storytelling and luxury design execution."
                    }
                },
                {
                    "name": "process",
                    "type": "process",
                    "props": {
                        "title": "Our Bespoke Process",
                        "steps": [
                            {"title": "Discovery", "desc": "We deep-dive into your unique personality, brand goals, or dream wedding concepts."},
                            {"title": "Bespoke Design", "desc": "We craft custom sketches, color systems, and high-fidelity mockups for your review."},
                            {"title": "Exquisite Hand-Off", "desc": "We execute the final production with extreme precision, whether digital launch or live coordination."}
                        ]
                    }
                }
            ]
        }
        
        put_response = requests.put(update_url, headers=headers, json=update_payload, timeout=15)
        print(f"Response Status: HTTP {put_response.status_code}")
        
        if put_response.status_code == 200:
            print("SUCCESS: PUT Update successfully completed!")
            print("Response Data snapshot:")
            print(json.dumps(put_response.json(), indent=2)[:1000])
        else:
            print(f"FAILED: CMS update failed with status {put_response.status_code}")
            print(put_response.text)
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    test_flow()
