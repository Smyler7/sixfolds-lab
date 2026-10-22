# Sixfolds Lab website

Responsive corporate website built with React, TypeScript, Vite, React Router, Tailwind CSS and Lucide icons.

## Start locally

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm run dev`.

Run `npm run build` for the TypeScript check and optimized Vite bundle.

## Live website

The `main` branch deploys to GitHub Pages at `https://smyler7.github.io/sixfolds-lab/`. The workflow builds the site and publishes the `dist` directory. Client-side routes use the `/sixfolds-lab/` base path and an SPA fallback for direct links.

## Before launch

- Product pages describe concepts in development. Confirm availability and capabilities before changing status copy.
- The contact form is intentionally not connected. It validates inputs in the browser and clearly states that nothing was sent. Configure a verified backend endpoint, server-side validation and spam protection before accepting enquiries.
- Company location, public email, social profiles, team facts, publication dates, testimonials and credentials were not supplied and are not invented.
- The site uses client-side routing. Add prerendering or SSR for production SEO if server or build infrastructure is available.
- Set `SITE_URL` to the verified HTTPS production origin and run `npm run sitemap` to generate `public/sitemap.xml`. Do not publish a sitemap until the domain is confirmed.
- Product concepts and exploratory research notes are labeled transparently. Replace or expand them with approved content as it becomes available.

## Structure

- `src/App.tsx` — shared layout, route pages, navigation and reusable content components
- `src/styles.css` — design tokens, responsive layout and reduced-motion support
- `public/` — static metadata assets
- `scripts/generate-sitemap.mjs` — sitemap generator requiring the verified site origin
