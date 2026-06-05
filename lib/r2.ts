import "server-only";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Cloudflare R2 is S3-compatible. All R2_* secrets stay server-only; only
// NEXT_PUBLIC_R2_PUBLIC_URL (the public bucket/CDN base) is exposed to the client.

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;
const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

function getClient() {
  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error(
      "R2 não está configurado. Defina R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY e R2_BUCKET."
    );
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Uploads a file to R2 under `prefix/` and returns its public URL.
 * @param file   the File from a FormData submission
 * @param prefix folder, e.g. "gallery", "products", "site"
 */
export async function uploadToR2(file: File, prefix: string): Promise<string> {
  if (!publicUrl) {
    throw new Error("Defina NEXT_PUBLIC_R2_PUBLIC_URL para servir os ficheiros carregados.");
  }
  const client = getClient();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "ficheiro";
  const key = `${prefix}/${Date.now()}-${base}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: bucket!,
      Key: key,
      Body: bytes,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return `${publicUrl.replace(/\/+$/, "")}/${key}`;
}
