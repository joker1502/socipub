import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-4 lg:flex-row">
        <div className="flex-1 lg:w-3/5">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="size-20 rounded-lg" />
            <Skeleton className="size-20 rounded-lg" />
          </div>
        </div>
        <div className="lg:w-2/5 lg:min-w-72">
          <div className="rounded-xl border bg-card p-4">
            <Skeleton className="mb-3 h-4 w-16" />
            <div className="space-y-2">
              <Skeleton className="h-14 w-full rounded-lg" />
              <Skeleton className="h-14 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  )
}
