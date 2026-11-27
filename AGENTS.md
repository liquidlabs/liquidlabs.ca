# AGENTS.md — `liquidlabs.ca`

Static website for **Liquid Labs Inc.**, deployed to GitHub Pages from `master` (custom domain configured in `CNAME`).

## Repository Structure

- **Root pages**: `index.html`, `privacy-policy.html`
  - Styles & scripts: `css/style.css`, `js/main.js`, `lib/bootstrap/css/bootstrap.min.css`, `lib/font-awesome/css/font-awesome.min.css`
- **Android app subpages (`android/<app>/`)**: 11 app directories (`index.html`, `privacy.html`, `terms-of-service.html`)
  - Shared stylesheet & script: `css/android-app.css`, `js/navbar-toggle.js` (do **not** re-introduce Bootstrap JS, jQuery, or per-folder `sticky-footer-navbar.css` files)
- **Assets & Config**: `img/` (WebP primary assets with PNG/JPG fallbacks), `site.webmanifest`, `sitemap.xml`, `robots.txt`, `budget.json`
- **CI**: `.github/workflows/lighthouse-ci.yml` runs Lighthouse CI against `master` and PRs using `budget.json`

## Web Standards & Guidelines

- **Browser Support**: Use **Baseline Widely Available** features directly. Gate **Newly / Limited Available** features (`animation-timeline: view()`, `light-dark()`, `container-type: scroll-state`) behind `@supports` with clean fallbacks (`@media (prefers-color-scheme: dark)`, `IntersectionObserver`).
- **No jQuery or Legacy Animation Libraries**: Keep all client-side interactivity in vanilla ES6+ (`IntersectionObserver`, native `<dialog>.showModal()`, CSS `scroll-behavior: smooth` + `scroll-padding-top`).
- **Dark Mode**: Maintain `<meta name="color-scheme" content="light dark">` in `<head>` and `:root { color-scheme: light dark; }` semantic tokens in `css/style.css` and `css/android-app.css`.
- **Accessibility**:
  - Keep the `.visually-hidden` skip link targeting `<main id="main" tabindex="-1">`.
  - Never suppress focus rings with `outline: none;` without a `:focus-visible` replacement.
  - Maintain sequential heading levels (`h1` → `h2` → `h3` → `h4`), `aria-label`s on icon-only controls, and `@media (prefers-reduced-motion: reduce)` guards.
- **Performance & Budgets (`budget.json`)**:
  - Keep `index.html` under **30 KB (`30,720` bytes)**—place styles in `css/style.css` and scripts in `js/main.js` rather than inline blocks.
  - Serve images as `.webp` inside `<picture>` with PNG/JPG fallbacks, explicit `width`/`height` attributes, and `loading="lazy" decoding="async"` for below-the-fold images.

## Local Development & Verification

1. **Start local server** (caching disabled):
   ```sh
   npx http-server . -p 8080 -c-1
   ```
2. **Check for legacy web patterns**:
   ```sh
   npx -y modern-web-guidance@latest legacy-scan . --json
   ```
3. **Verify pages & budgets**: Confirm HTTP 200 across `/`, `/privacy-policy.html`, and `/android/*/` pages, and check `wc -c index.html` stays below `30720`.
