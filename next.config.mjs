/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...other config
  sassOptions: {
    prependData: `@import "./_mantine.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl",
      },
      {
        protocol: "https",
        hostname: "random.imagecdn.app",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
