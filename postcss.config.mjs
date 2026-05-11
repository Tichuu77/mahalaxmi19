/** @type {import('postcss-load-config').Config} */
const nextConfig = {
  output: 'export',
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  trailingSlash: true, // ← add this
}
export default  nextConfig
