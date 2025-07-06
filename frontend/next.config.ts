import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
    clientInstrumentationHook: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
    // after:true,
  },
};

export default nextConfig;
