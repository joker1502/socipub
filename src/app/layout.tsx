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
  title: "Socipub - Social Media Scheduler",
  description:
    "Schedule posts to Twitter, LinkedIn and more with Socipub, the open source social media scheduler.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Socipub - Social Media Scheduler",
    description:
      "Schedule posts to Twitter, LinkedIn and more with Socipub, the open source social media scheduler.",
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
