/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: { allowedOrigins: ["localhost:3001", "rh.ixamee.com"] },
  swcMinify: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ybwqmrrlvmpdikvmkqra.supabase.co",
        port: "",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    // Add the resolve configuration
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        stream: "stream-browserify",
      },
    };

    return config;
  },
};

module.exports = nextConfig;
