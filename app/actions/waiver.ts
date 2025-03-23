"use server";

import { utapi } from "../api/uploadthing/core";

import { PrismaClient } from "@prisma/client";

import { Resend } from "resend";

import WaiverConfirmationEmail from "@/components/WaiverConfirmationEmail";
import { auth, clerkClient } from "@clerk/nextjs";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendEmail(id: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await clerkClient.users.getUser(userId);
  const email = user.emailAddresses[0].emailAddress;

  const signature = await getSignatureById(id);
  if (!signature) throw new Error("Signature not found");

 const response = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: email, // user's email
    subject: "✅ Waiver Confirmation",
    react: WaiverConfirmationEmail({
      name: signature.name,
      id,
      date: signature.uploadedAt.toISOString(),
    }),
  });

  console.log("📨 Resend response:", response);

  return { status: "success" };
}
