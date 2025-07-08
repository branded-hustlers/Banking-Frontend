# Banking Service Logos

This folder contains logos for all banking services displayed in the dashboard.

## Adding New Logos

1. **Export from Figma:**
   - Select the logo in Figma
   - Right-click → Export → SVG (recommended) or PNG
   - Download the file

2. **Place in this folder:**
   - Name the file descriptively (e.g., `western-union-logo.svg`)
   - Keep the naming consistent with what's referenced in MainDashboard.jsx

3. **Expected Logo Files:**
   - `gcb-logo.svg` ✅ (sample created)
   - `unity-link-logo.svg`
   - `ria-logo.svg`
   - `western-union-logo.svg`
   - `eagle-pay-logo.svg`
   - `aob-logo.svg`
   - `moneygram-logo.svg`
   - `transfast-logo.svg`

## How It Works

- If a logo image loads successfully, it will be displayed
- If a logo fails to load, the text fallback (e.g., "GCB", "WU") will appear instead
- Logos are automatically sized to 32x32 pixels (w-8 h-8)
- The `object-contain` class ensures logos maintain their aspect ratio

## Supported Formats

- **SVG** (recommended) - Scalable, crisp at any size
- **PNG** - Good for complex logos with transparency
- **JPG** - Not recommended (no transparency support)

## Logo Specifications

- **Size:** Optimize for 32x32px to 64x64px
- **Format:** SVG preferred, PNG acceptable
- **Colors:** Should work well on light backgrounds
- **Transparency:** Ensure transparent backgrounds for PNG files
