import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://najwan-portofolio.vercel.app"),
  title: "Muhammad Najwan Pratomo — Web Developer & AI Prompt Engineer",
  description:
    "Membangun sistem web dan solusi AI untuk bisnis, komunitas, dan institusi pendidikan. Fullstack developer berbasis di Tangerang, Indonesia.",
  openGraph: {
    title: "Muhammad Najwan Pratomo — Web Developer & AI Prompt Engineer",
    description:
      "Membangun sistem web dan solusi AI untuk bisnis, komunitas, dan institusi pendidikan.",
    url: "https://najwan-portofolio.vercel.app",
    siteName: "Muhammad Najwan Pratomo",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Najwan Pratomo — Web Developer & AI Prompt Engineer",
    description:
      "Membangun sistem web dan solusi AI untuk bisnis, komunitas, dan institusi pendidikan.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink-950 text-mist-100 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}