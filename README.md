# The Human Canon

> The greatest books ever written — distilled for modern life.

**[Live app on Vercel - the-human-canon.vercel.app](https://the-human-canon.vercel.app/)**

|                                               |                                           |
| :-------------------------------------------: | :---------------------------------------: |
| ![Landing page](assets/the-human-landing.png) | ![Books page](assets/the-human-books.png) |

A curated digital institution dedicated to the most important books in human history. Across civilizations. Across centuries. Built as a content-first, SEO-optimized web application with a focus on performance, type safety, and maintainability.

---

## Technology Stack

### Core

| Layer         | Technology              | Rationale                                                                                                                                     |
| ------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | Next.js 15 (App Router) | React Server Components, streaming, built-in optimizations. App Router enables colocated layouts, loading states, and granular data fetching. |
| **Language**  | TypeScript 5            | End-to-end type safety from API to UI. Strict mode for catch-at-compile-time errors.                                                          |
| **Runtime**   | React 19                | Latest concurrent features, improved hydration, and performance.                                                                              |
| **Styling**   | Tailwind CSS 3.4        | Utility-first, design tokens via CSS variables, dark/light theme support. No runtime CSS-in-JS overhead.                                      |
| **Bundler**   | Turbopack (dev)         | Native Rust-based bundler for sub-second HMR during development.                                                                              |

### Data & Backend

| Layer            | Technology                 | Rationale                                                                                 |
| ---------------- | -------------------------- | ----------------------------------------------------------------------------------------- |
| **Database**     | Supabase (PostgreSQL)      | Managed Postgres with real-time capabilities, RLS for security, and a generous free tier. |
| **ORM / Client** | Supabase JS v2             | Type-safe client, automatic connection pooling, SSR-compatible.                           |
| **Auth**         | Supabase Auth              | JWT-based auth, social providers, row-level security integration.                         |
| **Storage**      | Static assets in `public/` | Author images, favicon. CDN-ready for Vercel deployment.                                  |

### Architecture Decisions

- **JSONB for content**: Books and authors are stored as JSONB documents. Schema evolution without migrations; rich nested structures (key ideas, quotes, related books) without joins. Indexed on `slug` and `status` for fast lookups.
- **Dual Supabase clients**: Server-side canon data uses anon key (no cookies) for static generation and edge caching. User-specific data (favorites, wishlist) uses cookie-based client for authenticated requests.
- **Static generation by default**: All book and author pages use `generateStaticParams` for build-time pre-rendering. Sitemap and metadata generated from the same data layer.
- **Seed script with service role**: Idempotent upserts for content. Service role bypasses RLS for seeding; anon key enforces read-only public access at runtime.

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, Google Fonts (Libre Baskerville, Source Sans 3), theme script
│   ├── page.tsx            # Homepage with hero, featured shelf, themes, FAQ
│   ├── books/              # Canon browse + dynamic book pages
│   ├── authors/            # Author index + dynamic author profiles
│   ├── themes/             # Theme browse + dynamic theme pages
│   ├── (auth)/             # Route group: sign-in, sign-up
│   ├── sitemap.ts          # Dynamic sitemap from books + authors
│   └── globals.css         # Design tokens, theme variables, utility classes
│
├── components/             # Reusable UI
│   ├── header.tsx
│   ├── footer.tsx
│   ├── book-cover.tsx      # Graceful fallback (initials) when image fails
│   ├── author-image.tsx    # Same pattern for author avatars
│   ├── book-actions.tsx    # Favorite, read, wishlist (client)
│   ├── book-page-content.tsx
│   ├── faq-accordion.tsx   # Accessible accordion (WAI-ARIA)
│   └── accessible-accordion.tsx
│
├── lib/                    # Business logic & data access
│   ├── books/              # getAllBooks, getBookBySlug, getRelatedBooks
│   ├── authors/            # getAllAuthors, getAuthorBySlug, image-path mapping
│   ├── supabase/           # Server + browser clients, queries
│   └── actions/            # Server actions for book actions
│
├── seed-data/              # Source of truth (excluded from build)
│   ├── books.ts            # CanonBook[] — 40+ titles
│   └── authors.ts          # CanonAuthor[] — full bios, key facts, legacy
│
├── scripts/
│   └── seed.ts             # tsx script: upsert books + authors to Supabase
│
└── supabase/migrations/    # SQL migrations
    ├── 001_user_book_actions.sql   # favorites, read_status, wishlist + RLS
    └── 002_canon_books_authors.sql # canon_books, canon_authors + RLS
```

---

## Key Features

- **Content-first design**: Rich book summaries, key ideas, notable quotes, and “why it matters today” sections. Author bios with early life, philosophy, legacy.
- **SEO**: Per-page metadata (`generateMetadata`), dynamic sitemap, semantic HTML, Open Graph tags.
- **Accessibility**: WAI-ARIA accordions, keyboard navigation, theme-aware contrast.
- **Theming**: Dark (default, IMDb-inspired) and light (Flexoki-inspired warm paper) via CSS variables and `data-theme`.
- **Responsive**: Mobile-first grid layouts, fluid typography, touch-friendly targets.
- **Type safety**: Shared `CanonBook` and `CanonAuthor` types across seed data, lib, and components.

---

## E2E Testing (Playwright)

Production-quality end-to-end tests cover home, books, authors, navigation, FAQ, and auth flows.

```bash
# Install browsers (first time only)
npx playwright install

# Run all E2E tests (builds app, starts server, runs tests)
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed
```

Tests run against Chromium, Firefox, and WebKit by default. Use `--project=chromium` to run only Chromium for faster feedback.

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Supabase account

## Deployment

Optimized for **Vercel**:

- Static pages pre-rendered at build
- Edge-ready for API routes if added
- Automatic preview deployments from `main`

---

## License

Private. All rights reserved.
