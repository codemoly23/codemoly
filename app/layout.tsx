import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeMoly - Build Your Next Digital Experience",
  description:
    "Create stunning web applications with our cutting-edge development platform. Fast, reliable, and built for the modern web.",
  keywords:
    "web development, mobile apps, AI solutions, development tools, CodeMoly",
  authors: [{ name: "CodeMoly Team" }],
  creator: "CodeMoly",
  publisher: "CodeMoly",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: "CodeMoly - Build Your Next Digital Experience",
    description:
      "Create stunning web applications with our cutting-edge development platform. Fast, reliable, and built for the modern web.",
    url: "https://codemoly.com",
    siteName: "CodeMoly",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CodeMoly - Modern Development Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMoly - Build Your Next Digital Experience",
    description:
      "Create stunning web applications with our cutting-edge development platform. Fast, reliable, and built for the modern web.",
    images: ["/og-image.jpg"],
    creator: "@codemoly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager gtmId="GTM-NT98MXWS" />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
