import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { useCountUp } from "react-countup";

export const Stats = () => {
  const countUpRef = useRef(null);

  const signatures = 10;

  useCountUp({
    ref: countUpRef,
    end: signatures,
    duration: 1.5,
  });

  return (
    <Card className='hover:scale-[1.01] transition'>
      <CardContent className='p-5 space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>Your Stats</h2>
        <ul className='space-y-1 text-sm text-muted-foreground'>
          <li>📄 Total Waivers Created: {signatures}</li>
          <li>✍️ Signatures Collected: {signatures}</li>
          <li>⏱️ Last Signed: 2 days ago</li>
        </ul>
      </CardContent>
    </Card>
  );
};
