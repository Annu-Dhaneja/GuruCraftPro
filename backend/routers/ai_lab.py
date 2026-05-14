from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import asyncio
import base64
import os
import io
import urllib.request
from PIL import Image
from google import genai
from core.config import settings

from core.auth import get_current_user, require_admin
from core import models

router = APIRouter()

# Initialize Gemini Client
# Using NANO_BANANA_API_KEY as it holds the Google Key in .env currently
client = None
if settings.NANO_BANANA_API_KEY:
    client = genai.Client(api_key=settings.NANO_BANANA_API_KEY)

class GenerationRequest(BaseModel):
    prompt: str
    style: Optional[str] = None

@router.post("/try-on")
async def virtual_try_on(
    user_image: Optional[UploadFile] = File(None),
    garment_image: Optional[UploadFile] = File(None),
    user_image_url: Optional[str] = Form(None),
    garment_image_url: Optional[str] = Form(None),
    prompt: Optional[str] = Form(None),
    current_user: models.User = Depends(get_current_user)
):
    """
    Virtual Try-On Analysis using Google Gemini.
    Returns a text description of the fit/style, NOT a generated image.
    Supports either direct file upload or image URLs.
    """
    if not client:
         return JSONResponse(
            content={"status": "error", "message": "Backend Error: Google API Client is not initialized (check API key)."},
            status_code=500
        )
        
    print(f"Try-on Analysis request: UserImageUpload={user_image is not None}, UserURL={user_image_url}")
    
    if not user_image and not user_image_url:
        return JSONResponse(
            content={"status": "error", "message": "You must provide either a user image file or a user image URL."},
            status_code=400
        )
    
    try:
        inputs = []
        
        # Load user image (File or URL)
        if user_image:
            user_image_content = await user_image.read()
            user_img_pil = Image.open(io.BytesIO(user_image_content))
            inputs.append(user_img_pil)
        elif user_image_url:
            req = urllib.request.Request(user_image_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as url_res:
                user_image_content = url_res.read()
                user_img_pil = Image.open(io.BytesIO(user_image_content))
                inputs.append(user_img_pil)
        
        prompt_text = "You are a professional high-end fashion stylist. "
        
        # Load garment image (File or URL)
        if garment_image or garment_image_url:
            if garment_image:
                garment_image_content = await garment_image.read()
                garment_img_pil = Image.open(io.BytesIO(garment_image_content))
                inputs.append(garment_img_pil)
            elif garment_image_url:
                req = urllib.request.Request(garment_image_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as url_res:
                    garment_image_content = url_res.read()
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

        # Gemini generation trigger
        # Dynamically find a working model
        valid_model_name = "gemini-2.0-flash" 
        
        try:
            # List available models to find a valid one
            available_models = []
            for m in client.models.list():
                # In the new SDK, m.supported_generation_methods might be different or not present in the same way
                # We check if it's a 'models/' name and not 'tunedModels/'
                if m.name.startswith("models/"):
                    available_models.append(m.name)
            
            print(f"DEBUG: Available Gemini Models: {available_models}")
            
            # Smart selection logic (using full model names with prefix)
            if "models/gemini-2.0-flash" in available_models:
                valid_model_name = "gemini-2.0-flash"
            elif "models/gemini-1.5-flash" in available_models:
                valid_model_name = "gemini-1.5-flash"
            elif available_models:
                # Pick the first one that looks like a flash or pro model
                valid_model_name = next((m for m in available_models if "flash" in m or "pro" in m), available_models[0])
                # Remove prefix if needed (the SDK usually handles it, but let's be safe)
                if valid_model_name.startswith("models/"):
                    valid_model_name = valid_model_name[7:]
            
        except Exception as list_err:
            print(f"Warning determining models: {list_err}")
            # Fallback
            valid_model_name = "gemini-2.0-flash"

        print(f"DEBUG: Selected Model: {valid_model_name}")

        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None, 
            lambda: client.models.generate_content(model=valid_model_name, contents=inputs)
        )
        
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

@router.post("/remove-bg")
async def remove_background(
    image: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user)
):
    """
    Simulated AI Background Removal.
    In production, this would use 'rembg' or a similar model.
    """
    await asyncio.sleep(1.5) # Simulate processing
    return JSONResponse(content={
        "status": "success",
        "mode": "remove-bg",
        "output_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&fm=png&auto=format", # Mock PNG result
        "message": "Background removed successfully (Simulated)"
    })

@router.post("/upscale")
async def ai_upscale(
    image: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user)
):
    """
    Simulated AI 4X Upscaling.
    """
    await asyncio.sleep(2.5) # Simulate heavy processing
    return JSONResponse(content={
        "status": "success",
        "mode": "upscale",
        "output_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400", # Mock high-res result
        "message": "Image upscaled to 4K successfully (Simulated)"
    })

@router.post("/relight")
async def ai_relight(
    image: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user)
):
    """
    Simulated AI Studio Lighting.
    """
    await asyncio.sleep(2.0)
    return JSONResponse(content={
        "status": "success",
        "mode": "relight",
        "output_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
        "message": "Studio lighting applied successfully (Simulated)"
    })

# ... Keep other endpoints mock or disabled if they rely on OpenAI ...
# For now, let's keep them simply returning errors or mocks if called
# since user only has Google key.

@router.post("/generate-outfit")
async def generate_outfit(
    request: GenerationRequest,
    current_user: models.User = Depends(get_current_user)
):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
        "message": "Mock Result (OpenAI Key Missing)"
    })

@router.post("/generate-logo")
async def generate_logo(
    request: GenerationRequest,
    current_user: models.User = Depends(get_current_user)
):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://images.unsplash.com/photo-1626785774573-4b79931256ce?w=800&q=80",
        "message": "Mock Result (OpenAI Key Missing)"
    })

@router.post("/generate-sticker")
async def generate_sticker(
    request: GenerationRequest,
    current_user: models.User = Depends(get_current_user)
):
    return JSONResponse(content={
        "status": "success", 
        "output_url": "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
        "message": "Mock Result (OpenAI Key Missing)"
    })
