from pathlib import Path
import re

project = Path('/home/ubuntu/henriquejr-v1')
urls_text = (project / 'asset-upload-urls.txt').read_text(encoding='utf-8')
manifest_text = Path('/home/ubuntu/webdev-static-assets/henriquejr/asset-manifest.txt').read_text(encoding='utf-8')

uploaded = {}
for source_name, storage_path in re.findall(r'\[SUCCESS\].*/([^/ ]+) -> (/manus-storage/\S+)', urls_text):
    uploaded[source_name] = storage_path

entries = []
for line in manifest_text.strip().splitlines():
    filename, slug, dimensions, variants = line.split('|')
    variant_data = {}
    for item in variants.split(','):
        label, output_name, dims = item.split(':')
        variant_data[label] = (uploaded[output_name], dims)
    entries.append((slug, filename, dimensions, variant_data))

lines = [
    '/** Editorial Discipline: supplied documentary photography only; responsive WebP derivatives preserve natural colour and content. */',
    'export type ResponsiveImage = {',
    '  src: string;',
    '  srcSet?: string;',
    '  width: number;',
    '  height: number;',
    '};',
    '',
    'export const images = {',
]
for slug, filename, original_dims, variants in entries:
    key = re.sub(r'[^a-zA-Z0-9]+(.)', lambda match: match.group(1).upper(), slug)
    preferred = variants.get('lg') or variants.get('sm')
    preferred_path, preferred_dims = preferred
    width, height = preferred_dims.split('x')
    src_set_parts = []
    for label in ('sm', 'lg'):
        if label in variants:
            path, dims = variants[label]
            variant_width = dims.split('x')[0]
            src_set_parts.append(f'{path} {variant_width}w')
    src_set = ', '.join(src_set_parts)
    lines.extend([
        f'  {key}: {{',
        f'    src: "{preferred_path}",',
        f'    srcSet: "{src_set}",',
        f'    width: {width},',
        f'    height: {height},',
        f'  }},',
    ])
lines.extend([
    '} as const satisfies Record<string, ResponsiveImage>;',
    '',
    'export const logos = {',
    f'  black: "{uploaded["henriquejr-logo-black.svg"]}",',
    f'  white: "{uploaded["henriquejr-logo-white.svg"]}",',
    f'  gold: "{uploaded["henriquejr-logo-gold.svg"]}",',
    '} as const;',
    '',
])

output = project / 'client/src/lib/assets.ts'
output.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {output} with {len(entries)} responsive photographs and 3 logo variants')
