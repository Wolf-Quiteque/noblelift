"use server";

import { revalidateTag } from "next/cache";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { contentSchemas, type ContentKey } from "@/lib/schemas";
import { contentTag } from "@/lib/data";

export type SaveResult = { ok: true } | { ok: false; error: string };

// Validates and upserts a content document, then revalidates the public pages
// that depend on it. Called from the admin editors' save bar.
export async function saveContent(key: ContentKey, input: unknown): Promise<SaveResult> {
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      error: "Supabase ainda nao esta configurado. Configure .env.local para publicar alteracoes.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Sessão expirada. Inicie sessão novamente." };

  const parsed = contentSchemas[key].safeParse(input);
  if (!parsed.success) {
    const detail = parsed.error.issues
      .slice(0, 3)
      .map((i) => `${i.path.join(".") || "campo"}: ${i.message}`)
      .join("; ");
    return { ok: false, error: `Dados inválidos — ${detail}` };
  }

  const { error } = await supabase
    .from("content")
    .upsert({ key, data: parsed.data, updated_by: user.id }, { onConflict: "key" });

  if (error) return { ok: false, error: error.message };

  revalidateTag(contentTag(key));
  return { ok: true };
}
