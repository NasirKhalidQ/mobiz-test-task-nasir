/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: "https://dummyjson.com/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mobizinc.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
