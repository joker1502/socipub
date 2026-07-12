import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Shield, Server, Lock, FileText, Download, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "GDPR Compliant Social Media Tool - Trust & Security | Socipub",
  description: "A GDPR compliant social media tool with EU data hosting, open source transparency, and enterprise-grade encryption. Socipub keeps your data safe.",
}

const trustFeatures = [
  { icon: Shield, title: "GDPR Compliant", description: "Full GDPR compliance with data processing agreements. Your data rights are protected." },
  { icon: Server, title: "EU Data Hosting", description: "Choose EU-based hosting for data residency requirements. Your data stays in the EEA." },
  { icon: Lock, title: "End-to-End Encryption", description: "AES-256 at rest, TLS 1.3 in transit. Social media tokens are encrypted." },
  { icon: FileText, title: "Open Source", description: "MIT licensed. Full code auditability. No black boxes or hidden data collection." },
  { icon: Download, title: "Data Portability", description: "Export all your data at any time. No proprietary formats or vendor lock-in." },
  { icon: Eye, title: "Transparent Practices", description: "We never sell your data. Read our privacy policy for full details." },
]

export default function TrustPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trust & Security</h1>
            <p className="mt-4 text-lg text-muted-foreground">Built for privacy. Designed for compliance. Transparent by default.</p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustFeatures.map((f) => (
                <div key={f.title} className="rounded-xl border bg-card p-6 transition-all hover:shadow-soft">
                  <f.icon className="size-8 text-brand" />
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold">Compliance Documents</h2>
            <div className="mt-6 space-y-4">
              <a href="/privacy" className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted">
                <span className="font-medium">Privacy Policy</span>
                <span className="text-sm text-muted-foreground">Read →</span>
              </a>
              <a href="/terms" className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted">
                <span className="font-medium">Terms of Service</span>
                <span className="text-sm text-muted-foreground">Read →</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
