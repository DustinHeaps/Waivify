import { User } from "@clerk/nextjs/server";

// --- Configurable per plan ---
export const WAIVER_LIMITS: Record<string, number> = {
  free: 10,
  starter: 50,
  pro: Infinity,
};

// --- Get limit for given plan ---
export function getWaiverLimit(plan: string): number {
  return WAIVER_LIMITS[plan] ?? 0;
}

// --- Check if user has waivers left ---
export function hasAvailableWaivers(user: User): boolean {
  const waiversUsed = Number(user.publicMetadata?.waiversUsed) || 0;
  const plan = user.publicMetadata?.plan || "free";
  const limit = getWaiverLimit(plan as string);
  return waiversUsed < limit;
}

// --- Increment usage ---
export async function incrementWaiverUsage(user: User, clerkClient: any) {
  const waiversUsed = Number(user.publicMetadata?.waiversUsed) || 0;

  await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      ...user.publicMetadata,
      waiversUsed: waiversUsed + 1,
    },
  });
}

// --- Reset usage (e.g., monthly) ---
export async function resetWaiverUsage(user: User, clerkClient: any) {
  await clerkClient.users.updateUserMetadata(user.id, {
    publicMetadata: {
      ...user.publicMetadata,
      waiversUsed: 0,
    },
  });
}
