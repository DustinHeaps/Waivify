"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type Props = {
  waiverId: string;
};

export default function WaiverExpiredTracker({ waiverId }: Props) {
  useEffect(() => {
    posthog.capture("waiver_expired_viewed", {
      waiverId,
    });
  }, [waiverId]);

  return null;
}
