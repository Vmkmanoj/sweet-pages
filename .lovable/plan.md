# Slivasa Digital Menu

## What I’ll build
- Replace the placeholder with an eight-page interactive restaurant menu.
- Present two facing pages on desktop and one full page on mobile.
- Add realistic forward and backward paper turns using 3D perspective, visible front/back surfaces, page-edge shading, and moving shadows.
- Support cover tap, page-side clicks, discreet arrow controls, keyboard arrows, swipe, and mouse/touch drag gestures.
- Keep the page counter aligned with the visible menu: desktop spreads and mobile single pages.

## Visual direction
- Warm ivory paper, charcoal-brown typography, restrained antique-gold details, fine rules, and subtle paper grain.
- Editorial serif display type paired with a clean sans-serif for descriptions and controls.
- A rich photographic cover with the Slivasa name prominently visible.
- Compact printed-menu item rows rather than online-store cards.

## Menu content
- Cover, welcome, brownies, tea cakes, cakes, cookies, chocolates, and special offers/contact pages.
- Use tasteful sample descriptions and prices where the brief does not provide them.
- Mark contact details as placeholders rather than presenting invented information as final.

## Technical details
- Use lightweight React state and CSS 3D transforms; no heavy page-turn dependency.
- Keep all colors, shadows, fonts, and animation timing in the shared design system.
- Lazy-load food imagery and preload only adjacent pages.
- Respect reduced-motion preferences while preserving clear page changes.
- Add complete home-page metadata and verify desktop and mobile interactions in the live preview.
