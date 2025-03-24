import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog/posthog";
import AuthProvider from "./AuthProvider";
import PostHogProvider from "@/lib/posthog/posthogProvider";
import PostHogWrapper from "@/lib/posthog/posthogWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waivify | Easy Digital Waivers & Consent Forms",
  description:
    "Waivify helps your business ditch paperwork. Create, share, and collect legally binding digital signatures and waivers in seconds—perfect for tattoo shops, yoga studios, clinics, and more.",
  keywords: [
    "digital waivers",
    "consent forms",
    "digital signatures",
    "electronic forms",
    "mobile waivers",
    "online waiver service",
    "paperless forms",
    "waiver app",
    "e-signatures",
  ],
  openGraph: {
    title: "Waivify | Easy Digital Waivers & Consent Forms",
    description:
      "Waivify helps your business ditch paperwork. Create, share, and collect legally binding digital signatures and waivers in seconds—perfect for tattoo shops, yoga studios, clinics, and more.",
    url: "https://www.waivify.com",
    siteName: "Waivify",
    images: [
      {
        url: "https://www.waivify.com/your-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waivify | Easy Digital Waivers & Consent Forms",
    description:
      "Waivify helps your business ditch paperwork. Create, share, and collect legally binding digital signatures and waivers in seconds—perfect for tattoo shops, yoga studios, clinics, and more.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <PostHogWrapper>
        <html lang='en'>
          <body className={inter.className}>
            {children}
            <Analytics />
            <Toaster />
          </body>
        </html>
      </PostHogWrapper>
    </AuthProvider>
  );
}
