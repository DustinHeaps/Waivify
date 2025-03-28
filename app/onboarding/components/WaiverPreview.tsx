
export default function WaiverPreview({
    title,
    description,
    onNext,
    onBack,
  }: {
    title: string;
    description: string;
    onNext: () => void;
    onBack: () => void;
  }) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6 bg-white rounded-2xl shadow-md">
      
        <div className="border border-gray-300 rounded-xl p-5 space-y-4 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">{title || "Untitled Waiver"}</h3>
          <p className="text-gray-700 whitespace-pre-line">{description || "Waiver description goes here..."}</p>
        </div>
  
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="text-gray-600 hover:underline"
          >
            ← Back
          </button>
  
          <button
            onClick={onNext}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            Looks Good
          </button>
        </div>
      </div>
    );
  }
  