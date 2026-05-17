import requests
import json

def test():
    try:
        url = "https://guru-craft-pro.vercel.app/api/v1/cms/home"
        print(f"Fetching: {url}")
        res = requests.get(url, timeout=10)
        data = res.json()
        
        components = data.get("components", [])
        print(f"Loaded {len(components)} components from database:")
        for idx, comp in enumerate(components):
            name = comp.get("name")
            comp_id = comp.get("id")
            props = comp.get("props")
            print(f"[{idx}] ID: {comp_id} | Name: {name} | Props Type: {type(props)}")
            print(f"    Raw Props keys: {list(props.keys()) if isinstance(props, dict) else 'Not a dict'}")
            if isinstance(props, dict) and "props" in props:
                nested = props["props"]
                print(f"    Nested Props Type: {type(nested)}")
                if isinstance(nested, dict):
                    print(f"    Nested keys: {list(nested.keys())}")
                else:
                    print(f"    Nested value (first 100 chars): {str(nested)[:100]}")
    except Exception as e:
        print(f"Error during scan: {e}")

if __name__ == "__main__":
    test()
