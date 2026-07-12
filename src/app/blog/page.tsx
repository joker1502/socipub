import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog/posts"
import { Calendar, Clock, Hash } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Blog - Socipub",
  description: "Tips, guides, and comparisons for social media scheduling. Open source alternatives to Buffer, Hootsuite, Postiz, and Later.",
}

export default function BlogPage() {
  const allTags = [...new Set(blogPosts.flatMap((p) => p.tags))].sort()

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-muted-foreground">Tips, guides, and updates for social media scheduling.</p>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Browse by topic:</span>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
              >
                <Hash className="size-3" />
                {tag}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group border-b pb-8">
                <Link href={`/blog/${post.slug}`} className="block space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag}`} className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors">
                        <Hash className="size-2.5" />
                        {tag}
                      </Link>
                    ))}
                  </div>
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
