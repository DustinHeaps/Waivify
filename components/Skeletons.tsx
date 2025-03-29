import { Skeleton } from "@/components/ui/skeleton";

// 🟢 Basic block (for custom placements)
export const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <Skeleton className={className} />
);

// 🟢 List skeleton (for vertical lists like activity, pricing, checklists)
export const SkeletonList = ({
  count = 5,
  itemHeight = "h-4",
  gap = "space-y-2",
}: {
  count?: number;
  itemHeight?: string;
  gap?: string;
}) => (
  <div className={gap}>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className={`${itemHeight} w-full`} />
    ))}
  </div>
);

// 🟢 Card skeleton (for small or big cards)
export const SkeletonCard = ({
  lines = 3,
}: {
  lines?: number;
}) => (
  <div className="p-4 border rounded-md space-y-2">
    <Skeleton className="h-5 w-1/2" />
    <SkeletonList count={lines} itemHeight="h-4" />
  </div>
);

// 🟢 Button skeleton
export const SkeletonButton = () => (
  <Skeleton className="h-10 w-32 rounded-md" />
);
