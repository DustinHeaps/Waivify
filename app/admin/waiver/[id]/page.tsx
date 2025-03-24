import { notFound } from "next/navigation";

interface WaiverDetailProps {
  params: { id: string };
}

export default async function WaiverDetail({ params }: WaiverDetailProps) {
  const waiverId = params.id;

  // Simulate fetching data (replace with real db call)
  const waiver = await getWaiverById(waiverId); // your db call

  if (!waiver) return notFound();

  return (
    <div className='max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Signed Waiver</h1>
        <p>
          <strong>Name:</strong> {waiver.name}
        </p>
        <p>
          <strong>Date:</strong> {new Date(waiver.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>ID:</strong> {waiver.id}
        </p>
        {waiver.ip && (
          <p>
            <strong>IP Address:</strong> {waiver.ip}
          </p>
        )}
      </div>

      <div className='border-t pt-4'>
        <h2 className='text-lg font-medium mb-2'>Waiver Terms</h2>
        <p className='whitespace-pre-wrap'>{waiver.termsText}</p>
        <ul className='mt-4 space-y-1'>
          <li>✅ Release of liability: {waiver.liability ? "Yes" : "No"}</li>
          <li>✅ Accepted terms: {waiver.terms ? "Yes" : "No"}</li>
        </ul>
      </div>

      <div>
        <h2 className='text-lg font-medium mb-2'>Signature</h2>
        {waiver.signatureUrl ? (
          <img
            src={waiver.signatureUrl}
            alt='Signature'
            className='w-full max-w-sm'
          />
        ) : (
          <p>No signature on file.</p>
        )}
      </div>

      <div className='flex gap-4'>
        <button className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
          Download PDF
        </button>
        <button className='bg-gray-200 px-4 py-2 rounded hover:bg-gray-300'>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

// Dummy function - replace with real DB logic
async function getWaiverById(id: string) {
  return {
    id,
    name: "John Doe",
    createdAt: Date.now(),
    terms: true,
    liability: true,
    signatureUrl: "/signatures/sig1.png",
    termsText: "I agree to the terms and conditions of the waiver...",
    ip: "192.168.1.123",
  };
}
