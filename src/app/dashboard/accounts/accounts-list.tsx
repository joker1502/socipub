"use client"

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ExternalLink, RefreshCw, Trash2 } from "lucide-react"

type Account = {
  id: string
  platform: "twitter" | "linkedin"
  platform_username: string | null
  platform_name: string | null
  avatar_url: string | null
  created_at: string
  token_expires_at: string | null
}

function getStatus(account: Account): { label: string; variant: "secondary" } {
  if (!account.token_expires_at) return { label: "Active", variant: "secondary" }
  const expiringSoon = new Date(account.token_expires_at).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000
  if (expiringSoon) return { label: "Expiring", variant: "secondary" }
  return { label: "Active", variant: "secondary" }
}

export function AccountsList({ accounts }: { accounts: Account[] }) {
  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border py-16 text-center">
        <p className="text-lg font-medium">No accounts connected</p>
        <p className="mt-1 text-sm text-muted-foreground">Connect Twitter/X or LinkedIn to start scheduling posts.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Platform</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Connected</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => {
          const status = getStatus(account)
          return (
            <TableRow key={account.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <TableCell className="font-medium capitalize">{account.platform}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                    {account.platform_name?.[0] ?? account.platform_username?.[0] ?? "?"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{account.platform_name ?? account.platform_username}</p>
                    {account.platform_username && (
                      <p className="text-xs text-muted-foreground">@{account.platform_username}</p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{status.label}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(account.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 size-4" />
                      Refresh
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 size-4" />
                      Test
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      <Trash2 className="mr-2 size-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
