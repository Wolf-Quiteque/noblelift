// PostCSS only processes CSS imported through the bundler (the admin's
// app/(admin)/admin.css). The public theme CSS is served from /public via
// <link> and is never touched here.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
