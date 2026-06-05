/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are served from /public/assets today. When the CMS is wired up,
  // they will come from Cloudflare R2 — add the R2 public hostname here then.
  images: {
    remotePatterns: [
      // Example for later (Cloudflare R2 public bucket / custom domain):
      // { protocol: 'https', hostname: '*.r2.dev' },
      // { protocol: 'https', hostname: 'cdn.noblelift.ao' },
    ],
  },
};

export default nextConfig;
