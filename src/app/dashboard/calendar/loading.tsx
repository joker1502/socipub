import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="rounded-xl border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <Skeleton className="h-5 w-6" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-6" />
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="min-h-[100px] border-b p-2">
              <Skeleton className="size-6 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
