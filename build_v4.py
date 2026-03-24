import os
import shutil

svg_path = r'e:\Project\virtual_try-main\frontend\public\img\brand\logo.svg'
dark_v4 = r'e:\Project\virtual_try-main\frontend\public\img\brand\logo-dark-v4.svg'
light_v4 = r'e:\Project\virtual_try-main\frontend\public\img\brand\logo-light-v4.svg'

print("Generating v4 cache-busting SVGs...")

if os.path.exists(svg_path):
    # Create dark version
    shutil.copy2(svg_path, dark_v4)
    
    with open(svg_path, 'r') as f:
        svg_dark = f.read()

    # Create light version
    svg_light = svg_dark.replace('fill="#f8fafc"', 'fill="#0f172a"')
    svg_light = svg_light.replace('fill="#94a3b8"', 'fill="#64748b"')

    with open(light_v4, 'w') as f:
        f.write(svg_light)

    print("Success: Generated logo-dark-v4.svg and logo-light-v4.svg")
    
    try:
        os.remove(svg_path)
        os.remove(svg_path.replace('.svg', '-light.svg'))
    except:
        pass
else:
    print("Error: Base SVG not found at", svg_path)
