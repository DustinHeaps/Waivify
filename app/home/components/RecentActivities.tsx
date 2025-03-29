import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

export const RecentActivities = () => {
  const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    action,
  }) => (
    <div className='border rounded p-6 text-center space-y-2 text-muted-foreground'>
      <h3 className='text-sm font-semibold'>{title}</h3>
      <p className='text-sm'>{description}</p>
      {action}
    </div>
  );

  return (
    <Card className='hover:scale-[1.01] transition'>
      <CardContent className='p-5 space-y-2'>
        <h2 className='text-base font-semibold text-gray-900'>
          Recent Activity
        </h2>
        {/* <EmptyState
          title='No activity yet'
          description='Your recent activity will show here when you start collecting waivers.'
        /> */}
        <ul className='space-y-1 text-sm text-muted-foreground'>
          <li>+ 2 waivers signed this week</li>
          <li>5 active waivers</li>
          <li>New feature: CSV Export is now available</li>
        </ul>
      </CardContent>
    </Card>
  );
};
