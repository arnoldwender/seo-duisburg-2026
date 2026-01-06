# Architecture Documentation

## Overview

The SEO Halle website is built as a modern static site using Astro's island architecture, combining the performance benefits of static site generation with the interactivity of React components where needed.

## Technology Stack

### Core Technologies

**Astro 4.3.5**
- Static site generator with partial hydration
- Island architecture for optimal performance
- Built-in TypeScript support
- Multiple framework support (React, Vue, Svelte)

**React 18.2.0**
- Used for interactive components only
- Selective hydration for performance
- Modern hooks and concurrent features

**TypeScript**
- Type safety across the codebase
- Better IDE support and autocomplete
- Catch errors at compile time

**Tailwind CSS 3.4.1**
- Utility-first CSS framework
- Design system implementation
- Responsive design utilities
- Dark mode support

## Architecture Patterns

### Island Architecture

The site uses Astro's island architecture where:
- Most content is static HTML (zero JavaScript)
- Interactive components are "islands" that hydrate independently
- Islands can use different frameworks
- Optimal performance through minimal JavaScript

**Benefits:**
- Fast initial page loads
- Progressive enhancement
- Better SEO (server-rendered HTML)
- Reduced JavaScript bundle size

**Implementation:**
```astro
---
// Static content - no JavaScript
import Hero from '../components/sections/Hero.astro';

// Interactive island - hydrates on client
import ContactForm from '../components/molecules/ContactForm.astro';
---

<Hero /> <!-- Pure HTML, no JS -->
<ContactForm client:visible /> <!-- Hydrates when visible -->
```

### Atomic Design System

Components are organized following atomic design principles:

```
atoms/          → Basic building blocks (Button, Logo)
  ↓
molecules/      → Simple combinations (ContactForm, ServiceCard)
  ↓
organisms/      → Complex assemblies (Header, Footer)
  ↓
sections/       → Page sections (Hero, Services)
  ↓
pages/          → Complete pages (index, contact)
```

**Benefits:**
- Clear component hierarchy
- Easy to locate and reuse components
- Scalable architecture
- Consistent design language

### Component Composition

Components are composed from smaller parts:

```astro
<!-- Page -->
<Layout>
  <Header />
  <main>
    <Hero />        <!-- Section -->
    <Services />    <!-- Section -->
  </main>
  <Footer />
</Layout>

<!-- Section -->
<section>
  <ServiceCard /> <!-- Molecule -->
  <ServiceCard />
  <ServiceCard />
</section>

<!-- Molecule -->
<Card>            <!-- Atom -->
  <Icon />        <!-- Atom -->
  <Button />      <!-- Atom -->
</Card>
```

## Directory Structure

```
project/
├── public/                    # Static assets (served as-is)
│   ├── images/                # Brand assets, logos
│   ├── fonts/                 # Web fonts
│   ├── captions/              # Accessibility captions
│   └── favicon.svg
│
├── src/
│   ├── assets/                # Processed assets
│   │   ├── astro.svg
│   │   └── background.svg
│   │
│   ├── components/
│   │   ├── atoms/             # Basic UI elements
│   │   │   ├── BackToTop.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Logo.astro
│   │   │   └── SchemaOrg.astro
│   │   │
│   │   ├── molecules/         # Composite components
│   │   │   ├── AccessibilityTools.astro
│   │   │   ├── ConsentBanner.astro
│   │   │   ├── ContactForm.astro
│   │   │   ├── DarkModeToggle.astro
│   │   │   ├── MainNav.astro
│   │   │   ├── MobileNav.astro
│   │   │   ├── ServiceCard.astro
│   │   │   └── TestimonialCard.astro
│   │   │
│   │   ├── organisms/         # Complex assemblies
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   └── Navigation.astro
│   │   │
│   │   └── sections/          # Page sections
│   │       ├── Hero.astro
│   │       ├── Services.astro
│   │       ├── About.astro
│   │       ├── Testimonials.astro
│   │       ├── FAQ.astro
│   │       └── CtaSection.astro
│   │
│   ├── layouts/               # Page templates
│   │   └── Layout.astro       # Base layout
│   │
│   ├── pages/                 # File-based routing
│   │   ├── index.astro        # Homepage (/)
│   │   ├── kontakt.astro      # Contact (/kontakt)
│   │   ├── datenschutz.astro  # Privacy (/datenschutz)
│   │   └── ...
│   │
│   ├── styles/
│   │   └── global.css         # Global styles, animations
│   │
│   └── env.d.ts               # TypeScript definitions
│
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Routing System

### File-Based Routing

Astro uses file-based routing where files in `src/pages/` map to URLs:

```
src/pages/index.astro           → /
src/pages/kontakt.astro         → /kontakt
src/pages/datenschutz.astro     → /datenschutz
src/pages/ueber-uns.astro       → /ueber-uns
```

### Dynamic Routes

For future expansion, dynamic routes use bracket notation:

```
src/pages/blog/[slug].astro     → /blog/any-slug
src/pages/[...path].astro       → Catch-all route
```

## Data Flow

### Props Down, Events Up

```astro
---
// Parent passes data down
<ServiceCard
  title="SEO Audit"
  description="..."
  icon="chart"
/>

// Child emits events up (via callbacks)
<Button onClick={handleClick} />
---
```

### State Management

**Local State:**
- Use React hooks for interactive components
- Prefer `useState`, `useReducer` for component state

**Global State:**
- Dark mode preference (localStorage)
- Cookie consent (localStorage)
- Navigation state (reactive)

**Server State:**
- Form submissions (API routes)
- Contact requests
- Newsletter signups

## Styling Architecture

### Tailwind Configuration

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {...},  // Brand blue
        accent: {...},   // Brand orange
        gray: {...}      // Neutral scale
      }
    }
  }
}
```

### CSS Layers

```css
/* src/styles/global.css */

@layer base {
  /* Base styles, resets, defaults */
  html { scroll-behavior: smooth; }
  body { @apply text-gray-900 dark:text-gray-100; }
}

@layer components {
  /* Reusable component classes */
  .btn { @apply px-4 py-2 rounded-lg; }
  .card { @apply bg-white dark:bg-gray-800; }
}

@layer utilities {
  /* Custom utility classes */
  .text-balance { text-wrap: balance; }
}
```

### Design Tokens

Centralized design values:

```css
:root {
  /* Spacing */
  --container-padding: 1rem;

  /* Typography */
  --font-family-sans: 'Lexend Variable', system-ui;

  /* Layout */
  --nav-height: 5rem;
  --top-bar-height: 3rem;

  /* Colors (via Tailwind) */
}
```

## Performance Architecture

### Static Generation

```
Build Time:
  Pages → Astro compiler → Optimized HTML

Runtime:
  HTML (instant) → JavaScript (islands only) → Interactive
```

### Code Splitting

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'lexend': ['@fontsource-variable/lexend']
          }
        }
      }
    }
  }
});
```

**Chunks:**
- Common dependencies bundled together
- Fonts separated for caching
- Page-specific code split automatically
- Vendor code cached separately

### Image Optimization

```astro
---
import { Image } from 'astro:assets';
---

<Image
  src={heroImage}
  alt="..."
  width={1920}
  height={1080}
  format="avif"
  quality={80}
  loading="eager"
/>
```

**Pipeline:**
1. Source image → Sharp processor
2. Generate multiple formats (AVIF, WebP, fallback)
3. Generate multiple sizes (srcset)
4. Optimize and compress
5. Output with proper attributes

### Progressive Enhancement

```astro
<!-- Works without JavaScript -->
<a href="#services" class="btn">View Services</a>

<!-- Enhanced with JavaScript -->
<a href="#services" class="btn" data-smooth-scroll>View Services</a>

<script>
  // Enhance if JavaScript available
  document.querySelectorAll('[data-smooth-scroll]').forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
</script>
```

## Accessibility Architecture

### Semantic HTML Foundation

```html
<!-- Proper landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Main">
    ...
  </nav>
</header>

<main id="main" role="main" tabindex="-1">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
    ...
  </section>
</main>

<footer role="contentinfo">
  ...
</footer>
```

### Focus Management

```css
/* Visible focus indicators */
:focus-visible {
  @apply outline-none ring-2 ring-primary-700 ring-offset-2;
}

/* Skip links */
.skip-link {
  @apply sr-only focus:not-sr-only;
}
```

### ARIA Implementation

```astro
<!-- Descriptive labels -->
<button aria-label="Toggle dark mode" aria-pressed={isDark}>
  <Icon name={isDark ? 'moon' : 'sun'} />
  <span class="sr-only">
    {isDark ? 'Dark' : 'Light'} mode active
  </span>
</button>

<!-- Live regions -->
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

## SEO Architecture

### Meta Data Management

```astro
---
// Layout.astro
const { title, description, image, canonical } = Astro.props;
---

<head>
  <title>{title} | SEO Halle</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
</head>
```

### Structured Data

```astro
---
// SchemaOrg.astro
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SEO Halle",
  "description": "...",
  "url": "https://seo-halle.de",
  "address": {...},
  "telephone": "...",
  "openingHours": "..."
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Sitemap Generation

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://seo-halle.de',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-DE' }
      }
    })
  ]
});
```

## Security Architecture

### Input Validation

```typescript
// Form validation
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function validateForm(data: ContactFormData): ValidationResult {
  const errors: string[] = [];

  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }

  if (!data.message || data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return { valid: errors.length === 0, errors };
}
```

### Content Security

```astro
---
// Sanitize user content
import DOMPurify from 'isomorphic-dompurify';

const safeContent = DOMPurify.sanitize(userContent);
---

<div set:html={safeContent} />
```

## Build Process

### Build Pipeline

```
1. Source Files
   ↓
2. TypeScript Compilation
   ↓
3. Astro Compilation
   ↓
4. Component Rendering (SSG)
   ↓
5. CSS Processing (Tailwind, PostCSS)
   ↓
6. JavaScript Bundling (Vite)
   ↓
7. Image Optimization (Sharp)
   ↓
8. HTML Minification
   ↓
9. Output to dist/
```

### Optimization Steps

**HTML:**
- Minification
- Compression
- Inline critical CSS

**CSS:**
- Tailwind purging
- PostCSS processing
- Minification
- Autoprefixer

**JavaScript:**
- Tree shaking
- Code splitting
- Minification
- Source maps (dev only)

**Images:**
- Format conversion (AVIF, WebP)
- Resizing for responsive
- Compression
- Metadata stripping

## Deployment Architecture

### Static Output

```
dist/
├── index.html              # Optimized HTML
├── kontakt/index.html
├── _astro/                 # Hashed assets
│   ├── hero.abc123.avif
│   ├── styles.def456.css
│   └── main.ghi789.js
└── sitemap.xml
```

### CDN Strategy

```
Browser → CDN Edge → Origin
         ↓
    Cache (30 days)

HTML: Cache 1 hour, revalidate
CSS/JS: Cache 1 year (hashed)
Images: Cache 1 year (hashed)
```

### Environment Variables

```env
# .env
PUBLIC_SITE_URL=https://seo-halle.de
PUBLIC_CONTACT_EMAIL=info@seo-halle.de

# Build-time only (not exposed to client)
PRIVATE_API_KEY=xxx
```

## Monitoring & Analytics

### Performance Monitoring

- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Synthetic monitoring
- Lighthouse CI

### Error Tracking

- Client-side error logging
- Build error reporting
- Deployment verification

### Analytics

- Privacy-first analytics
- Cookie consent integration
- User behavior tracking (with consent)

## Future Considerations

### Scalability

- CDN for global distribution
- Image CDN for optimization
- API routes for dynamic content
- Database integration for CMS

### Progressive Enhancement

- Service Worker for offline support
- Push notifications
- Background sync
- App-like experience (PWA)

### Internationalization

- Multi-language support
- RTL language support
- Locale-specific content
- Currency and date formatting

---

This architecture provides a solid foundation for a performant, accessible, and maintainable website while remaining flexible for future enhancements.
