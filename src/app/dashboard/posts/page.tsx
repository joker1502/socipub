import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Calendar, CheckCircle2, Clock4, FileEdit, XCircle } from "lucide-react"

const statusIcon = {
  draft: FileEdit,
  scheduled: Clock4,
  published: CheckCircle2,
  failed: XCircle,
}

const statusColor = {
  draft: "text-muted-foreground",
  scheduled: "text-warning",
  published: "text-success",
  failed: "text-danger",
}

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Posts</h1>
        <p className="text-sm text-muted-foreground">View and manage your posts</p>
      </div>

      {!posts?.length ? (
        <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
          <p className="text-lg font-medium">No posts yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create your first post to get started.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Content</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Platforms</th>
                <th className="p-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => {
                const Icon = statusIcon[post.status as keyof typeof statusIcon] || FileEdit
                return (
                  <tr key={post.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="max-w-xs truncate p-3">{post.content || "(no content)"}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusColor[post.status as keyof typeof statusColor] || ""}`}>
                        <Icon className="size-3.5" />
                        {post.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {Array.isArray(post.platforms) ? post.platforms.join(", ") : "-"}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
