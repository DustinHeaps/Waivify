import React from "react";
import clsx from "clsx";

interface SkeletonBlockProps {
  className?: string;
}

export const SkeletonBlock = ({ className }: SkeletonBlockProps) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
};
