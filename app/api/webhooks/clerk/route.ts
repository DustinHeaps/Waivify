import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/app/actions/user";


export async function POST(req: Request) {

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string);
  const rawBody = await req.text();
  const headersList = req.headers;

  const headers = {
    "svix-id": headersList.get("svix-id") ?? "",
    "svix-timestamp": headersList.get("svix-timestamp") ?? "",
    "svix-signature": headersList.get("svix-signature") ?? "",
  };

  let evt: WebhookEvent;

  try {
    evt = wh.verify(rawBody, headers) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name } = evt.data;

    await createUser({
      clerkId: id,
      email: email_addresses[0]?.email_address || "",
      name: first_name || "",
    });

    console.log("✅ User created:", id);
  }

  return NextResponse.json({ received: true });
}
