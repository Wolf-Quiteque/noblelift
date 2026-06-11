/**
 * Seeds the `content` table with bundled default content.
 *
 * Env:
 * - Reads `.env`, then `.env.local` if present.
 * - Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 *
 * Safety:
 * - `npm run seed` inserts only missing rows, so current CMS edits are kept.
 * - `npm run seed:force` overwrites all seeded documents with bundled defaults.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { site } from "../lib/content/site";
import { home } from "../lib/content/home";
import { products } from "../lib/content/products";
import { gallery } from "../lib/content/gallery";
import { about } from "../lib/content/about";
import { contact } from "../lib/content/contact";
import { contentSchemas } from "../lib/schemas";

function loadEnvFile(fileName: string, override = false) {
  const filePath = resolve(process.cwd(), fileName);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (override || process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local", true);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const force = process.argv.includes("--force");

if (!url || !serviceKey) {
  console.error(
    "x Missing NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY in .env or .env.local."
  );
  process.exit(1);
}

const documents = { site, home, products, gallery, about, contact } as const;

async function main() {
  const supabase = createClient(url!, serviceKey!, {
    auth: { persistSession: false },
  });

  const rows = (Object.keys(documents) as (keyof typeof documents)[]).map((key) => {
    const parsed = contentSchemas[key].parse(documents[key]);
    return { key, data: parsed };
  });

  const { error } = await supabase.from("content").upsert(rows, {
    onConflict: "key",
    ignoreDuplicates: !force,
  });

  if (error) {
    if (error.message.includes("public.content")) {
      console.error(
        "x Seed failed: public.content does not exist. Run supabase/migrations/0001_content.sql in the Supabase SQL Editor, then run npm run seed again."
      );
      process.exit(1);
    }

    console.error("x Seed failed:", error.message);
    process.exit(1);
  }

  const action = force ? "Upserted" : "Inserted missing";
  console.log(`${action} ${rows.length} content documents: ${rows.map((r) => r.key).join(", ")}`);
}

main();
