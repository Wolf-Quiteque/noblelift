import type { Config } from "tailwindcss";

// Tailwind utilities + preflight are emitted only into app/(admin)/admin.css,
// which is imported solely by the admin layout — so Next route-splits it and it
// never loads on the public site. Scanning all app/components files for class
// names is harmless (public components use no Tailwind classes).
export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#e74d17",
          dark: "#c43e10",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
