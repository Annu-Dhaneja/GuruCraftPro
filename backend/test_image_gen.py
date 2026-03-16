import os
import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image
import io

# Load env variables
load_dotenv()

# Redirect all output to file
import sys
sys.stdout = open("debug_image_gen.txt", "w")
sys.stderr = sys.stdout

api_key = os.getenv("NANO_BANANA_API_KEY")
print(f"DEBUG: Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("ERROR: No API Key found")
    exit(1)

genai.configure(api_key=api_key)

try:
    # Target the alternative image generation model
    model_name = 'gemini-2.5-flash-image'
    print(f"Testing model: {model_name}")
    
    # Simple generation test
    # Note: The exact syntax for image generation in the python SDK might differ 
    # from generate_content. For some versions it is model.generate_images or similar.
    # We will try standard generate_content first as some multimodal models return images in parts.
    
    model = genai.GenerativeModel(model_name)
    
    response = model.generate_content("Generate an image of a futuristic fashion runway with neon lights.")
    
    print(f"Response Type: {type(response)}")
    print(f"Response Parts: {len(response.parts)}")
    
    for part in response.parts:
        print(f"Part mime_type: {part.mime_type}")
        if part.mime_type == 'image/jpeg':
            print("SUCCESS: Image generated!")
            # Save it to prove it works
            img = Image.open(io.BytesIO(part.inline_data.data))
            img.save("test_gen_output.jpg")
            print("Saved to test_gen_output.jpg")
    
    if not response.parts:
        print(f"Response text (if any): {response.text}")

except Exception as e:
    import traceback
    print(f"\nCRITICAL ERROR: {str(e)}")
    traceback.print_exc()

sys.stdout.close()
