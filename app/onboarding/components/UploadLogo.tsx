"use client";

import { uploadLogo } from "@/app/actions/onboarding";
import { useState, useTransition } from "react";

type Props = {
  onBack: () => void;
  onNext: (data: { logoUrl: string }) => void;
};

export function UploadLogo({ onBack, onNext }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      const uploaded = await uploadLogo(formData);
      if (uploaded?.url) {
        setLogoUrl(uploaded.url);
        onNext({ logoUrl: uploaded.url });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 text-center'>
      <p className='text-gray-500 max-w-md mx-auto'>
        Your logo will appear on all your waivers to keep things professional
        <span className='text-sm italic ml-1'>(Optional)</span>
      </p>

      {logoUrl && (
        <img
          src={logoUrl}
          alt='Logo preview'
          className='h-24 mx-auto object-contain rounded shadow-sm'
        />
      )}

      <div className='flex flex-col items-center gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className='text-sm text-gray-500 file:mr-4 file:px-4 file:py-2 file:border file:rounded file:bg-white file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100'
        />

        <button
          type='submit'
          disabled={isPending}
          className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400 disabled:opacity-50'
        >
          {isPending ? "Uploading..." : "Upload Logo"}
        </button>
      </div>

      <div className='mt-6 flex justify-between'>
        <button
          type='button'
          onClick={onBack}
          className='bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200'
        >
          ← Back
        </button>

        <button
          type='button'
          disabled={!logoUrl}
          onClick={() => onNext({ logoUrl: logoUrl || "" })}
          className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400 disabled:opacity-50'
        >
          Next →
        </button>
      </div>
    </form>
  );
}
