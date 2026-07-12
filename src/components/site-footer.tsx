import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="" width={28} height={28} className="size-7" unoptimized />
              <span className="text-lg font-bold">Socipub</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Open source social media scheduler. Schedule posts to Twitter, LinkedIn & more.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/multi-platform" className="hover:text-foreground">Multi-Platform Posting</Link></li>
              <li><Link href="/scheduling" className="hover:text-foreground">Scheduling</Link></li>
              <li><Link href="/markdown" className="hover:text-foreground">Markdown Editor</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/trust" className="hover:text-foreground">Trust & Security</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Socipub. Open source under the MIT license.</p>
        </div>
      </div>
    </footer>
  )
}
