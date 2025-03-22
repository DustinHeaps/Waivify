"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Waiver = {
    id: string;
    name: string;
    dateSigned: string;
    signatureUrl: string; 
  };

export default function WaiverDashboard() {
  const [waivers, setWaivers] = useState<Waiver[]>([]);

  useEffect(() => {
    // Fetch from your backend or Supabase, etc.
    const mockData = [
      {
        id: "1",
        name: "Jane Doe",
        dateSigned: "2025-03-21",
        signatureUrl: "/example-signature.png", // or base64
      },
    ];
    setWaivers(mockData);
  }, []);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4 text-white'>Signed Waivers</h1>
      <div className='space-y-4'>
        {waivers.map((waiver) => (
          <div
            key={waiver.id}
            className='p-4 bg-white/5 rounded-lg border border-white/10 text-white'
          >
            <div className='flex justify-between items-center'>
              <div>
                <p className='font-semibold'>{waiver.name}</p>
                <p className='text-sm text-gray-400'>Signed on {waiver.dateSigned}</p>
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' asChild>
                  <a href={waiver.signatureUrl} download>
                    Download
                  </a>
                </Button>
                <Button variant='secondary' onClick={() => window.open(waiver.signatureUrl)}>
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
