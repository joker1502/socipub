"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { ImagePlus, Check, X, Loader2, Clock, Sparkles, Languages } from "lucide-react"
import { useRouter } from "next/navigation"

type Account = {
  id: string
  platform: "twitter" | "linkedin"
  platform_username: string | null
  platform_name: string | null
  avatar_url: string | null
}

const PLATFORM_LIMITS: Record<string, number> = {
  twitter: 280,
  linkedin: 3000,
}

export function PostEditor({ accounts, userId }: { accounts: Account[]; userId: string }) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set())
  const [images, setImages] = useState<string[]>([])
  const [publishing, setPublishing] = useState(false)
  const [mode, setMode] = useState<"now" | "schedule">("now")
  const [scheduledAt, setScheduledAt] = useState("")
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxChars = Math.max(...Array.from(selectedPlatforms).map((p) => PLATFORM_LIMITS[p] ?? 280), 280)
  const charCount = content.length
  const isNearLimit = charCount >= maxChars * 0.9
  const isOverLimit = charCount > maxChars
  const canPublish = selectedPlatforms.size > 0 && content.trim().length > 0 && !isOverLimit && !publishing
  const canSchedule = canPublish && mode === "schedule" && scheduledAt.length > 0
  const canPublishNow = canPublish && mode === "now"

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result
        if (typeof result === "string") setImages((prev) => [...prev, result])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const insertPost = async (status: string, publishedAt?: string) => {
    const supabase = createClient()
    return supabase.from("posts").insert({
      user_id: userId,
      content,
      image_urls: images,
      platforms: Array.from(selectedPlatforms),
      status,
      scheduled_at: status === "scheduled" ? scheduledAt : null,
      published_at: publishedAt ?? null,
    })
  }

  const handlePublishNow = async () => {
    if (!canPublishNow) return
    setPublishing(true)
    const { error } = await insertPost("published", new Date().toISOString())
    setPublishing(false)
    if (error) return
    reset()
    router.refresh()
  }

  const handleSchedule = async () => {
    if (!canSchedule) return
    setPublishing(true)
    const { error } = await insertPost("scheduled")
    setPublishing(false)
    if (error) return
    reset()
    router.refresh()
  }

  const handleSaveDraft = async () => {
    const supabase = createClient()
    await supabase.from("posts").insert({
      user_id: userId,
      content,
      image_urls: images,
      platforms: Array.from(selectedPlatforms),
      status: "draft",
    })
    reset()
    router.refresh()
  }

  const reset = () => {
    setContent("")
    setSelectedPlatforms(new Set())
    setImages([])
    setScheduledAt("")
    setMode("now")
  }

  const selectedAccounts = accounts.filter((a) => selectedPlatforms.has(a.id))

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-auto lg:flex-row">
        <div className="flex flex-1 flex-col gap-4 lg:w-3/5">
          <div className="flex-1 rounded-xl border bg-card">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share?"
              aria-label="Post content"
              className="min-h-[200px] w-full resize-none bg-transparent p-4 text-sm outline-none"
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = "auto"
                el.style.height = `${el.scrollHeight}px`
              }}
            />
            {content.trim() && (
              <div className="flex items-center gap-2 border-t px-3 py-2">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={async () => {
                    setAiLoading("rewrite")
                    const res = await fetch("/api/ai", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: content, action: "rewrite", userId }),
                    })
                    const data = await res.json()
                    if (data.result) setContent(data.result)
                    setAiLoading(null)
                  }}
                  disabled={aiLoading !== null}
                >
                  {aiLoading === "rewrite" ? <Loader2 className="size-3 animate-spin" /> : <Sparkles className="size-3" />}
                  Rewrite
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={async () => {
                    setAiLoading("translate")
                    const res = await fetch("/api/ai", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: content, action: "translate", userId }),
                    })
                    const data = await res.json()
                    if (data.result) setContent(data.result)
                    setAiLoading(null)
                  }}
                  disabled={aiLoading !== null}
                >
                  {aiLoading === "translate" ? <Loader2 className="size-3 animate-spin" /> : <Languages className="size-3" />}
                  Translate
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {images.map((src, i) => (
              <div key={i} className="relative size-20 overflow-hidden rounded-lg border">
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  aria-label="Remove image"
                  className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload image"
              className="flex size-20 items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-muted-foreground transition-colors hover:border-brand"
            >
              <ImagePlus className="size-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="lg:w-2/5 lg:min-w-72">
          <div className="rounded-xl border bg-card p-4">
            <h3 className="mb-3 text-sm font-medium">Post to</h3>
            {accounts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Connect accounts first in{" "}
                <a href="/dashboard/accounts" className="text-brand underline">Accounts</a>
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {accounts.map((account) => {
                  const selected = selectedPlatforms.has(account.id)
                  return (
                    <button
                      key={account.id}
                      onClick={() => togglePlatform(account.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                        selected
                          ? "ring-2 ring-brand border-brand"
                          : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-500",
                      )}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {account.platform_name?.[0] ?? account.platform?.[0]?.toUpperCase()}
                      </div>
                      <div className="flex-1 truncate">
                        <p className="font-medium truncate">{account.platform_name ?? account.platform}</p>
                        <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
                      </div>
                      {selected && <Check className="size-4 shrink-0 text-brand" />}
                    </button>
                  )
                })}
              </div>
            )}

            {selectedAccounts.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <p className="text-xs text-muted-foreground">Character limits:</p>
                {selectedAccounts.map((a) => {
                  const limit = PLATFORM_LIMITS[a.platform] ?? 280
                  const over = content.length > limit
                  return (
                    <div key={a.id} className="flex items-center justify-between text-xs">
                      <span className="capitalize">{a.platform}</span>
                      <span className={cn(over ? "text-danger font-medium" : "")}>
                        {content.length}/{limit}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 mt-4 border-t bg-white/80 px-4 py-3 backdrop-blur dark:bg-zinc-950/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-xs tabular-nums",
                isOverLimit ? "text-danger" : isNearLimit ? "text-warning" : "text-muted-foreground",
              )}
            >
              {charCount}/{maxChars}
            </span>

            <div className="flex items-center gap-1 rounded-lg border p-0.5 text-xs">
              <button
                onClick={() => setMode("now")}
                className={cn("rounded-md px-2 py-1 transition-colors", mode === "now" ? "bg-muted font-medium" : "text-muted-foreground")}
              >
                Publish Now
              </button>
              <button
                onClick={() => setMode("schedule")}
                className={cn("rounded-md px-2 py-1 transition-colors", mode === "schedule" ? "bg-muted font-medium" : "text-muted-foreground")}
              >
                <Clock className="mr-1 inline size-3" />
                Schedule
              </button>
            </div>

            {mode === "schedule" && (
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="h-7 rounded-md border bg-background px-2 text-xs"
                min={new Date().toISOString().slice(0, 16)}
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            {mode === "now" ? (
              <Button size="sm" onClick={handlePublishNow} disabled={!canPublishNow}>
                {publishing ? <Loader2 className="size-4 animate-spin" /> : null}
                Publish Now
              </Button>
            ) : (
              <Button size="sm" onClick={handleSchedule} disabled={!canSchedule}>
                {publishing ? <Loader2 className="size-4 animate-spin" /> : null}
                Schedule
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
