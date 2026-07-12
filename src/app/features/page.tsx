import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Globe, Users, CalendarClock, Sparkles, BarChart3, Zap, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Social Media Scheduler for Individuals & Solo Creators | Socipub",
  description: "Socipub is a cross-platform content publisher and social media scheduler built for individuals and solo creators. Schedule posts to Twitter, LinkedIn & more with AI-powered tools.",
}

const features = [
  {
    icon: Globe, title: "Multi-Platform Posting",
    desc: "Publish to Twitter/X, LinkedIn, and more from a single dashboard. One click sends your content to every connected platform simultaneously. No need to log in to each network separately.",
  },
  {
    icon: CalendarClock, title: "Smart Scheduling",
    desc: "Schedule posts for optimal times with AI-powered time suggestions. Our drag & drop calendar lets you visualize your entire month's content at a glance. Reschedule by dragging posts between days.",
  },
  {
    icon: BarChart3, title: "Analytics Dashboard",
    desc: "Track engagement, reach, and follower growth across all your connected accounts. Measure what works and refine your content strategy with data-driven insights.",
  },
  {
    icon: Users, title: "Team Collaboration",
    desc: "Invite team members, assign roles, and collaborate on content with shared workspaces. The Team plan includes 5 seats with granular permission controls.",
  },
  {
    icon: Sparkles, title: "AI Content Assistant",
    desc: "Rewrite and translate your posts with GPT-powered AI. Keep your brand voice consistent across all platforms. AI credits are consumed per operation and can be purchased separately.",
  },
  {
    icon: Zap, title: "Bulk Import & API",
    desc: "Import posts from CSV files and schedule them in bulk — perfect for planning a month of content in one session. Our REST API lets developers integrate scheduling into their own workflows.",
  },
]

const comparisons = [
  { feature: "Price", gp: "Free – $49/mo", buffer: "$6 – $120/mo", hootsuite: "$99 – $739/mo" },
  { feature: "Open Source", gp: "Yes (MIT)", buffer: "No", hootsuite: "No" },
  { feature: "Self-Host", gp: "Yes", buffer: "No", hootsuite: "No" },
  { feature: "AI Scheduling", gp: "Included", buffer: "Premium", hootsuite: "Enterprise" },
  { feature: "Platforms", gp: "Unlimited", buffer: "2 (Free)", hootsuite: "5 (Free)" },
]

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Social Media Scheduler for Individuals & Solo Creators
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A lightweight, open source cross-platform content publisher designed for solo creators and small teams. No bloatware, no hidden fees.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <a href="/sign-up"><Button size="lg">Get Started Free <ArrowRight className="ml-1 size-4" /></Button></a>
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-xl border bg-card p-6 transition-all hover:shadow-soft">
                  <f.icon className="size-8 text-brand" />
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-center">Socipub vs Competitors</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              See how Socipub compares to Buffer and Hootsuite — the leading social media schedulers.
            </p>
            <div className="mt-8 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium">Feature</th>
                    <th className="p-4 text-left font-medium text-brand">Socipub</th>
                    <th className="p-4 text-left font-medium">Buffer</th>
                    <th className="p-4 text-left font-medium">Hootsuite</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisons.map((row) => (
                    <tr key={row.feature}>
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-brand">{row.gp}</td>
                      <td className="p-4 text-muted-foreground">{row.buffer}</td>
                      <td className="p-4 text-muted-foreground">{row.hootsuite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold">Who Is Socipub For?</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Whether you are an indie hacker managing your startup's Twitter presence, a solo creator scheduling LinkedIn posts, or a small agency handling multiple clients — Socipub scales with you.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Indie Hackers", desc: "Promote your projects across Twitter/X and LinkedIn without spending hours each day." },
                { title: "Solo Creators", desc: "Schedule a week of content in one session. Focus on creating, not posting." },
                { title: "Small Teams", desc: "Collaborate with shared workspaces, bulk import, and priority support." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-6 text-left">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center gap-3">
              <a href="/#pricing"><Button>View Pricing <ArrowRight className="ml-1 size-4" /></Button></a>
              <a href="/sign-up"><Button variant="outline">Get Started Free</Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
