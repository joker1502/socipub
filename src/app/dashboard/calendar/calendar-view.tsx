"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Post = {
  id: string
  content: string
  platforms: string[]
  status: string
  scheduled_at: string | null
}

const PLATFORM_COLORS: Record<string, string> = {
  twitter: "bg-sky-500",
  linkedin: "bg-blue-800",
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function CalendarView({ posts }: { posts: Post[] }) {
  const today = useMemo(() => new Date(), [])
  const [viewDate, setViewDate] = useState(today)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay()

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const postsByDay = useMemo(() => {
    const map = new Map<number, Post[]>()
    posts.forEach((post) => {
      if (!post.scheduled_at) return
      const day = new Date(post.scheduled_at).getDate()
      const existing = map.get(day) ?? []
      existing.push(post)
      map.set(day, existing)
    })
    return map
  }, [posts])

  const monthName = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  const remaining = cells.length % 7
  if (remaining > 0) for (let i = 0; i < 7 - remaining; i++) cells.push(null)

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="size-4" />
        </Button>
        <h2 className="text-lg font-semibold">{monthName}</h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7">
        {WEEKDAYS.map((d) => (
          <div key={d} className="border-b px-2 py-2 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} className="border-b p-2" />

          const isToday =
            day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
          const dayPosts = postsByDay.get(day) ?? []

          return (
            <div
              key={day}
              className={cn(
                "min-h-[120px] border-b p-2 transition-colors",
                isToday ? "bg-brand/5 border-brand/20" : "",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-6 items-center justify-center rounded-full text-xs",
                  isToday ? "bg-brand text-primary-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {day}
              </span>
              <div className="mt-1 space-y-1">
                {dayPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-1.5 truncate rounded bg-muted/50 px-1.5 py-1 text-xs"
                  >
                    <div className="flex gap-0.5">
                      {post.platforms.map((p) => (
                        <span
                          key={p}
                          className={cn("inline-block size-1.5 rounded-full", PLATFORM_COLORS[p] ?? "bg-muted")}
                        />
                      ))}
                    </div>
                    <span className="truncate text-muted-foreground">{post.content}</span>
                  </div>
                ))}
                {dayPosts.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{dayPosts.length - 3} more</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
