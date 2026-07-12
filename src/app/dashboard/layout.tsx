import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardNav } from "./nav"
import { LayoutDashboard, Calendar, FileEdit, Settings, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard - Socipub",
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/accounts", label: "Accounts", icon: Users },
  { href: "/dashboard/create", label: "Create Post", icon: FileEdit },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  return (
    <div className="flex min-h-full">
      <DashboardNav items={navItems} userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}
