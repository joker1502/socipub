import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getTwitterAuthUrl } from "@/lib/oauth"
import crypto from "crypto"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL))

  const state = crypto.randomUUID()
  const codeVerifier = crypto.randomBytes(32).toString("base64url")

  const url = getTwitterAuthUrl(state, codeVerifier)
  const response = NextResponse.redirect(url)

  response.cookies.set("twitter_oauth_state", state, {
    httpOnly: true, secure: true, maxAge: 600, path: "/",
  })
  response.cookies.set("twitter_code_verifier", codeVerifier, {
    httpOnly: true, secure: true, maxAge: 600, path: "/",
  })

  return response
}
