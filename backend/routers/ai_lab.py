from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import asyncio
import base64
import os
import io
from PIL import Image
import google.generativeai as genai
from core.config import settings

router = APIRouter()

# Initialize Gemini
# Using NANO_BANANA_API_KEY as it holds the Google Key in .env currently
# In a real scenario, we should rename this env var, but to avoid confusing the user further, we use it.
if settings.NANO_BANANA_API_KEY:
    genai.configure(api_key=settings.NANO_BANANA_API_KEY)

class GenerationRequest(BaseModel):
    prompt: str
    style: Optional[str] = None

@router.post("/try-on")
async def virtual_try_on(
    user_image: UploadFile = File(...),
    garment_image: Optional[UploadFile] = File(None),
    prompt: Optional[str] = Form(None)
):
    """
    Virtual Try-On Analysis using Google Gemini 1.5 Flash (Vision).
    Returns a text description of the fit/style, NOT a generated image.
    """
    if not settings.NANO_BANANA_API_KEY:
         return JSONResponse(
            content={"status": "error", "message": "Backend Error: Google API Key is missing."},
            status_code=500
        )
        
    print(f"Try-on Analysis request: User={user_image.filename}")
    
    try:
        # Read and Convert images to PIL for Gemini
        user_image_content = await user_image.read()
        user_img_pil = Image.open(io.BytesIO(user_image_content))
        
        inputs = [user_img_pil]
        prompt_text = "You are a professional high-end fashion stylist. "
        
        if garment_image:
            garment_image_content = await garment_image.read()
            garment_img_pil = Image.open(io.BytesIO(garment_image_content))
            inputs.append(garment_img_pil)
            prompt_text += "The first image is the client. The second image is the garment they want to try on. "
        else:
            prompt_text += "The image is the client. "
            
        prompt_text += (
            f"Task: Analyze how this garment would look on the client. "
            f"Describe the fit, color compatibility, and overall style match. "
            f"Be specific and encouraging but honest. {prompt or ''}"
        )

        inputs.append(prompt_text)

        # Gemini generation trigger (Sync call wrapped)
        # Dynamically find a working model
        valid_model_name = "gemini-2.5-flash" # Updated default based on available models
        
        try:
            # List available models to find a valid one
            available_models = []
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    available_models.append(m.name)
            
            print(f"DEBUG: Available Gemini Models: {available_models}")
            
            # Smart selection logic
            if "models/gemini-2.5-flash" in available_models:
                valid_model_name = "gemini-2.5-flash"
            elif "models/gemini-2.5-pro" in available_models:
                valid_model_name = "gemini-2.5-pro"
            elif "models/gemini-2.0-flash" in available_models:
                valid_model_name = "gemini-2.0-flash"
            elif "models/gemini-1.5-flash" in available_models:
                valid_model_name = "gemini-1.5-flash"
            
            # If user has absolutely no valid models
            if not available_models:
                raise Exception("No available models found for this API Key.")
                
        except Exception as list_err:
            print(f"Warning determining models: {list_err}")
            # Fallback to hardcoded if list fails
            valid_model_name = "gemini-2.5-flash"

        print(f"DEBUG: Selected Model: {valid_model_name}")
        model = genai.GenerativeModel(valid_model_name)

        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(None, lambda: model.generate_content(inputs))
        
        analysis_text = response.text
        
        # Since we cannot generate an image, we return the inputs as 'results' metaphorically, 
        # but the meaningful output is the TEXT.
        # We'll return a structure the frontend can use to show the text.
        
        return JSONResponse(content={
            "status": "success",
            "mode": "analysis",
            "results": {
                "analysis": analysis_text
            }
        })

    except Exception as e:
        import traceback
        error_details = str(e)
        print(f"Gemini Error: {error_details}")
        traceback.print_exc()
        # Return actual error for debugging
        return JSONResponse(
            content={
                "status": "error", 
                "message": f"AI Stylist Error: {error_details}"
            },
            status_code=500
        )

# ... Keep other endpoints mock or disabled if they rely on OpenAI ...
# For now, let's keep them simply returning errors or mocks if called
# since user only has Google key.

@router.post("/generate-outfit")
async def generate_outfit(request: GenerationRequest):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "message": "Mock Result (OpenAI Key Missing)"
    })

@router.post("/generate-logo")
async def generate_logo(request: GenerationRequest):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://images.unsplash.com/photo-1626785774573-4b79931256ce?w=800&q=80",
        "message": "Mock Result (OpenAI Key Missing)"
    })

@router.post("/generate-sticker")
async def generate_sticker(request: GenerationRequest):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
        "message": "Mock Result (OpenAI Key Missing)"
    })
