import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

import React from "react";

export const QuickActions = () => {
  return (
    <div className='space-y-4'>
      <Card className='hover:scale-[1.01]  border border-gray-200'>
        <CardContent className='p-4 space-y-1'>
          <h2 className='text-xs font-semibold uppercase tracking-wide mb-2'>
            Quick Actions
          </h2>
          <div className='flex flex-col space-y-1 text-sm'>
            <Link
              href='/exports'
              className='px-3 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded text-sm text-center transition hover:scale-[1.02]'
            >
              View Exports
            </Link>
            <Link
              href='/settings'
              className='px-3 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded text-sm text-center transition hover:scale-[1.02]'
            >
              Account Settings
            </Link>
            <Link
              href='/billing'
              className='px-3 py-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded text-sm text-center transition hover:scale-[1.02]'
            >
              Billing & Plan
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
