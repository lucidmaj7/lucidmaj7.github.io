# QR Scanner Max Landing Page

This directory contains the landing page for QR Scanner Max iOS app.

## Files

- `index.html` - Main landing page with Liquid Glass design

## Design Features

- **Liquid Glass Design**: Matches the iOS app's visual style
- **Gradient Background**: Blue to Purple gradient (#E3EDF9 → #EEE3F9)
- **Responsive Layout**: Works on all devices (mobile-first design)
- **Color Palette**:
  - Primary: #3AAEFF (Liquid Blue)
  - Secondary: #8C5CFF (Liquid Purple)
  - Accent Pink: #FF6EC7
  - Accent Turquoise: #4FFFE3

## Sections

1. **Hero Section**: App introduction and main CTA
2. **Features Section**: 6 key features with icons
3. **Supported Types**: All 6 QR code types (URL, Email, Phone, Wi-Fi, vCard, Text)
4. **Download Section**: App Store download CTA
5. **Footer**: Copyright and credits

## Preview

To view the landing page locally:

```bash
# Option 1: Using Python
cd html
python3 -m http.server 8000
# Then open http://localhost:8000 in your browser

# Option 2: Using PHP
cd html
php -S localhost:8000
# Then open http://localhost:8000 in your browser

# Option 3: Just open the file directly
open index.html
```

## Deployment

This static HTML page can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

## Notes

- Pure HTML/CSS/JavaScript (no dependencies)
- No build process required
- Optimized for performance
- SEO-friendly meta tags included
