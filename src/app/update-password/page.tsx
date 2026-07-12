import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function UpdatePassword() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const updatePassword = async (formData: FormData) => {
    "use server"
    const password = formData.get("password") as string
    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      redirect(`/update-password?error=${encodeURIComponent(error.message)}`)
    }
    redirect("/dashboard")
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-full">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center space-y-4 max-w-sm">
            <h1 className="text-2xl font-bold">Invalid or expired link</h1>
            <p className="text-sm text-muted-foreground">This password reset link is invalid or has expired. Please request a new one.</p>
            <a href="/forgot-password"><Button>Request new link</Button></a>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Set new password</h1>
            <p className="mt-1 text-sm text-muted-foreground">Choose a strong password for your account.</p>
          </div>
          <form action={updatePassword} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">New password</label>
              <input
                id="password" name="password" type="password" autoComplete="new-password" required
                placeholder="••••••••"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <Button type="submit" className="w-full">Update password</Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
