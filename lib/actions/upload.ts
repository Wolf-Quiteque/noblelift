"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadToR2 } from "@/lib/r2";

export type UploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

// Receives a File from the admin <ImageField>/<FileField>, uploads it to R2 and
// returns the public URL. Runs on the Node runtime (aws-sdk). Auth-guarded.
export async function uploadFile(formData: FormData): Promise<UploadResult> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Sessão expirada. Inicie sessão novamente." };

  const file = formData.get("file");
  const prefix = (formData.get("prefix") as string) || "uploads";

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Nenhum ficheiro selecionado." };
  }
  if (file.size > 15 * 1024 * 1024) {
    return { ok: false, error: "Ficheiro demasiado grande (máx. 15 MB)." };
  }

  try {
    const url = await uploadToR2(file, prefix.replace(/[^a-z0-9/_-]/gi, ""));
    return { ok: true, url };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erro no carregamento." };
  }
}
