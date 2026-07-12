"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    prices: { mo: "$0", yr: "$0" },
    desc: "For hobbyists trying out social media scheduling.",
    features: ["5 posts per month", "2 platforms", "Basic scheduling"],
    cta: "Get Started",
  },
  {
    name: "Pro",
    prices: { mo: "$19", yr: "$190" },
    desc: "For solo creators who need unlimited scheduling.",
    features: ["Unlimited posts", "All platforms", "Scheduling + analytics", "AI credits included"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    prices: { mo: "$49", yr: "$490" },
    desc: "For agencies and small teams.",
    features: ["5 seats included", "Bulk import", "Priority support", "API access"],
    cta: "Contact Sales",
  },
]

export function PricingContent() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="border-b py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={cn("text-sm", !yearly ? "font-medium text-foreground" : "text-muted-foreground")}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              yearly ? "bg-brand" : "bg-muted",
            )}
          >
            <span
              className={cn(
                "inline-block size-5 rounded-full bg-white transition-transform shadow-sm",
                yearly ? "translate-x-[22px]" : "translate-x-[2px]",
              )}
            />
          </button>
          <span className={cn("text-sm", yearly ? "font-medium text-foreground" : "text-muted-foreground")}>Yearly</span>
          <Badge variant="outline" className="text-xs">Save 17%</Badge>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = yearly ? plan.prices.yr : plan.prices.mo
            const period = yearly ? "/yr" : "/mo"
            return (
              <Card key={plan.name} className={cn("relative flex flex-col transition-all duration-200 hover:shadow-soft", plan.popular && "ring-2 ring-brand overflow-visible")}>
                {plan.popular && <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand text-primary-foreground">Most Popular</Badge>}
                <CardContent className="flex flex-1 flex-col gap-6 pt-8">
                  <div>
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className="text-sm text-muted-foreground">{period}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 shrink-0 text-success" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.name === "Free" ? "/sign-up" : `/api/creem/checkout?plan=${plan.name.toUpperCase()}_${yearly ? "YEARLY" : "MONTHLY"}`}
                    className="mt-auto w-full"
                  >
                    <Button variant={plan.popular ? "default" : "outline"} className="w-full">{plan.cta}</Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
