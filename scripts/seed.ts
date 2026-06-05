/**
 * Seeds the `content` table with the current site content so the database
 * starts identical to the bundled site. Run once after applying the migration:
 *
 *   npm run seed
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (the service-role key bypasses RLS for this one-off insert).
 */
import { createClient } from "@supabase/supabase-js";
import { site } from "../lib/content/site";
import { home } from "../lib/content/home";
import { products } from "../lib/content/products";
import { gallery } from "../lib/content/gallery";
import { about } from "../lib/content/about";
import { contentSchemas } from "../lib/schemas";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "✗ Faltam variáveis: NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY (em .env.local)."
  );
  process.exit(1);
}

const documents = { site, home, products, gallery, about } as const;

async function main() {
  const supabase = createClient(url!, serviceKey!, {
    auth: { persistSession: false },
  });

  const rows = (Object.keys(documents) as (keyof typeof documents)[]).map((key) => {
    // Validate against the schema so we never seed malformed content.
    const parsed = contentSchemas[key].parse(documents[key]);
    return { key, data: parsed };
  });

  const { error } = await supabase
    .from("content")
    .upsert(rows, { onConflict: "key" });

  if (error) {
    console.error("✗ Erro ao semear:", error.message);
    process.exit(1);
  }

  console.log(`✓ Semeados ${rows.length} documentos: ${rows.map((r) => r.key).join(", ")}`);
}

main();
