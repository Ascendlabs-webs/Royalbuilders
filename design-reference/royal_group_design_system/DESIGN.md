---
name: Royal Group Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474c'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#75777d'
  outline-variant: '#c4c6cc'
  surface-tint: '#525f71'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0f1c2c'
  on-primary-container: '#778598'
  inverse-primary: '#bac7dc'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1d'
  on-tertiary-container: '#828485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3f9'
  primary-fixed-dim: '#bac7dc'
  on-primary-fixed: '#0f1c2c'
  on-primary-fixed-variant: '#3b4859'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
  button:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

This design system embodies the prestige and architectural excellence of a premier real estate leader. The aesthetic is **Corporate Modern with a Luxury Editorial edge**, balancing the structural reliability of construction with the refined elegance of high-end interior design.

The visual narrative relies on **Sophisticated Minimalism**: expansive whitespace (macro-typography), precise alignment, and a "less is more" approach to decorative elements. The goal is to evoke an emotional response of absolute trust, legacy, and uncompromising quality. The interface should feel like an architectural blueprint brought to life in a premium lifestyle magazine.

## Colors

The palette is anchored by **Deep Navy (#081625)**, representing stability and corporate authority. **Accent Gold (#D4AF37)** is used sparingly to signify luxury, primarily for interactive highlights, CTA outlines, and subtle decorative "glows."

- **Primary (Deep Navy):** Used for typography, navigation bars, and primary surfaces.
- **Secondary (Accent Gold):** Reserved for high-value actions, status indicators, and hairline borders.
- **Surface Tones:** A mix of pure White (#FFFFFF) for clarity and "Alabaster" Off-white (#F8F9FA) for subtle section differentiation.
- **Functional Grays:** Dark Gray (#4A4A4A) for body copy to maintain high readability without the harshness of pure black.

## Typography

The typographic scale uses a **Serif-on-Sans contrast**. **Playfair Display** provides the "Royal" character—used for property titles, hero statements, and section headers. **Montserrat** provides the functional, modern grounding—used for technical specs, body descriptions, and navigation.

**Usage Rules:**
- Large Display headers should use a slight negative letter-spacing to feel more "tight" and architectural.
- Labels and Small Meta-data must always use the `label-caps` style with increased letter spacing for a premium, catalog-like feel.
- Avoid italicizing the serif font; keep it upright and authoritative.

## Layout & Spacing

This design system follows a **Fixed-Width Centered Grid** for desktop (12 columns) and a **Fluid Grid** for mobile. 

**Key Principles:**
- **Generous Vertical Rhythms:** Use the `section-gap` (120px) between major homepage sections to allow the imagery and typography to "breathe."
- **Asymmetric Balance:** In property showcases, use alternating grid layouts (e.g., Image spanning 7 columns, Text spanning 4 columns with a 1-column offset).
- **The "Gold Ratio" Padding:** Use large internal padding for cards and containers (minimum 40px) to maintain the luxury feel.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Subtle Glows** rather than heavy shadows.

- **The Gold Glow:** For active states or featured property cards, use an extremely soft, large-radius outer glow using a low-opacity Gold (#D4AF37 at 10-15% opacity).
- **Ghost Borders:** Use 1px hairline borders in `Deep Navy` (at 10% opacity) or `Gold` to define sections without adding visual weight.
- **Glassmorphism:** Navigation bars should use a white background blur (Backdrop Filter: blur(10px)) at 80% opacity to maintain context of the high-res architectural photography underneath.

## Shapes

The shape language is **Sharp and Geometric (0px roundedness)**. This reflects the precision of construction and the hard lines of modern architecture. 

- **Containers:** All buttons, input fields, and property cards must have 90-degree corners. 
- **Exceptions:** None. Avoid any rounding to maintain a high-end, bespoke architectural aesthetic.
- **Dividers:** Use horizontal and vertical hairline strokes to separate content, mimicking a draftman's grid.

## Components

### Buttons
- **Primary:** Deep Navy background, White text, 0px radius. Hover state: Background transitions to Gold.
- **Secondary:** Transparent background, 1px Gold border, Gold text. 
- **Text Link:** Montserrat Bold, Uppercase, with a 1px Gold underline that animates from left-to-right on hover.

### Cards (Property & Service)
- Flush imagery with no padding at the top. 
- Content area uses a White background with the "Gold Glow" elevation on hover.
- Metadata (SQFT, Price) uses `label-caps` style.

### Input Fields
- Underline-only style or a very subtle 1px border. 
- Label floats above the line in `label-caps`. 
- Focus state: Border changes to Gold with a 2px bottom stroke.

### Specialized Components
- **Property Counter:** Large Display-size numbers in Playfair Display to show years of experience or projects completed.
- **Image Gallery:** Large-scale masonry layout with smooth "Ken Burns" zoom effects on hover.
- **Maintenance Status Tracker:** A clean, linear step-progress bar using Gold for completed stages and Navy for upcoming ones.