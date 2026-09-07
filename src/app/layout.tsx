import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Serif_Devanagari } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoDeva = Noto_Serif_Devanagari({
  variable: "--font-deva",
  subsets: ["devanagari"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Hazel India",
    "facility management",
    "green FM",
    "AI facility management",
    "ESG",
    "Hyderabad",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoDeva.variable} antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
