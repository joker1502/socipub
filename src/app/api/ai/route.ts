import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { text, action, userId } = body as {
    text: string
    action: "rewrite" | "translate"
    userId: string
  }

  if (!text || !action || !userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: credits } = await supabase
    .from("ai_credits")
    .select("credits_remaining")
    .eq("user_id", userId)
    .single()

  const remaining = credits?.credits_remaining ?? 0
  if (remaining < 1) {
    return NextResponse.json({ error: "Insufficient credits" }, { status: 403 })
  }

  const systemPrompt =
    action === "rewrite"
      ? "You are a social media content assistant. Rewrite the following post to be more engaging and polished. Keep the same meaning and platform-appropriate length. Return only the rewritten text."
      : "Translate the following social media post to English. Keep the tone and style appropriate for social media. Return only the translated text."

  const aiRes = await fetch("https://opencode.ai/zen/go/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENCODE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      max_tokens: 500,
    }),
  })

  if (!aiRes.ok) {
    return NextResponse.json({ error: "AI service error" }, { status: 502 })
  }

  const data = await aiRes.json()
  const result = data.choices?.[0]?.message?.content ?? ""

  await supabase.from("ai_credits").upsert({
    user_id: userId,
    credits_remaining: remaining - 1,
  }, { onConflict: "user_id" })

  return NextResponse.json({ result })
}
