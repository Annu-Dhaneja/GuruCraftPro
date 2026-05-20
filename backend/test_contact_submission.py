import urllib.request
import urllib.parse
import json

# Configurations
BASE_URL = "https://gurucraft-pro-backend.vercel.app/api/v1"
ADMIN_USER = "Annu_AD"
ADMIN_PASS = "Annu_AD#05@1!2000"

def submit_form(data):
    """Submits form data as application/x-www-form-urlencoded to backend contact endpoint."""
    url = f"{BASE_URL}/contact/"
    payload = urllib.parse.urlencode(data).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "VerificationAgent/1.0"
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            return True, res_data
    except Exception as e:
        return False, str(e)

def login_and_fetch_submissions():
    """Logs in as admin and fetches the contact submissions list from backend."""
    # 1. Login
    url = f"{BASE_URL}/auth/login"
    login_data = urllib.parse.urlencode({
        "username": ADMIN_USER,
        "password": ADMIN_PASS
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=login_data, headers={
        "Content-Type": "application/x-www-form-urlencoded"
    })
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            access_token = res_data.get("access_token")
            token_type = res_data.get("token_type", "Bearer")
            print("OK: Admin login successful. Token acquired.")
    except Exception as e:
        print(f"ERROR: Admin login failed: {e}")
        return None

    # 2. Fetch submissions
    sub_url = f"{BASE_URL}/admin/submissions"
    req_sub = urllib.request.Request(sub_url, headers={
        "Authorization": f"{token_type} {access_token}"
    })
    
    try:
        with urllib.request.urlopen(req_sub, timeout=10) as response:
            submissions = json.loads(response.read().decode('utf-8'))
            return submissions
    except Exception as e:
        print(f"ERROR: Failed to fetch submissions: {e}")
        return None

def verify():
    print("====================================================")
    print("VERIFYING CONTACT FORM PIPELINE IN PRODUCTION")
    print("====================================================")

    # Test Case 1: Submit Normal Inquiry
    print("\n[Test 1] Submitting a clean contact form request...")
    clean_lead = {
        "name": "Production Test Lead",
        "email": "test-lead@example.com",
        "phone": "+91 9876543210",
        "company": "Test Org",
        "inquiry_type": "web",
        "message": "This is a verification lead sent to check the database and flow pipelines.",
        "budget": "small",
        "deadline": "4 weeks",
        "page_source": "/request"
    }
    
    success_1, result_1 = submit_form(clean_lead)
    if success_1:
        print(f"OK: Clean submission success: {result_1}")
        lead_id = result_1.get("id")
    else:
        print(f"ERROR: Clean submission failed: {result_1}")
        return

    # Test Case 2: Submit Spam Inquiry
    print("\n[Test 2] Submitting a request with Honeypot website field filled (Bot simulation)...")
    spam_lead = {
        "name": "Spam Bot 5000",
        "email": "spambot@spam.com",
        "inquiry_type": "web",
        "message": "Click here to buy spam things!",
        "website": "http://spambot.com"
    }
    
    success_2, result_2 = submit_form(spam_lead)
    if success_2:
        print(f"OK: Spam submission accepted: {result_2}")
        spam_id = result_2.get("id")
    else:
        print(f"ERROR: Spam submission failed: {result_2}")
        return

    # Test Case 3: Fetch submissions from database and check properties
    print("\n[Test 3] Fetching latest submissions from database via admin API...")
    subs = login_and_fetch_submissions()
    if subs is None:
        return
        
    print(f"OK: Retrieved {len(subs)} submissions.")
    
    # Locate our submitted leads
    clean_lead_db = next((s for s in subs if s.get("id") == lead_id), None)
    spam_lead_db = next((s for s in subs if s.get("id") == spam_id), None)
    
    print("\n[Test 4] Verifying submission properties in database:")
    
    if clean_lead_db:
        print("OK: Clean Lead details in DB:")
        print(f"  - Name: {clean_lead_db.get('name')}")
        print(f"  - Phone: {clean_lead_db.get('phone')} (Expected: +91 9876543210)")
        print(f"  - Page Source: {clean_lead_db.get('page_source')} (Expected: /request)")
        print(f"  - Status: {clean_lead_db.get('status')} (Expected: new)")
        print(f"  - Client IP: {clean_lead_db.get('ip_address')}")
        print(f"  - Client Device: {clean_lead_db.get('device_metadata')}")
    else:
        print(f"ERROR: Could not find clean lead ID {lead_id} in DB.")
        
    if spam_lead_db:
        print("\nOK: Spam Lead details in DB:")
        print(f"  - Name: {spam_lead_db.get('name')}")
        print(f"  - Status: {spam_lead_db.get('status')} (Expected: spam)")
    else:
        print(f"ERROR: Could not find spam lead ID {spam_id} in DB.")

if __name__ == "__main__":
    verify()
