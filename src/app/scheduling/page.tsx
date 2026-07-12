import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { CalendarClock, ArrowRight, Clock, Calendar, Zap, Brain, Edit3, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Lightweight Social Media Scheduler - Socipub",
  description: "Lightweight social media scheduler with AI-powered timing, drag & drop calendar, and bulk scheduling. No bloatware.",
  openGraph: {
    title: "Lightweight Social Media Scheduler - Socipub",
    description: "AI-powered scheduling with drag & drop calendar. No bloatware.",
  },
}

export default function SchedulingPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <CalendarClock className="mx-auto size-12 text-brand" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Lightweight Social Media Scheduler</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule posts at the perfect time with AI-powered suggestions. A visual calendar, bulk import, and automatic queue - all in a lightweight package with no bloatware.
            </p>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { icon: Brain, title: "AI-Powered Timing", desc: "Our AI analyzes your audience engagement patterns to suggest the best times to post on each platform. Maximize reach without guesswork." },
                { icon: Calendar, title: "Drag & Drop Calendar", desc: "A visual month view that shows all your scheduled posts at a glance. Drag posts between days to reschedule. The current day is highlighted for easy orientation." },
                { icon: Zap, title: "Bulk Scheduling", desc: "Import posts from a CSV file and schedule them in bulk. Plan an entire month of content in a single session. Perfect for content batching workflows." },
                { icon: Clock, title: "Automatic Publish Queue", desc: "The background queue processes scheduled posts automatically, even when you are offline. Reliable delivery with built-in retry logic for failed publishes." },
                { icon: Edit3, title: "Platform-Aware Limits", desc: "Each platform has different character limits - Twitter at 280, LinkedIn at 3,000. The editor warns you when approaching limits and prevents over-limit publishes." },
                { icon: FileText, title: "Draft Management", desc: "Save unfinished posts as drafts and come back later. Drafts are preserved with their platform selections and images intact." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-6 transition-all hover:shadow-soft">
                  <item.icon className="size-8 text-brand" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold">How Scheduling Works</h2>
                <ol className="mt-6 space-y-4">
                  <li className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-primary-foreground">1</span>
                    <div><span className="font-medium">Create Your Post</span><p className="text-sm text-muted-foreground">Write in the Markdown editor, add images, and select target platforms.</p></div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-primary-foreground">2</span>
                    <div><span className="font-medium">Choose Schedule or Publish Now</span><p className="text-sm text-muted-foreground">Publish immediately or pick a future date and time using the datetime picker.</p></div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-primary-foreground">3</span>
                    <div><span className="font-medium">Monitor in Calendar</span><p className="text-sm text-muted-foreground">View all scheduled posts in the month calendar. Reschedule by dragging.</p></div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-medium text-primary-foreground">4</span>
                    <div><span className="font-medium">Automatic Publishing</span><p className="text-sm text-muted-foreground">The queue processes posts at their scheduled time. Status updates are reflected in real time.</p></div>
                  </li>
                </ol>
              </div>
              <div className="rounded-xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Why Choose a Lightweight Scheduler?</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Faster to learn - no enterprise bloatware",
                    "Lower cost - free to start, affordable to scale",
                    "Open source - full control over your data",
                    "Self-host option - deploy on your own infrastructure",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold">Start scheduling smarter today</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/sign-up" class="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80">Get Started Free <ArrowRight className="ml-1 size-4" /></a>
              <a href="/pricing"><Button variant="outline" size="lg">View Pricing</Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
