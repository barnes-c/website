import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  output: "export" // enables `next export` → ./out
};

export default nextConfig;
