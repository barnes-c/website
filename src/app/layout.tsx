import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "my-website",
  description: "A personal website built with Next.js",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
