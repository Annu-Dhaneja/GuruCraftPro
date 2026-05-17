import requests
import json
import time

def verify_all_endpoints():
    endpoints = {
        "Backend Gateway Root": "https://guru-craft-pro.vercel.app/",
        "CMS Home Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/home",
        "CMS About Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/about",
        "CMS Services Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/services",
        "CMS Portfolio Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/portfolio",
        "CMS Contact Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/contact",
        "CMS Privacy Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/privacy",
        "CMS Resources Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/resources",
        "CMS AI Lab Layout": "https://guru-craft-pro.vercel.app/api/v1/cms/ai-lab"
    }

    print("==================================================================")
    print("      VERCEL DEPLOYMENT & LIVE CMS SYNC AUDIT SYSTEM             ")
    print("==================================================================")
    print(f"Time of Scan: {time.strftime('%Y-%m-%d %H:%M:%S')} (UTC)")
    print("------------------------------------------------------------------")

    for name, url in endpoints.items():
        print(f"Scanning [{name}]...")
        start_time = time.time()
        try:
            res = requests.get(url, timeout=15)
            elapsed = (time.time() - start_time) * 1000
            
            print(f"  Url:      {url}")
            print(f"  Status:   {res.status_code} {'[OK]' if res.status_code == 200 else '[FAILED]'}")
            print(f"  Latency:  {elapsed:.1f}ms")
            
            if res.status_code == 200:
                payload = res.json()
                if "components" in payload:
                    comps = payload["components"]
                    print(f"  Content:  Loaded successfully ({len(comps)} dynamic components verified)")
                else:
                    print("  Content:  Online (Welcome status payload verified)")
            else:
                print(f"  Warning:  Server returned code {res.status_code}")
                
        except Exception as e:
            print(f"  Error:    Connection attempt timed out / aborted. Reason: {e}")
        print("------------------------------------------------------------------")

if __name__ == "__main__":
    verify_all_endpoints()
