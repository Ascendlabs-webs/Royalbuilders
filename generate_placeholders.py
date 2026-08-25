from PIL import Image, ImageDraw, ImageFont
import os
import random

# Files that are actually SVGs and need replacement
fake_files = [
    'about-blueprint.jpg', 'about-office.jpg',
    'construction-apartment-1.jpg', 'construction-commercial-1.jpg', 'construction-crane-1.jpg',
    'construction-site-1.jpg', 'construction-site-2.jpg', 'construction-structure-1.jpg', 'construction-villa-1.jpg',
    'hero-construction.jpg', 'hero-interiors.jpg', 'hero-land.jpg', 'hero-maintenance.jpg',
    'interior-after-1.jpg', 'interior-after-2.jpg', 'interior-after-3.jpg', 'interior-bedroom-1.jpg',
    'interior-before-1.jpg', 'interior-before-2.jpg', 'interior-before-3.jpg',
    'interior-ceiling-1.jpg', 'interior-ceiling-2.jpg', 'interior-kitchen-1.jpg', 'interior-kitchen-2.jpg',
    'interior-living-1.jpg', 'interior-living-2.jpg', 'interior-panel-1.jpg', 'interior-tv-1.jpg',
    'interior-wardrobe-1.jpg', 'interior-wardrobe-2.jpg',
    'land-1.jpg', 'land-2.jpg', 'land-aerial-1.jpg', 'land-commercial-1.jpg', 'land-invest-1.jpg',
    'maintenance-aluminium.jpg', 'maintenance-amc.jpg', 'maintenance-building.jpg', 'maintenance-carpenter.jpg',
    'maintenance-cleaning.jpg', 'maintenance-drain.jpg', 'maintenance-electrical.jpg', 'maintenance-fabrication.jpg',
    'maintenance-house.jpg', 'maintenance-office.jpg', 'maintenance-painting.jpg', 'maintenance-plumbing.jpg',
    'maintenance-pvc.jpg', 'maintenance-ss.jpg', 'maintenance-sump.jpg', 'maintenance-tank.jpg', 'maintenance-tile.jpg',
    'project-after-1.jpg', 'project-after-2.jpg', 'project-after-3.jpg', 'project-apex-tower.jpg',
    'project-before-1.jpg', 'project-before-2.jpg', 'project-before-3.jpg',
    'project-golden-residence.jpg', 'project-grand-museum.jpg', 'project-royal-penthouse.jpg',
    'project-skyline-office.jpg', 'project-villa-serenite.jpg',
    'team-1.jpg', 'team-2.jpg', 'team-3.jpg', 'team-4.jpg', 'team-5.jpg', 'team-6.jpg'
]

# Color schemes by category
colors = {
    'hero': [(41, 98, 255), (0, 0, 0)],  # Blue to black
    'construction': [(255, 140, 0), (139, 69, 19)],  # Orange to brown
    'interior': [(220, 20, 60), (128, 0, 128)],  # Crimson to purple
    'land': [(34, 139, 34), (0, 100, 0)],  # Green
    'maintenance': [(70, 130, 180), (25, 25, 112)],  # Steel blue to midnight blue
    'project': [(100, 100, 100), (0, 0, 0)],  # Gray
    'team': [(147, 112, 219), (75, 0, 130)],  # Purple
    'about': [(65, 105, 225), (25, 25, 112)]  # Royal blue
}

def get_category(filename):
    for cat in colors.keys():
        if filename.startswith(cat):
            return cat
    return 'project'

def create_placeholder(width, height, filename):
    cat = get_category(filename)
    color1, color2 = colors[cat]
    
    # Create gradient background
    img = Image.new('RGB', (width, height), color1)
    draw = ImageDraw.Draw(img)
    
    for i in range(height):
        ratio = i / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, i), (width, i)], fill=(r, g, b))
    
    # Add geometric shapes
    for _ in range(10):
        shape_type = random.choice(['rect', 'circle', 'triangle'])
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(20, 100)
        color = (*[random.randint(0, 255) for _ in range(3)], random.randint(50, 150))
        
        if shape_type == 'rect':
            draw.rectangle([x, y, x+size, y+size], fill=color, outline='white')
        elif shape_type == 'circle':
            draw.ellipse([x, y, x+size, y+size], fill=color, outline='white')
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", 32)
        small_font = ImageFont.truetype("arial.ttf", 18)
    except:
        font = ImageFont.load_default()
        small_font = font
    
    label = filename.replace('.jpg', '').replace('-', ' ').upper()
    
    # Draw text with shadow
    text_bbox = draw.textbbox((0, 0), label, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    text_x = (width - text_width) // 2
    text_y = (height - text_height) // 2
    
    # Shadow
    draw.text((text_x+2, text_y+2), label, fill='black', font=font)
    # Main text
    draw.text((text_x, text_y), label, fill='white', font=font)
    
    # Add "PLACEHOLDER" at bottom
    placeholder_text = "PLACEHOLDER IMAGE"
    p_bbox = draw.textbbox((0, 0), placeholder_text, font=small_font)
    p_width = p_bbox[2] - p_bbox[0]
    draw.text(((width - p_width) // 2 + 1, height - 40 + 1), placeholder_text, fill='black', font=small_font)
    draw.text(((width - p_width) // 2, height - 40), placeholder_text, fill=(255, 255, 0), font=small_font)
    
    return img

print(f"Generating {len(fake_files)} placeholder images...")

for filename in fake_files:
    filepath = f'public/images/{filename}'
    
    # Determine size based on type
    if filename.startswith('hero'):
        width, height = 1920, 1080
    elif filename.startswith('team'):
        width, height = 400, 400
    else:
        width, height = 800, 600
    
    img = create_placeholder(width, height, filename)
    img.save(filepath, 'JPEG', quality=85, optimize=True)
    
    size = os.path.getsize(filepath) / 1024
    print(f"Generated: {filename} ({width}x{height}, {size:.1f} KB)")

print("\nAll placeholder images generated!")
