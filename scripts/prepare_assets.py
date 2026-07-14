from pathlib import Path
from PIL import Image, ImageOps
import re

SOURCE = Path('/home/ubuntu/upload')
OUTPUT = Path('/home/ubuntu/webdev-static-assets/henriquejr')
OUTPUT.mkdir(parents=True, exist_ok=True)

PHOTO_SLUGS = {
    'IMG_5091.JPG': 'henrique-jr-professional-portrait-london',
    'IMG_5092.JPG': 'henrique-jr-belt-grading-roger-gracie-euston',
    'IMG_5090.JPG': 'henrique-jr-bjj-seminar-london',
    'IMG_5089.JPG': 'henrique-jr-bjj-demonstration-students',
    'IMG_5087.JPG': 'kids-brazilian-jiu-jitsu-team-game',
    'IMG_5086.JPG': 'henrique-jr-with-roger-gracie',
    'IMG_5084.JPG': 'teen-brazilian-jiu-jitsu-students',
    'IMG_5083.JPG': 'henrique-jr-coaching-children-bjj',
    'IMG_5082.JPG': 'henrique-jr-roger-gracie-black-belt-portrait',
    'IMG_5081.JPG': 'roger-gracie-euston-bjj-community',
    'IMG_5080.JPG': 'kids-brazilian-jiu-jitsu-class-circle',
    'IMG_5079.JPG': 'child-brazilian-jiu-jitsu-exercise',
    'IMG_5078.JPG': 'henrique-jr-private-bjj-technique-demonstration',
    'IMG_5077.JPG': 'brazilian-jiu-jitsu-class-london',
    'IMG_5076.JPG': 'henrique-jr-coaching-bjj-students',
    'Photo15-07-2022,165140(2).jpg': 'henrique-jr-private-coaching-london',
    'Photo15-07-2022,165140(3).jpg': 'henrique-jr-individual-bjj-coaching',
    'Photo20-05-2022,155550.jpg': 'henrique-jr-technical-bjj-instruction',
    'steele-rose-event.jpg': 'henrique-jr-corporate-bjj-programme',
    'AD8A1761-B8BF-46EB-A52A-7D0E0C919534.png': 'henrique-jr-leading-full-class',
    '47F02B34-C7B3-4D13-9058-4362BED80F89.png': 'henrique-jr-mentoring-student',
}

manifest_lines = []
for filename, slug in PHOTO_SLUGS.items():
    source_path = SOURCE / filename
    with Image.open(source_path) as source_image:
        image = ImageOps.exif_transpose(source_image).convert('RGB')
        original_width, original_height = image.size
        variants = []
        requested = [('sm', min(640, original_width)), ('mid', min(768, original_width)), ('md', min(960, original_width)), ('lg', min(1600, original_width))]
        seen_widths = set()
        for label, target_width in requested:
            if target_width in seen_widths:
                continue
            seen_widths.add(target_width)
            target_height = round(original_height * target_width / original_width)
            resized = image if target_width == original_width else image.resize(
                (target_width, target_height), Image.Resampling.LANCZOS
            )
            output_name = f'{slug}-{label}.webp'
            output_path = OUTPUT / output_name
            resized.save(output_path, 'WEBP', quality=82, method=6)
            variants.append((label, output_name, target_width, target_height))
        manifest_lines.append(f'{filename}|{slug}|{original_width}x{original_height}|' + ','.join(
            f'{label}:{name}:{width}x{height}' for label, name, width, height in variants
        ))

logo_source = (SOURCE / 'Pasted_content_17.txt').read_text(encoding='utf-8')
# Preserve the supplied geometry exactly. Crop only the SVG canvas to the visible supplied mark,
# remove its solid background rectangle, and derive the three explicitly permitted flat colors.
logo_core = re.sub(r'<rect[^>]*/>\s*', '', logo_source, count=1)
logo_core = re.sub(r'viewBox="[^"]+"', 'viewBox="0 220.46 595.28 335.92"', logo_core, count=1)
logo_core = re.sub(r'<style type="text/css">.*?</style>', '', logo_core, count=1, flags=re.S)
for name, colour in {
    'black': '#0A0A0A',
    'white': '#FFFFFF',
    'gold': '#A87418',
}.items():
    variant = re.sub(r'class="st[012]"', f'fill="{colour}"', logo_core)
    (OUTPUT / f'henriquejr-logo-{name}.svg').write_text(variant, encoding='utf-8')

(OUTPUT / 'asset-manifest.txt').write_text('\n'.join(manifest_lines) + '\n', encoding='utf-8')
print(f'Prepared {len(PHOTO_SLUGS)} photographs and 3 logo variants in {OUTPUT}')
