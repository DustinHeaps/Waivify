"use client";

import { downloadWaiverPdf } from "@/app/actions/waiver";
import { useTransition } from "react";

type Props = {
  waiverId: string;
};

export default function WaiverDownloadButton({ waiverId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDownload = async () => {
    startTransition(async () => {
      try {
        const buffer = await downloadWaiverPdf(waiverId); 

        // Convert Buffer to Uint8Array for Blob
        // const uint8Array = new Uint8Array(buffer);
        
        // const blob = new Blob([uint8Array], { type: 'application/pdf' });
        // const url = URL.createObjectURL(blob);
  
        // const a = document.createElement("a");
        // a.href = url;
        // a.download = `waiver-${waiverId}.pdf`;
        // a.click();
  
        // URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download failed", err);
      }
    });
  };
  

  return (
    <button
      onClick={handleDownload}
      className='text-blue-500 hover:underline mr-1'
      disabled={isPending}
    >
      Download Waiver
    </button>
  );
}
