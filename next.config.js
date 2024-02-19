/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    //removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
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
    // resolve configuration
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

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = nextConfig;
