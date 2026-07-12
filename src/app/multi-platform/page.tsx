import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Multi-Platform Posting Tool: One Click to All Networks | Socipub",
  description: "Socipub is a single-user social media scheduler with a team upgrade path. Publish to Twitter/X, LinkedIn, and more from one dashboard. Save hours every week.",
}

export default function MultiPlatformPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Globe className="mx-auto size-12 text-brand" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Multi-Platform Posting Tool</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              One click to publish across all your social networks. Start as a single user, upgrade to a team plan when your operation grows.
            </p>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold">Supported Platforms</h2>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-bold">X</div>
                    <div><span className="font-medium">Twitter/X</span><p className="text-sm text-muted-foreground">Share threads, individual posts, and engage with your audience. 280-character limit with rich media support.</p></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-bold">in</div>
                    <div><span className="font-medium">LinkedIn</span><p className="text-sm text-muted-foreground">Publish to your professional network. Long-form content up to 3,000 characters with rich formatting.</p></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs font-bold">IG</div>
                    <div><span className="font-medium">Instagram (Coming Soon)</span><p className="text-sm text-muted-foreground">Schedule image and carousel posts to your Instagram business accounts.</p></div>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Single User? No Problem</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Socipub is designed for solo creators first. The Free plan gives you 5 posts per month on 2 platforms - enough to maintain an active presence. When you need more, the Pro plan unlocks unlimited posts and all platforms.
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Need to bring in teammates? The Team plan adds 5 seats, bulk CSV import, priority support, and API access. Your data and scheduled posts transfer seamlessly when you upgrade.
                </p>
                <div className="mt-6 flex gap-3">
                  <a href="/sign-up"><Button>Get Started <ArrowRight className="ml-1 size-4" /></Button></a>
                  <a href="/#pricing"><Button variant="outline">See Plans</Button></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-center">How Multi-Platform Posting Works</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { step: "1", title: "Connect Accounts", desc: "Securely connect your Twitter/X and LinkedIn accounts via OAuth. Your credentials are encrypted and never shared." },
                { step: "2", title: "Write Once", desc: "Compose your post in the Markdown-friendly editor. The platform character limits are displayed in real time." },
                { step: "3", title: "Publish Everywhere", desc: "Select the platforms you want and click publish. Socipub sends your content to all selected networks simultaneously." },
              ].map((item) => (
                <div key={item.step} className="rounded-xl border bg-card p-6 text-center">
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand text-sm font-medium text-primary-foreground">{item.step}</span>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold">Ready to publish everywhere from one place?</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/sign-up"><Button size="lg">Get Started Free <ArrowRight className="ml-1 size-4" /></Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
