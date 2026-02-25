import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://barnes.biz"),
  title: "Christopher Barnes | Cloud Systems Engineer",
  description: "Cloud Systems Engineer: I design, automate, and operate infrastructure with Kubernetes, Terraform, and a heavy dose of curiosity.",
  openGraph: {
    title: "Christopher Barnes | Cloud Systems Engineer",
    description: "Cloud Systems Engineer: I design, automate, and operate infrastructure with Kubernetes, Terraform, and a heavy dose of curiosity.",
    url: "https://barnes.biz",
    siteName: "barnes.biz",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://barnes.biz",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
