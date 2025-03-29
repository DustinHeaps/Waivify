import React from "react";
import { SkeletonBlock } from "./SkeletonBlock";

interface SkeletonListProps {
  count?: number; // how many items to render
  className?: string; // optional wrapper styling
  itemHeight?: string; // control the skeleton height per item
}

export const SkeletonList = ({
  count = 5,
  className = "",
  itemHeight = "h-4",
}: SkeletonListProps) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock key={i} className={`w-full ${itemHeight} mb-2`} />
      ))}
    </div>
  );
};
