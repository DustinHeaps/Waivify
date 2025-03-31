


import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature") as string;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("[stripe.webhook] Error verifying signature", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!userId) return new NextResponse("Missing userId", { status: 400 });

      // ✅ store subscription status in Clerk
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          subscription: {
            plan: session.metadata?.plan,
            active: true,
            subscriptionId: session.subscription,
          },
        },
      });

      console.log(
        `[stripe.webhook] User ${userId} upgraded to ${session.metadata?.plan}`
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (!userId) return new NextResponse("Missing userId", { status: 400 });

      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          subscription: null,
        },
      });

      console.log(`[stripe.webhook] User ${userId} subscription canceled`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
