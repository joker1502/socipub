import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Code } from "lucide-react"

export const metadata: Metadata = {
  title: "Markdown Social Media Tool - Socipub",
  description: "Write social media posts in Markdown. Format with bold, italic, links, and lists, then publish to Twitter, LinkedIn, and more.",
  openGraph: {
    title: "Markdown Social Media Tool - Socipub",
    description: "Write once in Markdown, publish to Twitter, LinkedIn, and more.",
  },
}

export default function MarkdownPage() {
  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <FileText className="mx-auto size-12 text-brand" />
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Write in Markdown, Publish Everywhere</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Format your content with Markdown in the Socipub editor. Bold, italic, links, lists, and headings - write once, publish to every platform at once.
            </p>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Code className="size-3" />
                  Markdown Input
                </div>
                <pre className="font-mono text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{`# Big Announcement 🎉

We just launched **version 2.0** with *major* improvements:

- AI-powered scheduling
- LinkedIn integration
- Bulk CSV import

Check it out at [socipub.com](https://socipub.com)

Built with ❤️ by our team`}</pre>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <FileText className="size-3" />
                  Rendered Output
                </div>
                <div className="space-y-2 text-sm leading-relaxed">
                  <h3 className="text-lg font-bold">Big Announcement 🎉</h3>
                  <p>We just launched <strong>version 2.0</strong> with <em>major</em> improvements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>AI-powered scheduling</li>
                    <li>LinkedIn integration</li>
                    <li>Bulk CSV import</li>
                  </ul>
                  <p>Check it out at <span className="text-brand">socipub.com</span></p>
                  <p>Built with ❤️ by our team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-2xl font-bold text-center">Markdown Syntax Reference</h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">Simple formatting that works everywhere.</p>
            <div className="mt-8 overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-medium">Style</th>
                    <th className="p-4 text-left font-medium">Syntax</th>
                    <th className="p-4 text-left font-medium">Example Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { style: "Bold", syntax: "**text**", output: "**text**" },
                    { style: "Italic", syntax: "*text*", output: "*text*" },
                    { style: "Link", syntax: "[text](url)", output: "text (linked)" },
                    { style: "List", syntax: "- item", output: "• item" },
                    { style: "Heading", syntax: "# Title", output: "Title (large)" },
                  ].map((row) => (
                    <tr key={row.style}>
                      <td className="p-4 font-medium">{row.style}</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{row.syntax}</td>
                      <td className="p-4 text-muted-foreground">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-b py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold">Why Markdown for Social Media?</h2>
                <ul className="mt-6 space-y-4">
                  {[
                    { title: "Write Once, Publish Everywhere", desc: "Compose in Markdown and let Socipub handle platform-specific rendering. Consistent formatting across Twitter, LinkedIn, and more." },
                    { title: "Faster Than Rich Text Editors", desc: "No mouse needed. Keyboard-friendly syntax keeps your hands on the keys and your thoughts flowing." },
                    { title: "Portable & Future-Proof", desc: "Markdown files are plain text. They work in any editor, any version control system, and will still be readable decades from now." },
                    { title: "Git-Friendly", desc: "Store your content drafts in Git. Track changes, collaborate with teammates, and review diffs before publishing." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded bg-brand-light text-brand text-xs font-bold dark:bg-brand/10">✓</div>
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Markdown vs Rich Text</h3>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    { feature: "Learning Curve", md: "Minimal (30 min)", rt: "None" },
                    { feature: "Writing Speed", md: "Fast (keyboard)", rt: "Slow (mouse)" },
                    { feature: "Portability", md: "Any editor", rt: "Locked in" },
                    { feature: "Version Control", md: "Git-friendly", rt: "Binary diffs" },
                    { feature: "Platform Consistency", md: "Predictable", rt: "Varies" },
                  ].map((row) => (
                    <div key={row.feature} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <span>{row.feature}</span>
                      <div className="flex gap-4">
                        <span className="text-success">{row.md}</span>
                        <span className="text-muted-foreground">{row.rt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold">Ready to write faster?</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/sign-up"><Button size="lg">Start Writing <ArrowRight className="ml-1 size-4" /></Button></a>
              <a href="/features"><Button variant="outline" size="lg">Explore Features</Button></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
