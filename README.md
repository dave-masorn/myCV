# Dave Masorn — CV Webpage

Pixel-perfect web implementation of the CV designed in `mock-1.psd` / `mock-1.jpg`.

## Features
- **Design & Typography**: Uses Google Fonts (`Caveat` for handwritten title, `Geist` for crisp geometric headings & content, `Noto Sans Thai` / `Thonburi` fallback for Thai typography).
- **Exact Schematic Layout**: Authentic blueprint card layout with left-border branch line connectors for each section (`Bio.`, `Interests`, `Education`).
- **High-DPI Artwork**: Extracted transparent portrait illustration from the PSD (`assets/portrait.png`).
- **Fully Responsive**: Adapts smoothly from ultra-wide desktops to laptops, tablets, and smartphones.
- **Print & PDF Ready**: Includes dedicated `@media print` CSS rules and a floating **Print CV** action button.

## How to View
You can open `index.html` directly in any modern browser:
```bash
open index.html
```

Or start a local preview server:
```bash
python3 -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your browser.
