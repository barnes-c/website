import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",  // Next.js hydration requires inline scripts
      "style-src 'self' 'unsafe-inline'",   // Tailwind + styled-jsx require inline styles
      "img-src 'self' data:",               // data: for SVG grain overlay
      "font-src 'self'",                    // next/font serves fonts locally
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
]

const nextConfig: NextConfig = {
  reactCompiler: false,
  output: "standalone",
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
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
