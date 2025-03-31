"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { checkout } from "../actions/stripe";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default function BillingPage() {
  const { user } = useUser();
  //   const [isPending, setIsPending] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const currentPlan = user?.publicMetadata?.plan as
    | "free"
    | "starter"
    | "pro"
    | undefined;
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (plan: "starter" | "pro") => {
    try {
      setError(null);
      setLoadingPlan(plan);
      await checkout({ userId: user?.id, plan } as any);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoadingPlan(null);
    }
  };

  //     <div className='max-w-screen-sm mx-auto py-10 space-y-6'>
  //       <h1 className='text-xl font-semibold text-center'>Choose your plan</h1>

  //       {error && (
  //         <div className='bg-red-100 text-red-800 text-sm rounded p-2'>
  //           {error}
  //         </div>
  //       )}

  //       <div className='space-y-4'>

  //         <div className='border rounded p-4 space-y-2'>
  //           <h2 className='font-semibold'>Starter - $9/mo</h2>
  //           <ul className='text-sm list-disc ml-4 space-y-1'>
  //             <li>✅ 50 waivers/month</li>
  //             <li>✅ 1 team member</li>
  //             <li>✅ Download PDFs</li>
  //           </ul>
  //           {currentPlan === "starter" ? (
  //             <p className='text-green-600 text-sm font-medium'>Current Plan</p>
  //           ) : (
  //             <button
  //               onClick={() => handleSubscribe("starter")}
  //               disabled={isPending}
  //               className='px-4 py-2 bg-black text-white rounded hover:opacity-90 transition'
  //             >
  //               {isPending ? "Redirecting..." : "Get Starter"}
  //             </button>
  //           )}
  //         </div>

  //         <div className='border rounded p-4 space-y-2'>
  //           <h2 className='font-semibold'>Pro - $29/mo</h2>
  //           <ul className='text-sm list-disc ml-4 space-y-1'>
  //             <li>✅ Unlimited waivers</li>
  //             <li>✅ Up to 5 team members</li>
  //             <li>✅ Custom branding</li>
  //             <li>✅ Priority support</li>
  //           </ul>
  //           {currentPlan === "pro" ? (
  //             <p className='text-green-600 text-sm font-medium'>Current Plan</p>
  //           ) : (
  //             <button
  //               onClick={() => handleSubscribe("pro")}
  //               disabled={isPending}
  //               className='px-4 py-2 bg-black text-white rounded hover:opacity-90 transition'
  //             >
  //               {isPending ? "Redirecting..." : "Get Pro"}
  //             </button>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div className='max-w-screen-md mx-auto py-10 space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-xl font-semibold'>Choose your plan</h1>
        <p className='text-muted-foreground text-sm'>
          Upgrade or manage your subscription.
        </p>
      </div>

      {error && (
        <div className='text-sm text-red-500 border border-red-300 rounded p-2'>
          {error}
        </div>
      )}

      {/* Starter Plan */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <h2 className='font-medium'>Starter - $9/mo</h2>
          <ul className='text-sm text-muted-foreground space-y-1'>
            <li>✅ 50 waivers/month</li>
            <li>✅ 1 team member</li>
            <li>✅ Download PDFs</li>
          </ul>
          {currentPlan === "starter" ? (
            <Badge variant='outline' className='mt-2'>
              Current Plan
            </Badge>
          ) : (
            <Button
              disabled={!!loadingPlan}
              onClick={() => handleSubscribe("starter")}
            >
              {loadingPlan === "starter" ? "Redirecting..." : "Get Starter"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Pro Plan */}
      <Card>
        <CardContent className='p-5 space-y-3'>
          <h2 className='font-medium'>Pro - $29/mo</h2>
          <ul className='text-sm text-muted-foreground space-y-1'>
            <li>✅ Unlimited waivers</li>
            <li>✅ Up to 5 team members</li>
            <li>✅ Custom branding</li>
            <li>✅ Priority support</li>
          </ul>
          {currentPlan === "pro" ? (
            <Badge variant='outline' className='mt-2'>
              Current Plan
            </Badge>
          ) : (
            <Button
              disabled={!!loadingPlan}
              onClick={() => handleSubscribe("pro")}
            >
              {loadingPlan === "pro" ? "Redirecting..." : "Get Pro"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
