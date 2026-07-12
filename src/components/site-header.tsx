"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
]

export function SiteHeader() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/blog") return pathname.startsWith("/blog")
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">Socipub</Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                isActive(link.href) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/sign-in"><Button variant="ghost" size="sm">Sign In</Button></Link>
          <Link href="/sign-up"><Button size="sm">Get Started</Button></Link>
        </div>
      </div>
    </header>
  )
}
