# CMS Setup — Noblelift Angola

One-time setup to connect the admin (`/admin`) to Supabase + Cloudflare R2.

## 1. Environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|----------|------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same page → `anon` `public` key |
| `SUPABASE_SERVICE_ROLE_KEY` | same page → `service_role` key (secret — seed only) |
| `R2_ACCOUNT_ID` | Cloudflare dashboard → account ID |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | R2 → Manage R2 API Tokens → Create (S3 Auth) |
| `R2_BUCKET` | your R2 bucket name (e.g. `noblelift`) |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | R2 bucket → Settings → Public access (the `pub-xxxx.r2.dev` URL or your custom domain) |

## 2. Database

In the Supabase dashboard → **SQL Editor**, paste and run the contents of
[`supabase/migrations/0001_content.sql`](supabase/migrations/0001_content.sql).
This creates the `content` table with the read/write RLS policies.

## 3. Seed the content

Loads the current site content into the database so it starts identical:

```bash
npm run seed
```

## 4. Create the admin user

Supabase → **Authentication → Users → Add user** (set email + password).
Then disable public signups: **Authentication → Providers → Email →** turn
**off** "Enable sign-ups" (invite-only). Any logged-in user can edit.

## 5. Cloudflare R2 — public access & CORS

- Enable **Public access** on the bucket (gives the `pub-xxxx.r2.dev` URL used in
  `NEXT_PUBLIC_R2_PUBLIC_URL`), or attach a custom domain (e.g. `cdn.noblelift.ao`).
- Uploads go server-side through a Server Action, so no bucket CORS rule is
  required for uploading. (Public read is enough for serving images.)

## 6. Run

```bash
npm run dev          # http://localhost:3000  (site)  ·  /admin (CMS)
```

Log in at `/admin`, edit any section, click **Guardar e publicar** — the public
page updates immediately (on-demand revalidation).

## Deploy (Vercel)

- Add all the env vars from `.env.local` to the Vercel project (Production +
  Preview). `NEXT_PUBLIC_*` and the rest.
- If you use a custom R2 domain, no extra Next config is needed (images render via
  plain `<img>`).
- Server Actions (content save + uploads) run on the Node.js runtime by default.

## Notes

- Existing bundled images under `/public/assets` keep working; newly uploaded
  files are served from R2. Image fields accept either a `/assets/...` path or a
  full `https://...` URL.
- If Supabase isn't reachable, the public site automatically falls back to the
  bundled seed content, so it never breaks.
