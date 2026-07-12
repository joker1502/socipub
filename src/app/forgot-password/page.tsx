import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function ForgotPassword() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect("/dashboard")

  const sendResetEmail = async (formData: FormData) => {
    "use server"
    const email = formData.get("email") as string
    const supabase = await createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/update-password`,
    })
    if (error) {
      redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
    }
    redirect("/forgot-password?sent=1")
  }

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="mt-1 text-sm text-muted-foreground">Enter your email and we&apos;ll send you a reset link.</p>
          </div>
          <form action={sendResetEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email" name="email" type="email" required
                placeholder="you@example.com"
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <Button type="submit" className="w-full">Send reset link</Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            <a href="/sign-in" className="text-brand underline">Back to sign in</a>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
