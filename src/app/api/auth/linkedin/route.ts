import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getLinkedInAuthUrl } from "@/lib/oauth"
import crypto from "crypto"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL))

  const state = crypto.randomUUID()
  const url = getLinkedInAuthUrl(state)
  const response = NextResponse.redirect(url)

  response.cookies.set("linkedin_oauth_state", state, {
    httpOnly: true, secure: true, maxAge: 600, path: "/",
  })

  return response
}
