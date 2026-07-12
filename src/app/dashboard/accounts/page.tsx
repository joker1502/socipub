import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AccountsList } from "./accounts-list"

export default async function AccountsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Connected Accounts</h1>
          <p className="text-sm text-muted-foreground">Manage your social media connections</p>
        </div>
        <div className="flex gap-2">
          <a href="/api/auth/twitter" className="inline-flex h-8 items-center justify-center rounded-lg border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted">
            Connect Twitter/X
          </a>
          <a href="/api/auth/linkedin" className="inline-flex h-8 items-center justify-center rounded-lg border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted">
            Connect LinkedIn
          </a>
        </div>
      </div>
      <AccountsList accounts={accounts ?? []} />
    </div>
  )
}
