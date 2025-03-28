import { useState } from "react";

type Props = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function EmailPrefrences({ onNext, onBack }: Props) {
  const [selectedPref, setSelectedPref] = useState<"all" | "important" | null>(
    "all"
  );

  const handleSelect = (value: "all" | "important") => {
    setSelectedPref(value);
  };
  return (
    <form
      className='space-y-6 text-center'
      onSubmit={(e) => {
        e.preventDefault();
        onNext(selectedPref);
      }}
    >
      <div>
        <p className='text-gray-500 max-w-lg mx-auto mb-4'>
          We’ll occasionally send you helpful tips & product updates.
          <br />
          Choose your email preferences.
        </p>
      </div>

      <div className='flex flex-col items-start gap-4 mx-auto w-fit'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='emailPref'
            value='all'
            checked={selectedPref === "all"}
            onChange={() => handleSelect("all")}
          />
          <span className='text-gray-800'>Product updates & tips</span>
        </label>

        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='radio'
            name='emailPref'
            value='important'
            checked={selectedPref === "important"}
            onChange={() => handleSelect("important")}
          />
          <span className='text-gray-800'>
            Only important account notifications
          </span>
        </label>
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
          type='submit'
          onClick={onNext}
          className='bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-400'
        >
          Next →
        </button>

        <p className='mt-4 text-center text-sm text-gray-500'>
          Not sure?{" "}
          <button
            type='button'
            onClick={() => onNext(null)}
            className='underline hover:text-gray-700'
          >
            Skip for now
          </button>
        </p>
      </div>
    </form>
  );
}
