import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe } from "lucide-react"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect("/dashboard")

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg text-center space-y-6 py-20">
          <Globe className="mx-auto size-12 text-brand" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Socipub</h1>
          <p className="text-lg text-muted-foreground">
            Social media scheduler. Schedule posts to Twitter/X, LinkedIn, and more from one place.
          </p>
          <div className="flex justify-center gap-3">
            <a href="/sign-up"><Button size="lg">Get Started Free <ArrowRight className="size-4" /></Button></a>
            <a href="/features"><Button variant="outline" size="lg">Learn More</Button></a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
