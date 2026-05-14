import os
from google import genai
from dotenv import load_dotenv
import sys

# Load env variables
load_dotenv()

# Redirect all output to file
sys.stdout = open("debug_output.txt", "w")
sys.stderr = sys.stdout

api_key = os.getenv("NANO_BANANA_API_KEY")
print(f"DEBUG: Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("ERROR: No API Key found in .env under NANO_BANANA_API_KEY")
    exit(1)

try:
    client = genai.Client(api_key=api_key)
    
    print("\n--- Listing Available Models ---")
    available_models = []
    for m in client.models.list():
        print(f"- {m.name}")
        available_models.append(m.name)
    
    print(f"\n--- Found {len(available_models)} models ---")

    # Try to pick one that exists
    target_model = 'gemini-2.0-flash'
    if f"models/{target_model}" not in available_models:
        print(f"WARNING: {target_model} not found in list.")
        # Fallback to the first available one
        if available_models:
             target_model = next((m for m in available_models if "flash" in m or "pro" in m), available_models[0])
             print(f"Falling back to: {target_model}")
        else:
             print("ERROR: No models available")
             exit(1)
        
    print(f"\n--- Attempting Generation with {target_model} ---")
    
    response = client.models.generate_content(model=target_model, contents="Hello, can you hear me?")
    print(f"\nSUCCESS! Response: {response.text}")

except Exception as e:
    import traceback
    print(f"\nCRITICAL ERROR: {str(e)}")
    traceback.print_exc()

sys.stdout.close()
