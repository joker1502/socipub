import { notFound } from "next/navigation"
import Link from "next/link"
import { blogPosts } from "@/lib/blog/posts"
import { Calendar, Clock, Hash } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarkdownContent } from "@/components/markdown-content"
import { Breadcrumb } from "@/components/breadcrumb"
import type { Metadata } from "next"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = blogPosts.find((p) => p.slug === slug)
    if (!post) return {}
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
      },
    }
  })
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("##"))
    .map((line) => {
      const level = line.startsWith("###") ? 3 : 2
      const text = line.replace(/^#{2,3}\s+/, "").replace(/`/g, "")
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      return { id, text, level }
    })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const related = blogPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://socipub.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://socipub.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  }

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-4 py-16">
          <Breadcrumb items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]} />

          <div className="flex gap-10">
            {/* TOC - sidebar */}
            {headings.length > 0 && (
              <aside className="hidden w-56 shrink-0 lg:block">
                <div className="sticky top-24 space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">On this page</h4>
                  <nav className="space-y-1">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block text-sm transition-colors hover:text-foreground ${
                          h.level === 3 ? "pl-3 text-muted-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-3" />{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="size-3" />{post.readTime}</span>
              </div>

              <div className="mt-10">
                <MarkdownContent content={post.content} />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog/tag/${tag}`} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
                    <Hash className="size-3" />
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-16 border-t pt-10">
                  <h2 className="text-xl font-bold mb-6">Related Articles</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="group rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
                        <h3 className="font-medium group-hover:text-brand transition-colors">{r.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="size-3" />
                          {r.date}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
