import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const Changelog = () => {
  return (
    <Card className='hover:scale-[1.01] transition'>
      <CardContent className='p-5 space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>Changelog</h2>
        <ul className='space-y-1 text-sm text-muted-foreground'>
          <li>✅ CSV Export Launched</li>
          <li>✍️ Signature Pad upgraded for mobile</li>
          <li>✨ Onboarding flow polish</li>
        </ul>
      </CardContent>
    </Card>
  );
};
