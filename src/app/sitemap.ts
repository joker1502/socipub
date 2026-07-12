import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/blog/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://socipub.com"

  const staticPages = [
    { url: base, changeFrequency: "monthly" as const, priority: 1 },
    { url: `${base}/features`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/multi-platform`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/scheduling`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/markdown`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/trust`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: 0.9 },
    ...blogPosts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.flatMap((post) =>
      post.tags.map((tag) => ({
        url: `${base}/blog/tag/${tag}`,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    ),
  ]

  return staticPages
}
