from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
import sys

# Load env variables
load_dotenv()

# Redirect all output to file
sys.stdout = open("debug_image_gen.txt", "w")
sys.stderr = sys.stdout

api_key = os.getenv("NANO_BANANA_API_KEY")
print(f"DEBUG: Loaded API Key: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

if not api_key:
    print("ERROR: No API Key found")
    exit(1)

client = genai.Client(api_key=api_key)

try:
    # Target Imagen 3
    model_name = 'imagen-3.0-generate-002'
    print(f"Testing model: {model_name}")
    
    response = client.models.generate_images(
        model=model_name,
        prompt='A futuristic fashion runway with neon lights, high fashion models, photorealistic style',
        config=types.GenerateImagesConfig(
            number_of_images=1,
            output_mime_type='image/jpeg'
        )
    )
    
    print(f"Response Type: {type(response)}")
    
    for i, generated_image in enumerate(response.generated_images):
        print(f"SUCCESS: Image {i} generated!")
        image = generated_image.image
        image.save(f"test_gen_output_{i}.jpg")
        print(f"Saved to test_gen_output_{i}.jpg")
    
    if not response.generated_images:
        print("No images generated.")

except Exception as e:
    import traceback
    print(f"\nCRITICAL ERROR: {str(e)}")
    traceback.print_exc()

sys.stdout.close()
