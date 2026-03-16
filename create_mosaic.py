import os
import json
from PIL import Image, ImageDraw

directory = r"e:\Annu_Projects\image_project\frontend\public\images\user_provided"
files = sorted([f for f in os.listdir(directory) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))])

# Using a larger tile size so the thumbnail looks somewhat clear to an LLM vision process.
img_size = 300 
cols = 7
rows = (len(files) + cols - 1) // cols

mosaic_width = cols * img_size
mosaic_height = rows * img_size

mosaic = Image.new('RGB', (mosaic_width, mosaic_height), color=(255, 255, 255))
draw = ImageDraw.Draw(mosaic)

idx_to_file = {}

for idx, f in enumerate(files):
    img_path = os.path.join(directory, f)
    try:
        img = Image.open(img_path)
        # thumbnail preserves aspect ratio
        img.thumbnail((img_size - 20, img_size - 20)) 
        
        row = idx // cols
        col = idx % cols
        x = col * img_size
        y = row * img_size
        
        paste_x = x + (img_size - img.width) // 2
        paste_y = y + (img_size - img.height) // 2
        
        mosaic.paste(img, (paste_x, paste_y))
        
        # draw text background
        draw.rectangle([x, y, x + 30, y + 20], fill=(0, 0, 0))
        # draw text
        draw.text((x + 5, y + 5), str(idx), fill=(255, 255, 255))
        
        idx_to_file[idx] = f
    except Exception as e:
        print(f"Error processing {f}: {e}")

mosaic.save(r"e:\Annu_Projects\image_project\mosaic.jpg", quality=85)

with open(r"e:\Annu_Projects\image_project\mosaic.json", 'w') as out:
    json.dump(idx_to_file, out, indent=2)

print("Mosaic created successfully with", len(files), "images.")
