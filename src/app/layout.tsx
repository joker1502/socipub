import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/cookie-consent";
import { GoogleAnalytics } from "@/components/google-analytics";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Socipub - Open Source Social Media Scheduler",
  description:
    "Socipub is a free, open source social media scheduler and the ultimate social media tool for indie hackers. Self-hosted or cloud — schedule posts to Twitter, LinkedIn & more.",
  openGraph: {
    title: "Socipub - Open Source Social Media Scheduler",
    description:
      "The ultimate social media tool for indie hackers. Self-hosted social media scheduler — deploy in minutes. Schedule posts to Twitter, LinkedIn & more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
