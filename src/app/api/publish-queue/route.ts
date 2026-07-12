import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const now = new Date().toISOString()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "scheduled")
    .lte("scheduled_at", now)
    .limit(10)

  if (error) {
    console.error("Queue fetch error:", error)
    return NextResponse.json({ processed: 0, error: error.message }, { status: 500 })
  }

  if (!posts?.length) return NextResponse.json({ processed: 0 })

  let processed = 0
  for (const post of posts) {
    const platformIds = post.platforms as string[]
    if (!platformIds?.length) continue

    const { data: accounts } = await supabase
      .from("social_accounts")
      .select("*")
      .in("id", platformIds)

    if (!accounts?.length) continue

    let allOk = true
    for (const account of accounts) {
      const result = await publishToPlatform(account, post.content)
      if (!result.ok) allOk = false
    }

    await supabase.from("posts").update({
      status: allOk ? "published" : "failed",
      published_at: allOk ? now : null,
    }).eq("id", post.id)

    if (allOk) processed++
  }

  return NextResponse.json({ processed })
}

async function publishToPlatform(account: { platform: string; access_token: string; platform_account_id: string }, content: string): Promise<{ ok: boolean }> {
  if (account.platform === "twitter") {
    return publishToTwitter(account.access_token, content)
  }
  if (account.platform === "linkedin") {
    return publishToLinkedIn(account.access_token, account.platform_account_id, content)
  }
  return { ok: false }
}

async function publishToTwitter(accessToken: string, content: string) {
  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ text: content }),
  })
  return { ok: res.ok }
}

async function publishToLinkedIn(accessToken: string, accountId: string, content: string) {
  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: `urn:li:person:${accountId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text: content },
          shareMediaCategory: "NONE",
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  })
  return { ok: res.ok }
}
