import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export const Links = () => {
  return (
    <Card className='hover:scale-[1.01] transition'>
      <CardContent className='p-5 space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>
          Helpful Resources
        </h2>
        <div className='flex flex-col space-y-1 text-sm text-teal-500'>
          <Link href='/features' className='hover:underline'>
            Features
          </Link>
          <Link href='/pricing' className='hover:underline'>
            Pricing
          </Link>
          <Link href='/faq' className='hover:underline'>
            FAQ
          </Link>
          <Link href='/policy' className='hover:underline'>
            Digital Signature Policy
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
