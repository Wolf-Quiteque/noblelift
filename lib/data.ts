// ─────────────────────────────────────────────────────────────────────────────
//  DATA LAYER — the single boundary between the UI and the content source.
//
//  Reads the `content` table from Supabase (cached + tagged), validated with the
//  zod schemas. If Supabase isn't configured yet, or a row is missing/invalid, it
//  falls back to the bundled seed modules in lib/content/* so the site always
//  renders. Getter signatures and return shapes are unchanged → pages/components
//  never need to change.
//
//  Public pages stay static; the admin calls revalidateTag(contentTag(key)) on
//  publish (see lib/actions/content.ts) to refresh them on demand.
// ─────────────────────────────────────────────────────────────────────────────
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

import { site as siteSeed } from "@/lib/content/site";
import { home as homeSeed } from "@/lib/content/home";
import { products as productsSeed } from "@/lib/content/products";
import { gallery as gallerySeed } from "@/lib/content/gallery";
import { about as aboutSeed } from "@/lib/content/about";

import {
  SiteConfigSchema,
  HomeContentSchema,
  ProductsSchema,
  GallerySchema,
  AboutContentSchema,
  type ContentKey,
} from "@/lib/schemas";
import type {
  SiteConfig,
  HomeContent,
  ProductCategory,
  GalleryImage,
  AboutContent,
} from "@/lib/types";

export const contentTag = (key: ContentKey) => `content:${key}`;

// Anon, cookie-free client — safe to use inside unstable_cache (no request data).
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

async function fetchDoc(key: ContentKey): Promise<unknown> {
  return unstable_cache(
    async () => {
      try {
        const supabase = publicClient();
        if (!supabase) return null;
        const { data, error } = await supabase
          .from("content")
          .select("data")
          .eq("key", key)
          .maybeSingle();
        if (error || !data) return null;
        return data.data as unknown;
      } catch {
        return null;
      }
    },
    ["content", key],
    { tags: [contentTag(key)] }
  )();
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const parsed = SiteConfigSchema.safeParse(await fetchDoc("site"));
  return parsed.success ? parsed.data : siteSeed;
}

export async function getHomeContent(): Promise<HomeContent> {
  const parsed = HomeContentSchema.safeParse(await fetchDoc("home"));
  return parsed.success ? parsed.data : homeSeed;
}

export async function getProducts(): Promise<ProductCategory[]> {
  const parsed = ProductsSchema.safeParse(await fetchDoc("products"));
  return parsed.success ? parsed.data : productsSeed;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const parsed = GallerySchema.safeParse(await fetchDoc("gallery"));
  return parsed.success ? parsed.data : gallerySeed;
}

export async function getAboutContent(): Promise<AboutContent> {
  const parsed = AboutContentSchema.safeParse(await fetchDoc("about"));
  return parsed.success ? parsed.data : aboutSeed;
}
