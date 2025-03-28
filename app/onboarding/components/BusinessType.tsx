"use client";

import { useState } from "react";

type Props = {
  onNext: (selected: string) => void;
  onBack: () => void;
};

export default function BusinessType({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!selected) {
      setError("Please select a business type.");
      return;
    }
    onNext(selected);
  };

  const options = [
    "Tattoo Shop",
    "Pet Groomer",
    "Yoga/Fitness Studio",
    "Tour Company",
    "Salon/Spa",
    "Other",
  ];

  return (
    <div className='space-y-6'>
    

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              setSelected(option);
              setError("");
            }}
            className={`p-4 border rounded transition ${
              selected === option
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

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
