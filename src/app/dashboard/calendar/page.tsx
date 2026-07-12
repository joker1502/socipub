import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CalendarView } from "./calendar-view"

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .in("status", ["scheduled", "published"])
    .gte("scheduled_at", startOfMonth)
    .lte("scheduled_at", endOfMonth)
    .order("scheduled_at", { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-sm text-muted-foreground">View and manage your scheduled posts</p>
      </div>
      <CalendarView posts={posts ?? []} />
    </div>
  )
}
