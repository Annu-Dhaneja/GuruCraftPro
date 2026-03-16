import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api/v1/consultation"

def test_generate_plan(style):
    print(f"\n--- Testing Style: {style} ---")
    payload = {
        "start_date": datetime.now().strftime("%Y-%m-%d"),
        "style_preference": style
    }
    
    try:
        response = requests.post(f"{BASE_URL}/generate", json=payload)
        response.raise_for_status()
        data = response.json()
        
        if data["status"] == "success":
            print(f"Success! Received plan for {len(data['plan'])} days.")
            for day in data["plan"]:
                print(f"Day {day['day']} ({day['phase']}): {day['title']}")
        else:
            print(f"Error: {data}")
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    styles = ["Formal", "Casual", "Traditional", "Fusion"]
    for style in styles:
        test_generate_plan(style)
