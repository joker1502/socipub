import { createClient } from "@/lib/supabase/server"

const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize"
const TWITTER_TOKEN_URL = "https://api.twitter.com/2/oauth2/token"
const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
const LINKEDIN_API_URL = "https://api.linkedin.com/v2"

export function getTwitterAuthUrl(state: string, codeVerifier: string) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/twitter/callback`,
    scope: "tweet.read tweet.write users.read offline.access",
    state,
    code_challenge: codeVerifier,
    code_challenge_method: "plain",
  })
  return `${TWITTER_AUTH_URL}?${params.toString()}`
}

export async function exchangeTwitterCode(code: string, codeVerifier: string) {
  const body = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: process.env.TWITTER_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/twitter/callback`,
    code_verifier: codeVerifier,
  })

  const res = await fetch(TWITTER_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${process.env.TWITTER_CLIENT_ID!}:${process.env.TWITTER_CLIENT_SECRET!}`)}`,
    },
    body: body.toString(),
  })

  const data = await res.json()
  return data as {
    access_token: string
    refresh_token?: string
    expires_in: number
    scope: string
  }
}

export async function getTwitterUser(accessToken: string) {
  const res = await fetch("https://api.twitter.com/2/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`Twitter API error: ${res.status}`)
  const data = await res.json()
  return data as { data: { id: string; name: string; username: string } }
}

export function getLinkedInAuthUrl(state: string) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`,
    scope: "openid profile email w_member_social",
    state,
  })
  return `${LINKEDIN_AUTH_URL}?${params.toString()}`
}

export async function exchangeLinkedInCode(code: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`,
  })

  const res = await fetch(LINKEDIN_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  const ldata = await res.json()
  return ldata as {
    access_token: string
    expires_in: number
    scope: string
  }
}

export async function getLinkedInUser(accessToken: string) {
  const res = await fetch(`${LINKEDIN_API_URL}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`LinkedIn API error: ${res.status}`)
  const data = await res.json()
  return data as { sub: string; name: string; given_name: string; picture?: string }
}

export async function storeSocialAccount(
  userId: string,
  platform: "twitter" | "linkedin",
  accountId: string,
  username: string,
  name: string,
  avatarUrl: string | null,
  accessToken: string,
  refreshToken: string | null,
  expiresIn: number,
) {
  const supabase = await createClient()
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn * 1000).toISOString() : null

  const { error } = await supabase.from("social_accounts").upsert({
    user_id: userId,
    platform,
    platform_account_id: accountId,
    platform_username: username,
    platform_name: name,
    avatar_url: avatarUrl,
    access_token: accessToken,
    refresh_token: refreshToken,
    token_expires_at: expiresAt,
  }, { onConflict: "user_id,platform" })

  if (error) throw error
}
