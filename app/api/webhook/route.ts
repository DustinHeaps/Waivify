import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      // ✅ Get user ID from metadata (you pass it when creating checkout session)
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error("Missing userId in metadata");
        return NextResponse.json({ received: true });
      }

      // ✅ Determine plan based on Stripe price ID
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      const priceId = lineItems.data[0]?.price?.id || session.metadata?.priceId;

      const plan =
        priceId === process.env.STRIPE_PRO_PRICE_ID ? "pro" : "starter";

      // ✅ Save plan in Clerk
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: { plan },
      });

      console.log(`Updated user ${userId} to plan: ${plan}`);
      break;

    case "customer.subscription.deleted":
      // ✅ Downgrade on cancel
      const customerId = (event.data.object as any).customer;
      const subscriptionUser = await clerkClient.users.getUserList({
        externalId: customerId,
      });
      const cancelUser = subscriptionUser[0]?.id;

      if (cancelUser) {
        await clerkClient.users.updateUserMetadata(cancelUser, {
          publicMetadata: { plan: "free" },
        });
        console.log(`Downgraded user ${cancelUser} to free plan`);
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
