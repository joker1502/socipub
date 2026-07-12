"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ImagePlus, Check, X, Clock } from "lucide-react"

const platforms = [
  { id: "twitter", label: "Twitter / X", limit: 280, color: "bg-sky-500" },
  { id: "linkedin", label: "LinkedIn", limit: 3000, color: "bg-blue-800" },
]

export function HeroEditor() {
  const [content, setContent] = useState("")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<"now" | "schedule">("now")
  const [scheduledAt] = useState("")

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const result = ev.target?.result
        if (typeof result === "string") setImages((prev) => [...prev, result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const selectedPlatforms = platforms.filter((p) => selected.has(p.id))
  const maxChars = Math.max(...selectedPlatforms.map((p) => p.limit), 280)
  const isOverLimit = content.length > maxChars

  return (
    <div className="rounded-xl border bg-card shadow-soft">
      {/* Editor body */}
      <div className="flex flex-col gap-0 lg:flex-row">
        {/* Left — textarea */}
        <div className="flex flex-1 flex-col border-b lg:border-b-0 lg:border-r">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What would you like to share?"
            aria-label="Post content"
            className="min-h-[180px] w-full resize-none bg-transparent p-4 text-sm outline-none"
            onInput={(e) => {
              const el = e.currentTarget
              el.style.height = "auto"
              el.style.height = `${el.scrollHeight}px`
            }}
          />
          <div className="flex flex-wrap gap-2 border-t px-4 py-3">
            {images.map((src, i) => (
              <div key={i} className="relative size-16 overflow-hidden rounded-lg border">
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  aria-label="Remove image"
                  className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-black/50 text-white"
                >
                  <X className="size-2.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload image"
              className="flex size-16 items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 text-muted-foreground transition-colors hover:border-brand"
            >
              <ImagePlus className="size-5" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Right — platform selection */}
        <div className="w-full p-4 lg:w-64 lg:min-w-56">
          <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Post to</p>
          <div className="space-y-2">
            {platforms.map((p) => {
              const active = selected.has(p.id)
              return (
                <button
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-all",
                    active
                      ? "ring-2 ring-brand border-brand"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-500",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full shrink-0", p.color)} />
                  <span className="flex-1 font-medium">{p.label}</span>
                  {active && <Check className="size-4 shrink-0 text-brand" />}
                </button>
              )
            })}
          </div>

          {selectedPlatforms.length > 0 && (
            <div className="mt-4 space-y-1.5">
              <p className="text-xs text-muted-foreground">Character limits:</p>
              {selectedPlatforms.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs">
                  <span>{p.label}</span>
                  <span className={cn(content.length > p.limit ? "text-danger font-medium" : "")}>
                    {content.length}/{p.limit}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t bg-muted/30 px-4 py-2.5">
        <span className={cn("text-xs tabular-nums", isOverLimit ? "text-danger" : "text-muted-foreground")}>
          {content.length}/{maxChars}
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-md border p-0.5 text-xs">
            <button
              onClick={() => setMode("now")}
              className={cn("rounded px-2 py-1 transition-colors", mode === "now" ? "bg-background font-medium shadow-sm" : "text-muted-foreground")}
            >
              Now
            </button>
            <button
              onClick={() => setMode("schedule")}
              className={cn("rounded px-2 py-1 transition-colors", mode === "schedule" ? "bg-background font-medium shadow-sm" : "text-muted-foreground")}
            >
              <Clock className="mr-1 inline size-3" />
              Schedule
            </button>
          </div>
          <a href="/sign-up">
            <Button size="sm" className="text-xs">Publish Now</Button>
          </a>
        </div>
      </div>
    </div>
  )
}
