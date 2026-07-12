import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FileEdit, Users, Calendar, BarChart3 } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [{ count: accountCount }, { count: publishedCount }, { count: scheduledCount }, { count: draftCount }, { data: recentPosts }] = await Promise.all([
    supabase.from("social_accounts").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "published").gte("created_at", startOfMonth),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "scheduled"),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "draft"),
    supabase.from("posts").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user.email}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
          <Users className="size-5 text-brand" />
          <p className="mt-3 text-2xl font-bold">{accountCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">Connected accounts</p>
        </div>
        <div className="rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
          <FileEdit className="size-5 text-brand" />
          <p className="mt-3 text-2xl font-bold">{publishedCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">Posts published this month</p>
        </div>
        <div className="rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
          <Calendar className="size-5 text-brand" />
          <p className="mt-3 text-2xl font-bold">{scheduledCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </div>
        <div className="rounded-xl border bg-card p-4 transition-all hover:shadow-soft">
          <BarChart3 className="size-5 text-brand" />
          <p className="mt-3 text-2xl font-bold">{draftCount ?? 0}</p>
          <p className="text-xs text-muted-foreground">Drafts</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b px-4 py-3">
          <h2 className="text-sm font-medium">Recent Posts</h2>
        </div>
        {recentPosts && recentPosts.length > 0 ? (
          <div className="divide-y">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-4 py-3">
                <p className="truncate text-sm">{post.content || "(no content)"}</p>
                <span className="ml-3 shrink-0 text-xs capitalize text-muted-foreground">{post.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No posts yet. <a href="/dashboard/create" className="text-brand underline">Create your first post</a>
          </div>
        )}
      </div>
    </div>
  )
}
