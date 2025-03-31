"use server";

import { prisma } from "@/lib/prisma";

import { Resend } from "resend";

import WaiverConfirmationEmail from "@/components/WaiverConfirmationEmail";
import { auth, clerkClient } from "@clerk/nextjs";

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { z } from "zod";
import { trackEvent } from "@/lib/posthog/posthog.server";
import { renderToBuffer } from "@react-pdf/renderer";
import WaiverPDF from "@/components/WaiverPDF";
import { createElement } from "react";
import { revalidatePath } from "next/cache";
import { getSignatureById } from "./signature";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getAllWaivers() {
  try {
    const waivers = await prisma.waiver.findMany({
      orderBy: { date: "desc" },
      include: {
        signature: true,
      },
      where: { archived: false },
    });

    return waivers;
  } catch (error) {
    console.error("Failed to fetch waivers:", error);
    throw new Error("Could not fetch waivers");
  }
}

export async function sendEmail(id: string, waiverId: string) {
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
      waiverId,
    }),
  });

  await trackEvent({
    event: "waiver_email_sent",
    distinctId: id,
  });

  return { status: "success" };
}

export async function getWaiverByToken(token: string) {
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
    console.error("[getWaiverByToken]", error);
    return null;
  }
}

export async function getWaiverById(waiverId: string) {
  try {
    const waiver = await prisma.waiver.findUnique({
      where: { id: waiverId },
    });

    await trackEvent({
      event: "waiver_retrieved",
      distinctId: waiverId,
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
  const formattedDate = format(waiver.signature.date, "MMMM d, yyyy");

  const pdfBuffer = await renderToBuffer(
    <WaiverPDF
        name={waiver.signature.name}
        date={formattedDate}
        waiverId={waiver.signature.id}
        signatureUrl={`https://uploadthing.com/f/${waiver.signature.fileKey}`}
    />
);

  console.log("PDF buffer size:", pdfBuffer.byteLength);

  return new Uint8Array(pdfBuffer);
}

export async function log404(path: string) {
  trackEvent({
    event: "404_page_view",
    distinctId: "server",
    properties: {
      path,
    },
  });
}

export async function archiveWaivers(ids: string[]) {
  await prisma.waiver.updateMany({
    where: { id: { in: ids } },
    data: { archived: true },
  });
}

export async function deleteWaivers(ids: string[]) {
  try {
    await prisma.waiver.deleteMany({
      where: { id: { in: ids } },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete waivers:", error);
    return { success: false };
  }
}
