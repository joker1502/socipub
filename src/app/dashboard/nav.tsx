"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { Globe, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export function DashboardNav({
  items,
  userEmail,
}: {
  items: NavItem[]
  userEmail: string
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside className="flex w-56 flex-col border-r bg-background">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Globe className="size-5 text-brand" />
        <span className="font-bold">Socipub</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-brand-light text-brand dark:bg-brand/10"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-3">
        <p className="mb-2 truncate text-xs text-muted-foreground">{userEmail}</p>
        <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-xs" onClick={handleSignOut}>
          <LogOut className="size-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
