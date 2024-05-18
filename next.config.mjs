import widthLess from "next-with-less";
/** @type {import('next').NextConfig} */
const nextConfig = widthLess({
  lessLoaderOptions: {},
  async redirects() {
    return [
      {
        source: "/",
        destination: "/token",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
