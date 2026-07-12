import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PostEditor } from "./post-editor"

export default async function CreatePostPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("id, platform, platform_username, platform_name, avatar_url")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="h-full">
      <PostEditor accounts={accounts ?? []} userId={user.id} />
    </div>
  )
}
