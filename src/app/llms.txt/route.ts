import { blogPosts } from "@/lib/blog/posts"

function buildContent() {
  const base = "https://socipub.com"

  const tools = [
    ["Scheduling", `${base}/scheduling`, "Schedule posts to Twitter, LinkedIn, and more"],
    ["Multi-Platform", `${base}/multi-platform`, "Manage multiple social accounts from one dashboard"],
    ["Markdown", `${base}/markdown`, "Write posts in Markdown with live preview"],
    ["Features", `${base}/features`, "Full feature overview"],
  ].map(([title, url, desc]) => `- [${title}](${url}): ${desc}`)

  const blog = blogPosts
    .map((p) => `- [${p.title}](${base}/blog/${p.slug}): ${p.description}`)
    .join("\n")

  return `# Socipub

> Schedule posts to Twitter, LinkedIn and more with Socipub, the open source social media scheduler. Free, self-hostable alternative to Buffer, Hootsuite, and Postiz.

## Core Features
${tools.join("\n")}

## Pricing
- [Pricing](${base}/pricing): Free and paid plans
- [Trust](${base}/trust): Security, privacy, and self-hosting info

## Blog
${blog}

## Company
- [Privacy Policy](${base}/privacy)
- [Terms of Service](${base}/terms)

## Contact
- Website: ${base}
`
}

export async function GET() {
  return new Response(buildContent(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
