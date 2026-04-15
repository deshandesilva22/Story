# Hourglass Studios — Website

A community-driven, animation-rich website for Hourglass Studios
([hourglassstudios.com.au](https://hourglassstudios.com.au)), with purple +
green gradient accents, plug-and-play Momence widgets, and an Instagram-style
community grid (sourced from [@hourglassstudios_hs](https://www.instagram.com/hourglassstudios_hs/)).

## Pages

| Page | File | Highlights |
|------|------|-----------|
| Home | `index.html` | Hero collage, marquee, features, classes preview, IG grid, stats, testimonials, CTA |
| About | `about.html` | Story, values, team, stats |
| Classes | `classes.html` | Class types, **Momence schedule widget**, pricing |
| Community | `community.html` | Larger IG grid, events, member spotlight |
| Testimonials | `testimonials.html` | Featured quotes, **Momence reviews widget**, social proof |
| Contact | `contact.html` | Contact info, form, map, FAQ |

## Brand & Animation

- **Colours**: Purple `#7c3aed` and Green `#10b981`, used as gradient accents
  throughout (text, buttons, blobs, cards, dividers).
- **Type**: Fraunces (display) + Inter (UI) via Google Fonts.
- **Motion**:
  - Animated gradient blobs with parallax (`.blob`)
  - Word-by-word hero entry
  - Scroll-reveal (`.reveal`, `.reveal-scale`) using IntersectionObserver
  - Hover lifts on cards, gradient sweeps on buttons
  - Animated number counters
  - Marquee strip
  - Soft cursor glow (desktop)
  - Pulsing live tags
  - All animations respect `prefers-reduced-motion`

## Replacing placeholder assets

### 1) Logo

Replace `assets/logo/logo.svg` with the **existing official Hourglass logo**.
The path is referenced from every page header, footer, favicon and contact map
pin — no markup changes needed if you keep the filename.

### 2) Instagram photos

The IG grids on `index.html` and `community.html` currently use Unsplash
placeholders. Save real photos from
[@hourglassstudios_hs](https://www.instagram.com/hourglassstudios_hs/) into
`assets/images/` and update the `<img src=...>` paths inside the `.ig-tile`
elements. Each tile already links to the Instagram profile.

### 3) Class & team photos

Same treatment — swap the Unsplash URLs in `.class-card img`, `.split-image
img`, `.team-photo img`, and the hero collage cards (`.cc-1`, `.cc-2`,
`.cc-3`).

## Momence widgets

Two pages embed Momence:

1. **`classes.html` → "Live timetable"** — schedule / booking widget
2. **`testimonials.html` → "Live reviews"** — reviews widget

Both currently point to placeholder URLs:

```
https://app.momence.com/embed/schedule/HOURGLASS-STUDIO-ID
https://app.momence.com/embed/reviews/HOURGLASS-STUDIO-ID
```

To activate the real widgets:

1. Log into your Momence Studio dashboard.
2. **Settings → Integrations → Embed Widgets**.
3. Copy the embed snippet for **Schedule** and for **Reviews / Testimonials**.
4. Replace the placeholder `<iframe>` block (clearly marked with HTML comments
   in each file) with the snippet Momence gives you. Most Momence embeds are a
   `<script>` tag plus a target `<div>`; you can paste those directly inside
   the `.momence-widget` container.

## Local preview

It's a static site — open `index.html` in your browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## File structure

```
.
├── index.html
├── about.html
├── classes.html         # Momence Schedule widget
├── community.html
├── testimonials.html    # Momence Reviews widget
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── logo/
    │   └── logo.svg     # ← REPLACE WITH OFFICIAL LOGO
    └── images/          # Drop Instagram & studio photos here
```
