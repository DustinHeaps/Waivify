"use server";


import { trackEvent } from '@/lib/posthog/posthog.server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { utapi } from '../api/uploadthing/core';

export async function uploadSignature(formData: FormData, waiverId: string) {
  const files = formData.getAll("file") as File[];

  if (!files || files.length === 0) {
    throw new Error("No file found in formData");
  }

  const name = formData.get("name") as string;
  const date = `${formData.get("date")}T00:00:00Z`;

  // Upload to UploadThing
  const uploaded = await utapi.uploadFiles(files);

  const file = uploaded[0]?.data;

  if (!file || !file.url) {
    throw new Error("Upload failed or missing file URL");
  }

  const saved = await prisma.signature.create({
    data: {
      name,
      date,
      fileKey: file.key,
      waiver: {
        connect: { id: waiverId },
      },
    },
  });

  await trackEvent({
    event: "signature_saved",
    distinctId: file.key,
  });
  revalidatePath("/admin");
  return saved;
}

export async function getSecureFileUrl(fileKey: string) {
  if (!fileKey) throw new Error("File key is missing");

  const fileUrl = `https://utfs.io/f/${fileKey}`;

  await trackEvent({
    event: "filekey_retrieved",
    distinctId: fileKey,
  });

  return fileUrl;
}

export async function getSignatureById(id: string) {
  const signature = await prisma.signature.findUnique({
    where: { id },
  });

  await trackEvent({
    event: "signature_retrieved",
    distinctId: id,
  });

  return signature;
}
