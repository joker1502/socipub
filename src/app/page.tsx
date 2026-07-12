import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroEditor } from "@/components/hero-editor"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect("/dashboard")

  return (
    <div className="flex flex-col min-h-full">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12 lg:py-16">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Schedule Posts to Twitter, LinkedIn & More</h1>
          </div>
          <HeroEditor />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
