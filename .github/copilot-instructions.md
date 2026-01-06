<!-- .github/copilot-instructions.md - guidance for AI contributors in this repo -->

This file gives concise, project-specific instructions for AI coding agents working on the SEO Halle Astro website.

1. Big picture
   - This is an Astro (v4) static site using the island pattern: pages in `src/pages/` compose `sections/`, `organisms/`, `molecules/`, and `atoms/` under `src/components/`.
   - Interactive behavior is implemented mostly as small client-side scripts inside Astro components (see `src/components/organisms/Navigation.astro` and `src/components/molecules/ConsentBanner.astro`). Avoid moving logic to heavy frameworks unless necessary.
   - React is available for component islands (`@astrojs/react`) — prefer Astro components for layout and light JS in-place for simple interactions.

2. Build & dev commands (use from repo root)
   - dev: `npm run dev` (runs `astro dev`, default host localhost:4321)
   - build: `npm run build` (produces `dist/`)
   - preview: `npm run preview`
   - Use `astro` CLI via `npm run astro ...` for additional checks.

3. Key patterns & conventions
   - Atomic structure: atoms/ → molecules/ → organisms/ → sections/ → pages/. Put new small UI elements in the correct folder.
   - Styling: Tailwind + `src/styles/global.css`. Use utility classes and add custom tokens in `tailwind.config.mjs` if needed.
   - Fonts: Lexend variable is preloaded and inlined in `src/layouts/Layout.astro`; don't duplicate font-face declarations.
   - SEO: Use `astro-seo` via the `SEO` component in `src/layouts/Layout.astro` and `SchemaOrg.astro` for structured data (see `src/pages/index.astro`).
   - Images: Astro image service uses Sharp (`astro.config.mjs`). Follow existing responsive patterns — supply explicit dimensions or use `astro` image utilities.
   - Consent & privacy: Map and analytics are loaded only after consent stored in `localStorage` (see `ConsentBanner.astro`). When adding third-party embeds, respect this pattern.
   - Inline scripts: Small DOM code inside `.astro` files is common. Keep them focused, avoid global mutations that break server rendering.

4. Integration points & external deps
   - Map embed: Google Maps iframe is injected after consent (in `ConsentBanner.astro`).
   - Icons: `astro-icon` + `@heroicons/react` are used; prefer `Icon` component usage (see `ConsentBanner.astro`).
   - Image sources allowed in `astro.config.mjs` remotePatterns include `images.pexels.com` and `seo-halle.de`.

5. Debugging & testing notes
   - Local dev server shows runtime DOM/JS issues; check browser console for errors from inline scripts.
   - Sharp image errors typically surface during `npm run dev` or `npm run build` — ensure native dependencies are installed (libvips) if CI fails.
   - For layout/visual checks, run `npm run dev` and inspect pages listed in `src/pages/` (e.g., `index.astro`, `kontakt.astro`).

6. When changing navigation or pages
   - Update `MainNav.astro` and `MobileNav.astro` when adding routes.
   - Keep `Layout.astro` SEO defaults and preloads intact; update only if the change is site-wide.

7. Small implementation contract (when adding features)
   - Inputs: new `.astro` component or page, Tailwind classes, optional small inline script.
   - Outputs: accessible HTML, no JS before consent for tracking/third-party embeds, metrics-friendly images.
   - Error modes: validate localStorage keys (e.g., `mapsConsent`) and graceful fallback when external services are blocked.

8. Files to reference for examples
   - Layout and SEO: `src/layouts/Layout.astro`
   - Navigation & scroll UX: `src/components/organisms/Navigation.astro`
   - Consent pattern: `src/components/molecules/ConsentBanner.astro`
   - Home composition: `src/pages/index.astro`
   - Tailwind & Astro config: `tailwind.config.mjs`, `astro.config.mjs`

9. Merge guidance
   - Keep changes small and focused. Run `npm run build` before opening PR. Document accessibility and privacy impact in PR description.

If any section is unclear or you need more examples (e.g., how to add a React island or wire a new map provider with consent), tell me which area to expand. 
