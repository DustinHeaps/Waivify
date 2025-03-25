"use client";

import { sendEmail } from "@/app/actions/waiver";
import { toast } from "sonner";

export function SendEmailButton({
  id,

  waiverId,
}: {
  id: string;

  waiverId: string;
}) {
  
  const handleClick = async () => {
    try {
      await sendEmail(id, waiverId);
      toast("✉️ Email sent! Check your inbox.");
    } catch (err) {
      toast.error("Failed to send email.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className='text-blue-500 hover:underline ml-1'
    >
      Email it to me
    </button>
  );
}
