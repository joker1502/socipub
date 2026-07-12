import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { exchangeLinkedInCode, getLinkedInUser, storeSocialAccount } from "@/lib/oauth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) return NextResponse.redirect(new URL("/dashboard/accounts?error=denied", process.env.NEXT_PUBLIC_APP_URL))

  const cookieState = request.headers.get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith("linkedin_oauth_state="))
    ?.split("=")[1]

  if (!code || !state || state !== cookieState) {
    return NextResponse.redirect(new URL("/dashboard/accounts?error=invalid", process.env.NEXT_PUBLIC_APP_URL))
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL))

  const token = await exchangeLinkedInCode(code)
  const linkedinUser = await getLinkedInUser(token.access_token)

  await storeSocialAccount(
    user.id,
    "linkedin",
    linkedinUser.sub,
    linkedinUser.given_name,
    linkedinUser.name,
    linkedinUser.picture ?? null,
    token.access_token,
    null,
    token.expires_in,
  )

  return NextResponse.redirect(new URL("/dashboard/accounts?success=linkedin", process.env.NEXT_PUBLIC_APP_URL))
}
