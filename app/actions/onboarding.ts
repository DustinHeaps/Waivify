"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { utapi } from "../api/uploadthing/core";


export async function completeOnboarding(data: any) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  await clerkClient.users.updateUser(userId, {
    publicMetadata: {
      onboardingComplete: true,

      ...data,
    },
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

// export async function createWaiver(formData: FormData) {
//   const { userId } = auth();
//   if (!userId) throw new Error("Not authenticated");

//   const title = formData.get("title") as string;
//   const description = formData.get("description") as string;

//   if (!title) throw new Error("Title is required");

//   const waiver = await prisma.waiver.create({
//     data: {
//       title,
//       description,
//       createdBy: userId,
//     },
//   });

//   return { success: true, waiver };
// }
