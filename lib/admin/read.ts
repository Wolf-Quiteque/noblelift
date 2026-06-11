import "server-only";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { contentSchemas, type ContentKey } from "@/lib/schemas";

import { site as siteSeed } from "@/lib/content/site";
import { home as homeSeed } from "@/lib/content/home";
import { products as productsSeed } from "@/lib/content/products";
import { gallery as gallerySeed } from "@/lib/content/gallery";
import { about as aboutSeed } from "@/lib/content/about";
import { contact as contactSeed } from "@/lib/content/contact";

const seeds: Record<ContentKey, unknown> = {
  site: siteSeed,
  home: homeSeed,
  products: productsSeed,
  gallery: gallerySeed,
  about: aboutSeed,
  contact: contactSeed,
};

// Fresh (uncached) read for the admin editors. Falls back to the bundled seed
// content if the row doesn't exist yet, so the editor is always pre-filled.
export async function getEditableContent<K extends ContentKey>(key: K) {
  const schema = contentSchemas[key];
  if (!hasSupabaseConfig()) {
    return schema.parse(seeds[key]) as ReturnType<
      (typeof contentSchemas)[K]["parse"]
    >;
  }

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("content")
    .select("data")
    .eq("key", key)
    .maybeSingle();

  const parsed = schema.safeParse(data?.data);
  return (parsed.success ? parsed.data : schema.parse(seeds[key])) as ReturnType<
    (typeof contentSchemas)[K]["parse"]
  >;
}
