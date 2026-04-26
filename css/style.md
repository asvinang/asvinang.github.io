# Asvin Brand Styles

This file documents the core styles and variables for the Asvin brand as implemented in `style.css`.

```css
:root {
  --bg: #faf9f6;
  --bg-warm: #efebe9;
  --ink: #3e2723;
  --ink-mid: #5d4037;
  --ink-light: #8d6e63;
  --ink-faint: #bcaaa4;
  --accent: #e64a19;
  --accent-light: #ff7043;
  --accent-bg: #fbe9e7;
  --rule: #d7ccc8;
  --rule-light: #efebe9;
  --card-bg: #ffffff;
  --card-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'DM Sans', -apple-system, sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --brand: 'Aboreto', cursive;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

/* Rest of the styles are available in style.css */
```
