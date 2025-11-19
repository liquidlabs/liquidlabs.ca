# Copilot Instructions for liquidlabs.ca

## Repository Overview

This repository contains the **static website for Liquid Labs Inc.**, a professional mobile and desktop application development company based in Toronto, Canada. The site showcases their Android apps and services. The repository is approximately **6.6MB** in size with **136 files** including 20 HTML files, 20 JavaScript files, and 13 CSS files.

### Technology Stack
- **Pure HTML/CSS/JavaScript** - No build tools or package managers required
- **Bootstrap 4** - Frontend framework (via CDN and local lib/)
- **jQuery** - JavaScript library for DOM manipulation
- **Regna Template** - Bootstrap-based one-page template from BootstrapMade
- **Font Awesome** - Icon library
- **Additional libraries**: Animate.css, WOW.js, Superfish, Waypoints, CounterUp, Easing
- **Node.js v20+** - Only required for local development server (not part of the codebase)

### Domain
The site is hosted at **liquidlabs.ca** (CNAME file in root).

## Local Development & Testing

### Starting a Local Server
**ALWAYS use npx to avoid global installation issues:**
```bash
npx http-server . -p 8080 -c-1
```
- The `-c-1` flag disables caching, ensuring you see changes immediately
- Server starts on `http://localhost:8080`
- Wait 5 seconds after starting before testing URLs
- The server runs in the background; use `pkill -f http-server` to stop it

### Testing Pages Locally
All pages must be accessible before pushing:
```bash
curl -I http://localhost:8080/
curl -I http://localhost:8080/privacy-policy.html
curl -I http://localhost:8080/android/remote-notify/
curl -I http://localhost:8080/android/weather-alert/
```
All should return `HTTP/1.1 200 OK`.

## Validation & CI/CD

### Lighthouse CI Workflow
The **only automated validation** is the Lighthouse CI GitHub Actions workflow (`.github/workflows/lighthouse-ci.yml`), which runs on:
- Push to `master` branch
- Pull requests to `master` branch

**Workflow Steps:**
1. Checks out code
2. Sets up Node.js v22
3. Installs http-server globally (`npm install -g http-server`)
4. Starts local server on port 8080
5. Runs Lighthouse audits on 4 URLs:
   - `http://localhost:8080`
   - `http://localhost:8080/privacy-policy.html`
   - `http://localhost:8080/android/remote-notify/`
   - `http://localhost:8080/android/weather-alert/`
6. Validates against performance budgets in `budget.json`

**Performance Budgets (budget.json):**
- **Interactive**: 10s max
- **First Contentful Paint**: 5s max
- **Largest Contentful Paint**: 10s max
- **Cumulative Layout Shift**: 0.1 max
- **Total Resources**: 1500KB max (scripts: 550KB, stylesheets: 300KB, images: 600KB, fonts: 200KB)
- **Resource Counts**: Total 80 resources max (25 scripts, 10 stylesheets, 25 images, 8 fonts)

**To replicate Lighthouse CI locally (optional):**
```bash
npx http-server . -p 8080 -c-1 &
sleep 5
npx @lhci/cli@0.13.x autorun --config=budget.json
```

### No Linting or Build Steps
- **No ESLint, Prettier, or other linters** are configured
- **No build process** - files are served as-is
- **No tests** - validation is purely via Lighthouse CI
- **No package.json** - this is intentional; the project has no npm dependencies

## Repository Structure

### Root Directory Files
- `index.html` - Main landing page (company homepage)
- `privacy-policy.html` - Privacy policy page
- `README.md` - Brief project description
- `Readme.txt` - Template attribution (Regna theme)
- `budget.json` - Lighthouse performance budgets
- `site.webmanifest` - PWA manifest
- `CNAME` - Domain configuration (liquidlabs.ca)
- `.gitignore` - Ignores `.DS_Store` only

### Key Directories

#### `/css/`
- `style.css` - Main custom stylesheet (19KB)
- `scss-files.txt` - Note that SCSS sources are in pro version (not available)

#### `/js/`
- `main.js` - Main JavaScript for site interactions (navigation, scrolling, mobile menu)
- `/vendor/` - Empty vendor directory

#### `/lib/`
Third-party libraries bundled locally:
- `bootstrap/` - Bootstrap CSS and JS
- `jquery/` - jQuery library
- `font-awesome/` - Icon fonts
- `animate/` - Animate.css
- `wow/` - WOW.js for scroll animations
- `superfish/` - Superfish menu plugin
- `waypoints/` - Waypoints library
- `counterup/` - CounterUp plugin
- `easing/` - jQuery Easing

#### `/img/`
- Company logos, favicons, and app screenshots
- `/portfolio/` - Subdirectory for portfolio images

#### `/android/`
Landing pages for Android apps (each has index.html, privacy.html, terms-of-service.html, sticky-footer-navbar.css):
- `remote-notify/` - Remote Notify app
- `weather-alert/` - Weather Alert app  
- `keep-alive/` - Keep Alive app
- `vision/` - Vision app
- `trmnl-buddy/` - TRMNL Buddy app
- `trmnl-display/` - TRMNL Display app

#### `/contactform/`
- `contactform.js` - Client-side form validation
- `contact-handler.php` - Server-side handler (pro version needed for full functionality)
- `Readme.txt` - Notes about pro version

#### `/.github/`
- `/workflows/lighthouse-ci.yml` - Lighthouse CI configuration

## Making Changes

### HTML Changes
- Main site content is in `index.html`
- Maintain consistent Bootstrap classes and structure
- Test all navigation links after changes
- Ensure meta tags (SEO, Open Graph, Twitter Cards) are accurate
- Note: There's a TODO comment at line 179 about changing button link

### CSS Changes
- Edit `css/style.css` directly
- SCSS sources are not available (pro version only)
- Test responsive design (mobile, tablet, desktop)
- Avoid breaking Bootstrap grid or component styles

### JavaScript Changes  
- Main site JS is in `js/main.js`
- Contact form validation in `contactform/contactform.js`
- Test all interactive features: navigation, smooth scrolling, mobile menu, portfolio filters
- Ensure jQuery and plugin dependencies are loaded in correct order

### Adding New Android App Pages
1. Create new directory under `/android/{app-name}/`
2. Include: `index.html`, `privacy.html`, `terms-of-service.html`, `sticky-footer-navbar.css`
3. Follow structure of existing app pages (e.g., `android/remote-notify/`)
4. Add app icon to `/img/` directory
5. Update main `index.html` showcase section if needed
6. **Important**: Add new URL to Lighthouse CI workflow if it should be validated

### Image Optimization
- Respect performance budgets (600KB total for images)
- Use appropriate formats (PNG for logos, JPG for photos, SVG for icons)
- Compress images before adding

## Common Issues & Solutions

### Issue: HTTP Server Permission Denied
**Solution**: Use `npx http-server` instead of global install to avoid permission issues.

### Issue: Changes Not Visible in Browser
**Solution**: Use `-c-1` flag with http-server to disable caching, or hard refresh browser (Ctrl+Shift+R).

### Issue: Lighthouse CI Failing on Budget
**Solution**: 
1. Check `budget.json` for limits
2. Identify oversized resources using browser DevTools Network tab
3. Optimize images, minify CSS/JS, or remove unused resources
4. Verify total resource size: `du -sh css/ js/ img/`

### Issue: 404 Errors for Android App Pages
**Solution**: Ensure directory has `index.html` and trailing slash in URL (e.g., `/android/remote-notify/`).

### Issue: Mobile Navigation Not Working
**Solution**: Test jQuery and plugins load order in browser console; check `js/main.js` mobile navigation code (lines 32-69).

## Pre-Push Checklist

Before pushing changes:
1. ✅ Start local server: `npx http-server . -p 8080 -c-1`
2. ✅ Test all modified pages load correctly
3. ✅ Check browser console for JavaScript errors
4. ✅ Test responsive design (mobile, tablet, desktop)
5. ✅ Verify no broken links or images
6. ✅ Ensure changes don't exceed performance budgets
7. ✅ Test navigation and interactive features

## Trust These Instructions

These instructions are comprehensive and validated. **Only search or explore further if:**
- Information here is incomplete for your specific task
- You encounter errors not documented here
- You need to understand code logic not described here

For routine changes (HTML content, CSS styling, adding pages), follow these instructions directly without additional exploration.
