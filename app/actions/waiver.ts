"use server";

import { utapi } from "../api/uploadthing/core";

import { Prisma, PrismaClient } from "@prisma/client";

import { Resend } from "resend";

import WaiverConfirmationEmail from "@/components/WaiverConfirmationEmail";
import { auth, clerkClient } from "@clerk/nextjs";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { z } from "zod";
import { trackEvent } from "@/lib/posthog/posthog.server";
import { DocumentProps, renderToBuffer } from "@react-pdf/renderer";
import WaiverPDF from "@/components/WaiverPDF";
import { createElement } from 'react';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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

  await trackEvent({
    event: "waiver_email_sent",
    distinctId: id,
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

    await trackEvent({
      event: "waiver_retrieved",
      distinctId: waiver?.id,
    });
    return waiver;
  } catch (error) {
    console.error("[getWaiverById]", error);
    return null;
  }
}
export async function markWaiverViewed(waiverId?: string) {
  if (!waiverId) {
    await trackEvent({
      event: "waiver_viewed",
      distinctId: "server",
    });

    return { success: false };
  }

  await prisma.waiver.update({
    where: { id: waiverId },
    data: { viewedAt: new Date() },
  });

  await trackEvent({
    event: "waiver_viewed",
    distinctId: waiverId,
  });

  return { success: true };
}

const WaiverSchema = z.object({
  name: z.string(),
  ipAddress: z.string().default("0.0.0.0"),
  signatureId: z.string().optional(),
  terms: z.boolean(),
  liability: z.boolean(),
  date: z.string().transform((val) => new Date(val)),
});

export async function saveWaiver(data: unknown) {
  console.log("Incoming data:", data);

  const id = uuidv4();

  const token = jwt.sign({ waiverId: id }, process.env.JWT_SECRET as string);

  const waiverInput = data as {
    name: string;
    ipAddress?: string;
    signatureId?: string;
    terms: boolean;
    liability: boolean;
    token: string;
  };

  const parsed = WaiverSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Zod error:", parsed.error.flatten());
    throw new Error("Invalid form data");
  }

  const waiverData = parsed.data;

  if (!parsed.success) {
    throw new Error("Invalid form data");
  }

  const waiver = await prisma.waiver.create({
    data: {
      ...waiverData,
      id,
      token,
    },
  });

  await trackEvent({
    event: "waiver_saved",
    distinctId: waiver.id,
  });

  return waiver;
}


export async function downloadWaiverPdf(waiverId: string) {
  if (!waiverId) throw new Error("Missing waiverId");

  const waiver = await prisma.waiver.findUnique({
    where: { id: waiverId },
    include: { signature: true },
  });

  if (!waiver || !waiver.signature) {
    throw new Error("Waiver or signature not found.");
  }
  const formattedDate = format(waiver.signature.date, "MMMM d, yyyy")

  const pdfBuffer = await renderToBuffer(
    createElement(WaiverPDF, {
      name: waiver.signature.name,
      date: formattedDate,
      waiverId: waiver.signature.id,
      signatureUrl: `https://uploadthing.com/f/${waiver.signature.fileKey}`
    }) as React.ReactElement
  );

  console.log("PDF buffer size:", pdfBuffer.byteLength);

  return new Uint8Array(pdfBuffer);

}
