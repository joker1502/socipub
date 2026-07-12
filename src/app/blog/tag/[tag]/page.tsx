import Link from "next/link"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog/posts"
import { Calendar, Clock, Hash, X } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/breadcrumb"
import type { Metadata } from "next"

export function generateStaticParams() {
  const tags = [...new Set(blogPosts.flatMap((p) => p.tags))]
  return tags.map((tag) => ({ tag }))
}

export function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  return params.then(({ tag }) => ({
    title: `Posts tagged "${tag}" - Socipub Blog`,
    description: `Browse articles about ${tag} on Socipub - open source social media scheduling.`,
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const filtered = blogPosts.filter((p) => p.tags.includes(tag))

  if (filtered.length === 0) notFound()

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Breadcrumb items={[
            { label: "Blog", href: "/blog" },
            { label: tag },
          ]} />

          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight capitalize">{tag}</h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Hash className="size-3" />
              {tag}
            </span>
          </div>
          <p className="text-muted-foreground">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>

          <Link href="/blog" className="mt-4 inline-block">
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
              <X className="size-3" />
              Clear filter
            </Button>
          </Link>

          <div className="mt-10 grid gap-8">
            {filtered.map((post) => (
              <article key={post.slug} className="group border-b pb-8">
                <Link href={`/blog/${post.slug}`} className="block space-y-2">
                  <h2 className="text-xl font-semibold transition-colors group-hover:text-brand">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
