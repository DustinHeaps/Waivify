"use client";

import { getWaiverLimit } from '@/lib/waiverUsage';
// import { getWaiverLimit } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export default function WaiverLimitGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const waiversUsed = Number(user?.publicMetadata?.waiversUsed) || 0;
  const plan = user?.publicMetadata?.plan || "free";
  const limit = getWaiverLimit(plan as string);

  if (waiversUsed >= limit) {
    return (
      <div className='p-4 border border-red-200 bg-red-50 rounded text-sm text-red-600'>
        You've reached your monthly limit of {limit} waivers.
        <br />
        Upgrade your plan to unlock more.
      </div>
    );
  }

  return <>{children}</>;
}
