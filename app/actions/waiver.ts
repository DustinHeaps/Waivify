"use server";

import { utapi } from "../api/uploadthing/core";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function uploadSignature(formData: FormData) {
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

  // Save to DB
  const saved = await prisma.signature.create({
    data: {
      name,
      date,
      fileKey: file.key,
    },
  });

  return saved;
}

export async function getSecureFileUrl(fileKey: string) {
  if (!fileKey) throw new Error("File key is missing");

  const fileUrl = `https://utfs.io/f/${fileKey}`;
  return fileUrl;
}

export async function getSignatureById(id: string) {
    return await prisma.signature.findUnique({
      where: { id },
      
    });
  }