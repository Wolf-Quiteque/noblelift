# Noblelift Angola — Next.js

Pixel-perfect Next.js (App Router, TypeScript) clone of the original static
Noblelift Angola site, architected so a CMS (Supabase + Cloudflare R2) can be
added later without touching the page components.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Node 18.18+ (built/tested on Node 22).

## How it works

- **Pixel fidelity** — the original theme assets are reused verbatim from
  `public/assets/` (`style.css`, `vendor.min.css`, fonts, images). React
  components render the same markup/classes as the original HTML.
- **Behaviour** — jQuery + `vendor.min.js` (owl-carousel, niceSelect) load via
  `next/script`; the rest of the original `functions.js` behaviour (preloader,
  sticky/transparent nav, dropdown, back-to-top, accordion, lightbox) is
  reimplemented as small React client components so it survives client-side
  navigation.
- **Pages** — `/` (Início), `/sobre` (Empresa), `/produtos`, `/galeria`,
  `/contato`. The catalogue PDF and images are served from `public/assets/`.

## Content & the CMS path

All editable content lives in typed modules under [`lib/content/`](lib/content):

| File | Drives |
|------|--------|
| `site.ts` | brand, logo, contacts, navigation, footer, map embed |
| `home.ts` | home page (slider, services bar, about, CTAs, features…) |
| `products.ts` | the 5 product categories + cards |
| `gallery.ts` | showroom gallery images |
| `about.ts` | the "Empresa" page |
| `contact.ts` | the "Contato" page copy, hero and contact cards |

Components never import these directly — they call the async getters in
[`lib/data.ts`](lib/data.ts) (`getSiteConfig`, `getHomeContent`, `getProducts`,
`getGalleryImages`, `getAboutContent`). The returned shapes are defined in
[`lib/types.ts`](lib/types.ts).

### When you add the CMS

1. Create the Supabase tables mirroring the shapes in `lib/types.ts`.
2. Replace the bodies of the getters in `lib/data.ts` with Supabase queries
   (a sketch is included as comments at the bottom of that file).
3. Store Cloudflare R2 object keys in Supabase and resolve them to public URLs
   with the `r2Url()` helper (also sketched in `lib/data.ts`); add the R2
   hostname to `images.remotePatterns` in `next.config.mjs`.
4. For the quote form, swap `ContactForm`'s `handleSubmit` (currently a `mailto:`)
   to POST to an API route that persists the lead in Supabase.

Because the getter signatures and return shapes stay the same, **no page or
component code needs to change.**

## CMS (`/admin`)

A custom, intuitive admin lives at `/admin` (Supabase Auth + Postgres, Cloudflare
R2 for uploads). Everything is editable — text, images, products, gallery,
contacts and the navigation menu — through tailored forms with drag-and-drop
reordering and direct image upload. Saving runs on-demand revalidation so the
public pages update instantly.

- **Setup:** see [SETUP.md](SETUP.md) (env vars, SQL migration, `npm run seed`,
  create an admin user).
- **Isolation:** the admin uses Tailwind, route-split so it never loads on the
  pixel-perfect public site (and the theme CSS never loads in the admin).
- **Data layer:** unchanged seam — `lib/data.ts` getters now read the `content`
  table (cached + tag-revalidated) and fall back to the bundled seed content if
  Supabase is unreachable, so the site never breaks.

## Notes

- The original static HTML files (`index.html`, etc.) and `_template-archive/`
  are left in the repo for reference and are excluded from the TypeScript build.
