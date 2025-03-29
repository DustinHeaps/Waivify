import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import React from "react";

export const Tips = () => {
  return (
    <Card className='hover:scale-[1.01] transition'>
      <CardContent className='p-5 space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>
          Tips & Recommendations
        </h2>
        <p className='text-sm text-muted-foreground'>
          Did you know you can export signed waivers as CSV? Save time when
          organizing records.
        </p>
        <Link href='/faq' className='text-teal-500 text-sm hover:underline'>
          Learn more →
        </Link>
      </CardContent>
    </Card>
  );
};
