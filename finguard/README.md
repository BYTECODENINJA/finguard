# finguard — fintech landing page

A responsive fintech landing page built with Vite, React and TypeScript, referencing the
provided design. GSAP (ScrollTrigger) drives scroll/parallax animation, Framer Motion drives
the custom cursor and micro-interactions.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## What's included

- `src/components/CustomCursor.tsx` — spring-based ring + dot cursor that expands over links/buttons
- `src/components/Hero.tsx` — headline reveal timeline + cursor-tilt parallax card stack
- `src/components/About.tsx` — scroll-triggered animated stat counters
- `src/components/Features.tsx` — sticky invoice card with scroll-scrubbed active feature row
- `src/components/Shopping.tsx` — parallax card pair on scroll
- `src/components/Partners.tsx` — staggered reveal grid
- `src/components/Testimonial.tsx` — Framer Motion carousel
- `src/components/CTAFooter.tsx` — giant outline wordmark that fills in on scroll

All animation respects standard mouse interaction; on touch devices the custom cursor is
hidden automatically. Fully responsive down to ~360px.
