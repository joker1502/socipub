import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Pricing - Free & Affordable Plans for Every Creator | Socipub",
  description: "Socipub pricing: Free plan with 5 posts/mo, Pro at $19/mo or $190/yr, Team at $49/mo or $490/yr. No credit card required to start.",
}

const plans = [
  { name: "Free", price: { mo: "$0", yr: "$0" }, period: { mo: "/mo", yr: "/yr" }, desc: "For hobbyists trying out social media scheduling.", features: ["5 posts per month", "2 platforms", "Basic scheduling"], cta: "Get Started", monthly: true },
  { name: "Pro", price: { mo: "$19", yr: "$190" }, period: { mo: "/mo", yr: "/yr" }, desc: "For solo creators who need unlimited scheduling.", features: ["Unlimited posts", "All platforms", "Scheduling + analytics", "AI credits included"], cta: "Start Free Trial", popular: true, monthly: true },
  { name: "Team", price: { mo: "$49", yr: "$490" }, period: { mo: "/mo", yr: "/yr" }, desc: "For agencies and small teams.", features: ["5 seats included", "Bulk import", "Priority support", "API access"], cta: "Contact Sales", monthly: true },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade when you grow. Save 17% with yearly billing.</p>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <Card key={plan.name} className={`relative flex flex-col transition-all duration-200 hover:shadow-soft ${plan.popular ? "ring-2 ring-brand overflow-visible" : ""}`}>
                  {plan.popular && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-primary-foreground">Most Popular</Badge>}
                  <CardContent className="flex flex-1 flex-col gap-6 pt-8">
                    <div>
                      <h2 className="text-lg font-semibold">{plan.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price.mo}</span>
                      <span className="text-sm text-muted-foreground">{plan.period.mo}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Or <span className="font-medium text-foreground">{plan.price.yr}</span>{plan.period.yr}
                      {" "}(save 17%)
                    </p>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="size-4 shrink-0 text-success" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href={plan.name === "Free" ? "/sign-up" : `/api/creem/checkout?plan=${plan.name.toUpperCase()}_MONTHLY`} className="mt-auto w-full">
                      <Button variant={plan.popular ? "default" : "outline"} className="w-full">{plan.cta}</Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold text-center">Frequently asked questions</h2>
            <div className="mt-8 space-y-6">
              {[
                { q: "Can I switch plans anytime?", a: "Yes. Upgrade or downgrade at any time. Your scheduled posts and connected accounts transfer seamlessly between plans." },
                { q: "Is there a free trial for Pro?", a: "The Pro plan includes a 14-day free trial. No credit card required to start." },
                { q: "What payment methods do you accept?", a: "All major credit cards, PayPal, Apple Pay, and Google Pay via Creem, our Merchant of Record." },
                { q: "Can I self-host for free?", a: "Yes. Socipub is MIT licensed. You can self-host on your own infrastructure at no cost." },
                { q: "What's the difference between monthly and yearly?", a: "Yearly billing gives you a 17% discount — 2 months free compared to monthly. Same features, same access." },
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
