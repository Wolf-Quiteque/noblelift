# Google Search Console SEO Checklist

Use this after deploying the latest site build.

## One-time setup

1. Submit the sitemap:
   - Open Google Search Console.
   - Go to `Indexing > Sitemaps`.
   - Submit: `https://www.nobliftangola.com/sitemap.xml`.

2. Test crawl files:
   - Open `https://www.nobliftangola.com/robots.txt`.
   - Open `https://www.nobliftangola.com/sitemap.xml`.
   - Confirm the sitemap lists `/`, `/produtos`, `/contato`, `/sobre`, and `/galeria`.

3. Inspect important URLs:
   - `https://www.nobliftangola.com/`
   - `https://www.nobliftangola.com/produtos`
   - `https://www.nobliftangola.com/contato`
   - `https://www.nobliftangola.com/sobre`
   - `https://www.nobliftangola.com/galeria`

For each URL, use `URL Inspection`, confirm it is indexable, then request indexing if Google has not indexed it yet.

## Weekly checks

1. `Performance > Search results`
   - Sort by high impressions and low CTR.
   - Improve titles/descriptions for pages with many impressions but low clicks.
   - Improve content/internal links for queries ranking around positions 8-20.

2. `Indexing > Pages`
   - Fix important URLs listed as blocked, duplicate, crawled but not indexed, or discovered but not indexed.
   - Ignore intentionally blocked admin URLs.

3. `Experience > Core Web Vitals`
   - Prioritize mobile issues first.
   - Revalidate fixes after deploys.

4. `Security & Manual Actions`
   - Confirm there are no security issues or manual actions.

5. `Links`
   - Make sure `/produtos` and `/contato` receive internal links from the homepage, navigation, footer, and relevant content.

## Notes

- Search Console cannot directly boost rankings. It shows what Google can crawl, index, and rank.
- If the production domain changes later, update `siteUrl` in `lib/seo.ts` before deploying.
- If Google asks for an HTML verification tag/file later, add the exact token Google gives you. Do not invent one.
