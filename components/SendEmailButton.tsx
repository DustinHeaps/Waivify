'use client';

import { toast } from 'sonner';

export function SendEmailButton({ id }: { id: string }) {
  const handleClick = async () => {
    debugger
    toast('✉️ Email sent! Check your inbox.');
    // try {
      // You can add your actual email logic here if needed
      // await fetch(`/api/send-email/${id}`);
    //   toast('✉️ Email sent! Check your inbox.');
    // } catch (err) {
    //   toast.error('Failed to send email.');
    // }
  };

  return (
    <button
      onClick={handleClick}
      className="text-blue-500 hover:underline ml-1"
    >
      Email it to me
    </button>
  );
}
