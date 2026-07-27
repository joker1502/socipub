import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog/posts"
import { Hash } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Topics - Socipub Blog",
  description: "Browse blog articles by topic — social media scheduling tips, open source alternatives, and cross-platform posting guides.",
}

export default function TagsPage() {
  const tags = [...new Set(blogPosts.flatMap((p) => p.tags))].sort()

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
          <p className="mt-2 text-muted-foreground">Browse articles by topic.</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const count = blogPosts.filter((p) => p.tags.includes(tag)).length
              return (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                  <Hash className="size-3" />
                  {tag} ({count})
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
