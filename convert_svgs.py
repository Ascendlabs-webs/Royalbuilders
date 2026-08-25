from PIL import Image
import cairosvg
import os
import io

svg_files = []
for f in os.listdir('public/images'):
    if f.endswith('.jpg'):
        path = f'public/images/{f}'
        with open(path, 'rb') as file:
            header = file.read(10)
            if b'<svg' in header or b'<?xml' in header:
                svg_files.append(path)

print(f"Found {len(svg_files)} SVG files to convert")

for svg_path in svg_files:
    try:
        # Read SVG
        with open(svg_path, 'rb') as f:
            svg_data = f.read()
        
        # Convert SVG to PNG
        png_data = cairosvg.svg2png(bytestring=svg_data)
        
        # Open PNG and convert to JPG
        img = Image.open(io.BytesIO(png_data))
        img = img.convert('RGB')
        
        # Save as JPG
        img.save(svg_path, 'JPEG', quality=90, optimize=True)
        size = os.path.getsize(svg_path) / 1024
        print(f"Converted: {os.path.basename(svg_path)} ({size:.1f} KB)")
    except Exception as e:
        print(f"Error with {svg_path}: {e}")

print("\nDone!")
