"use client";

import { useState } from "react";

type Props = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function WaiverStep({ onBack, onNext }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) {
      setError("Please fill out both fields.");
      return;
    }

    
    setError("");
    // to match clerks metadata
    onNext({ waiverTitle: title, waiverDescription: desc });
  };

  return (
    <div className='space-y-4'>
      <div>
        <label className='block font-medium'>Waiver Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-1 w-full rounded border border-gray-300 p-2'
        />
      </div>

      <div>
        <label className='block font-medium'>Waiver Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className='mt-1 w-full rounded border border-gray-300 p-2'
          rows={4}
        />
      </div>

      {error && <p className='text-sm text-red-500'>{error}</p>}

      <div className='flex justify-between pt-4'>
        <button
          onClick={onBack}
          className='bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200'
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400'
        >
          Next →
        </button>
      </div>
    </div>
  );
}
