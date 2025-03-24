"use client";

import { useEffect } from "react";
import posthog from "@/lib/posthog/posthog.client";

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    posthog.capture("page_loaded");
  }, []);

  return <>{children}</>;
}
