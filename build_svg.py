from PIL import Image
import base64
import io

img_path = r"C:\Users\Om prakash\.gemini\antigravity\brain\4d9c81ba-83c0-4280-9464-e7bcabaa9e42\logo_gurucraftpro_1774346200686.png"
print("Processing:", img_path)

try:
    img = Image.open(img_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    
    # 1. Un-premultiply alpha to perfectly extract luminous pixels from black
    for r, g, b, a in datas:
        alpha = max(r, g, b)
        if alpha == 0:
            newData.append((0, 0, 0, 0))
        else:
            newData.append((int(r * 255 / alpha), int(g * 255 / alpha), int(b * 255 / alpha), alpha))
            
    img.putdata(newData)
    
    # 2. Crop tightly to the non-transparent content
    bbox = img.getbbox()
    if bbox:
        margin = 15
        bbox = (
            max(0, bbox[0] - margin), 
            max(0, bbox[1] - margin), 
            min(img.width, bbox[2] + margin), 
            min(img.height, bbox[3] + margin)
        )
        img = img.crop(bbox)
        
    # 3. Scale down for SVG efficiency
    img.thumbnail((120, 120), Image.Resampling.LANCZOS)
    
    # 4. Export to Base64
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    # 5. Build Final SVG Payload
    # Increased width to 330 to ensure 'Pro' is never cut off
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 100" width="330" height="100">
  <!-- Embedded Transparent 8-bit Graphic -->
  <image href="data:image/png;base64,{img_str}" x="0" y="5" width="90" height="90" />

  <!-- Pristine Scalable Typography -->
  <text x="95" y="55" font-family="system-ui, -apple-system, 'Inter', sans-serif" font-weight="800" font-size="32" fill="#f8fafc" letter-spacing="-0.5">
    Gurucraft<tspan fill="#a855f7">Pro</tspan>
  </text>
  
  <text x="98" y="78" font-family="system-ui, -apple-system, 'Inter', sans-serif" font-weight="600" font-size="11" fill="#94a3b8" letter-spacing="2" text-transform="uppercase">
    Digital Experiences
  </text>
</svg>"""

    out_path = r"e:\Project\virtual_try-main\frontend\public\img\brand\logo.svg"
    with open(out_path, "w") as f:
        f.write(svg_content)
        
    print("SUCCESS: Master pristine SVG written to", out_path)
    
except Exception as e:
    print("FAILED:", str(e))
