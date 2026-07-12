import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Terms of Service - Socipub",
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: January 2026</p>
          <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>By using Socipub, you agree to these terms. If you do not agree, do not use the service.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">2. Service Description</h2>
              <p>Socipub is an open source social media scheduling tool. The source code is available under the MIT license. A cloud-hosted version is provided as a service.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">3. User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Comply with each platform&apos;s terms of service</li>
                <li>Not use Socipub for spam or abusive content</li>
                <li>Maintain the security of your account</li>
              </ul>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">4. Payment Terms</h2>
              <p>Paid plans are billed via Creem (Merchant of Record). Refunds are handled per Creem&apos;s refund policy. You can cancel anytime.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
              <p>Socipub is provided &quot;as is&quot; without warranty. We are not liable for damages arising from use of the service.</p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
