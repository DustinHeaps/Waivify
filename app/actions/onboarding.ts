"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { utapi } from "../api/uploadthing/core";
import { trackEvent } from "@/lib/posthog/posthog.server";
import { prisma } from '@/lib/prisma';

export async function completeOnboarding(data: any) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      onboardingComplete: true,
      companyName: data.name,
      plan: "free",
      waiversUsed: 0,
      teamSize: 1,
      ...data,
    },
  });

  await trackEvent({
    event: "onboarding_complete",
    distinctId: "server",
  });

  return { success: true };
}

export async function uploadLogo(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const files = formData.getAll("file") as File[];
  if (!files || files.length === 0) throw new Error("No logo file provided");

  const uploaded = await utapi.uploadFiles(files);
  const file = uploaded?.[0]?.data;

  if (!file || !file.url) throw new Error("Upload failed");

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      logoUrl: file.url,
    },
  });

  return { url: file.url };
}

export async function updateNextStep(stepId: string, completed: boolean) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const user = await clerkClient.users.getUser(userId);
  const existing = (user.publicMetadata.nextSteps || {}) as Record<
    string,
    boolean
  >;

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      ...user.publicMetadata,
      nextSteps: {
        ...existing,
        [stepId]: completed,
      },
    },
  });
}


// export async function resetMonthlyWaiverCounts() {
//   await prisma.user.updateMany({
//     where: {
//       NOT: { plan: "pro" }, // only reset free tier users if you want
//     },
//     data: {
//       waiverCount: 0,
//     },
//   });

//   console.log("✅ Monthly waiver counts reset");
// }
