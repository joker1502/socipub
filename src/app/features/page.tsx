import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card, CardContent,
} from "@/components/ui/card"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  CalendarClock, Globe, Users, ArrowRight, BarChart3, Sparkles, Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Open Source Social Media Scheduler - Socipub",
  description: "Free, open source social media scheduler and cross-platform content publisher. For indie hackers and solo creators. Schedule posts to Twitter, LinkedIn & more.",
  openGraph: {
    title: "Open Source Social Media Scheduler - Socipub",
    description: "Free, open source social media scheduler. Self-host or cloud. Schedule posts to Twitter, LinkedIn & more.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Socipub",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description: "Open source social media scheduler. Schedule posts to Twitter, LinkedIn & more.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan" },
    { "@type": "Offer", price: "19", priceCurrency: "USD", description: "Pro plan monthly" },
    { "@type": "Offer", price: "49", priceCurrency: "USD", description: "Team plan monthly" },
  ],
}

const features = [
  { icon: Globe, title: "Multi-Platform Posting", description: "Publish to Twitter/X, LinkedIn, and more from a single dashboard. One click, all networks." },
  { icon: CalendarClock, title: "Smart Scheduling", description: "Schedule posts for optimal times with AI-powered suggestions. Drag & drop calendar view included." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Track engagement, growth, and performance across all your connected accounts in real time." },
  { icon: Users, title: "Team Collaboration", description: "Invite team members, assign roles, and collaborate on content with shared workspaces." },
  { icon: Sparkles, title: "AI Content Assistant", description: "Rewrite, translate, and optimize your posts with AI. Keep your brand voice consistent everywhere." },
  { icon: Zap, title: "Bulk Import & API", description: "Import posts from CSV, schedule in bulk, and integrate via our REST API. Built for power users." },
]

const faqs = [
  { q: "What platforms does Socipub support?", a: "Socipub supports Twitter/X, LinkedIn, and more platforms are being added regularly. Each platform connects via OAuth for secure authorization." },
  { q: "Is Socipub really open source?", a: "Yes! Socipub is open source under the MIT license. You can self-host it on your own infrastructure or use our cloud-hosted version." },
  { q: "Can I schedule posts in advance?", a: "Absolutely. Use our calendar view to schedule posts weeks or months in advance. AI-powered time suggestions help you post when your audience is most active." },
  { q: "How does the AI content assistant work?", a: "Our AI can rewrite posts in different tones, translate content, and suggest hashtags. Credits are consumed per AI operation and can be purchased separately." },
  { q: "Is my data secure?", a: "Yes. Socipub is GDPR compliant, supports EU data hosting, and uses encryption at rest and in transit. Self-hosted deployments keep data entirely on your infrastructure." },
  { q: "Can I upgrade from Free to Pro later?", a: "Yes, you can upgrade at any time. Your scheduled posts and connected accounts will transfer seamlessly." },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Socipub",
  url: "https://socipub.com",
  logo: "https://socipub.com/logo.svg",
  description: "Open source social media scheduler for indie hackers and solo creators.",
}

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-transparent to-transparent dark:from-brand/5" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 lg:py-36">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-6">
                <Badge variant="outline" className="w-fit">Self-Hosted Social Media Scheduler - Open Source</Badge>
                <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  Schedule Posts to Twitter, LinkedIn & More
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  Socipub is the ultimate social media tool for indie hackers and solo creators. A self-hosted social media scheduler that you can deploy in minutes - or use our cloud. Publish everywhere from one place.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/sign-up">
                    <Button size="lg" className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft">
                      Get Started Free
                      <ArrowRight className="size-4" />
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">No credit card required • 5 free posts/month • Open source</p>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-soft">
                  <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5">
                    <div className="size-2.5 rounded-full bg-destructive/70" />
                    <div className="size-2.5 rounded-full bg-warning/70" />
                    <div className="size-2.5 rounded-full bg-success/70" />
                    <span className="ml-2 text-xs text-muted-foreground">socipub.com - Dashboard</span>
                  </div>
                  <div className="flex h-80 items-center justify-center bg-gradient-to-br from-brand/5 via-background to-background p-8">
                    <div className="grid w-full grid-cols-2 gap-4">
                      <div className="space-y-3 rounded-lg border bg-card p-4">
                        <div className="h-3 w-20 rounded bg-muted" />
                        <div className="h-20 rounded bg-muted" />
                        <div className="h-3 w-32 rounded bg-muted" />
                      </div>
                      <div className="space-y-3 rounded-lg border bg-card p-4">
                        <div className="h-3 w-16 rounded bg-muted" />
                        <div className="h-20 rounded bg-muted" />
                        <div className="h-3 w-28 rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="border-b py-12">
          <div className="mx-auto max-w-6xl px-4">
            <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
              Trusted by creators and teams worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              {["TechCrunch", "IndieHackers", "ProductHunt", "HackerNews", "BetaList"].map((logo) => (
                <span key={logo} className="text-lg font-bold text-muted-foreground transition-all duration-200 hover:scale-105 hover:text-foreground">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage social media
              </h2>
              <p className="mt-4 text-muted-foreground">
                A lightweight, open source tool for solo creators and small teams.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title} className="group transition-all duration-200 hover:border-brand/30 hover:shadow-soft">
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <div className="flex size-10 items-center justify-center rounded-lg border bg-brand-light text-brand dark:bg-brand/10">
                      <f.icon className="size-5" />
                    </div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-lg font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t py-16 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold">Ready to start scheduling?</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/sign-up" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80">Get Started Free <ArrowRight className="ml-1 size-4" /></a>
              <a href="/pricing"><Button variant="outline" size="lg">View Pricing</Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
