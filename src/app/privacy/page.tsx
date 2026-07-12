import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Privacy Policy - Socipub",
  description: "Socipub privacy policy. Learn how we collect, use, and protect your data in compliance with GDPR.",
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>
          <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
              <p>When you use Socipub, we collect:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Account information (email, name) via OAuth providers</li>
                <li>Social media account connections and tokens</li>
                <li>Post content you create and schedule</li>
                <li>Usage data for service improvement</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Data</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide social media scheduling services</li>
                <li>To process payments via Creem (our Merchant of Record)</li>
                <li>To improve our service</li>
                <li>To never sell your data to third parties</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">3. Data Storage & Security</h2>
              <p>Your data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer EU-based hosting for GDPR compliance. Social media tokens are stored encrypted.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Your Rights (GDPR)</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Delete your data (right to be forgotten)</li>
                <li>Export your data in portable format</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
              <p>For privacy inquiries, contact us at privacy@socipub.com</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
