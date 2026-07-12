import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { PricingContent } from "@/components/pricing-content"

export const metadata: Metadata = {
  title: "Pricing - Free & Affordable Plans for Every Creator | Socipub",
  description: "Socipub pricing: Free plan with 5 posts/mo, Pro at $19/mo or $190/yr, Team at $49/mo or $490/yr. No credit card required to start.",
}

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you grow.</p>
          </div>
        </section>

        <PricingContent />

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-center">Frequently asked questions</h2>
            <div className="mt-8 space-y-6">
              {[
                { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade at any time. Your scheduled posts and connected accounts transfer seamlessly between plans." },
                { q: "Is there a free trial for Pro?", a: "The Pro plan includes a 14-day free trial. No credit card required to start." },
                { q: "What payment methods do you accept?", a: "All major credit cards, PayPal, Apple Pay, and Google Pay via Creem, our Merchant of Record." },
                { q: "Can I self-host for free?", a: "Yes. Socipub is MIT licensed. You can self-host on your own infrastructure at no cost." },
                { q: "What's the difference between monthly and yearly?", a: "Yearly billing gives you a 17% discount - 2 months free compared to monthly. Same features, same access." },
              ].map((item) => (
                <div key={item.q}>
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="/sign-up"><Button size="lg">Get Started Free</Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
