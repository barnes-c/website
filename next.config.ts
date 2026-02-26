import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/outpost.goauthentik.io/:path*",
        destination:
          "http://authentik-server.authentik.svc.cluster.local/outpost.goauthentik.io/:path*",
      },
    ]
  },
};

export default nextConfig;
