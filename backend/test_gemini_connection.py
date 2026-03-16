import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load env variables
load_dotenv()

# Redirect all output to file
import sys
import os
sys.stdout = open("debug_output.txt", "w")
sys.stderr = sys.stdout

api_key = os.getenv("NANO_BANANA_API_KEY")
print(f"DEBUG: Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("ERROR: No API Key found in .env under NANO_BANANA_API_KEY")
    exit(1)

try:
    genai.configure(api_key=api_key)
    
    print("\n--- Listing Available Models ---")
    available_models = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            available_models.append(m.name)
    
    print(f"\n--- Found {len(available_models)} models ---")

    # Try to pick one that exists
    target_model = 'gemini-1.5-flash'
    if f"models/{target_model}" not in available_models:
        print(f"WARNING: {target_model} not found in list.")
        # Fallback to the first available one
        if available_models:
             target_model = available_models[0].replace("models/", "")
             print(f"Falling back to: {target_model}")
        else:
             print("ERROR: No models available for generateContent")
             exit(1)
        
    print(f"\n--- Attempting Generation with {target_model} ---")
    model = genai.GenerativeModel(target_model)
    
    response = model.generate_content("Hello, can you hear me?")
    print(f"\nSUCCESS! Response: {response.text}")

except Exception as e:
    import traceback
    print(f"\nCRITICAL ERROR: {str(e)}")
    traceback.print_exc()

sys.stdout.close()
