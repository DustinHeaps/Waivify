"use server";

import { utapi } from "../api/uploadthing/core";

import { Prisma, PrismaClient } from "@prisma/client";

import { Resend } from "resend";

import WaiverConfirmationEmail from "@/components/WaiverConfirmationEmail";
import { auth, clerkClient } from "@clerk/nextjs";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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

  return { status: "success" };
}

export async function getWaiverById(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      waiverId: string;
    };

    const waiver = await prisma.waiver.findUnique({
      where: { id: decoded.waiverId },
    });

    return waiver;
  } catch (error) {
    console.error("[getWaiverById]", error);
    return null;
  }
}

import { z } from "zod";

const WaiverSchema = z.object({
  name: z.string(),
  ipAddress: z.string().optional(),
  signature: z.string().optional(),
  terms: z.boolean(),
  liability: z.boolean(),
});

export async function saveWaiver(data: unknown) {
  const id = uuidv4();

  const token = jwt.sign(
    { waiverId: id },
    process.env.JWT_SECRET as string,
    
  );

  const waiverInput = data as {
    name: string;
    ipAddress?: string;
    signature?: { fileKey?: string };
    terms: boolean;
    liability: boolean;
    token: string;
  };

  const parsed = WaiverSchema.safeParse({
    ...waiverInput,
    signature: waiverInput.signature?.fileKey ?? undefined, // extract only what's needed
  });
  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const cleanData = Object.fromEntries(
    Object.entries(parsed.data).filter(([_, v]) => v !== undefined)
  ) as Prisma.WaiverCreateInput;

  const waiver = await prisma.waiver.create({
    data: {
      ...cleanData,
      token,
    },
  });

  return waiver;
}
