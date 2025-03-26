import { getSignatureById } from "@/app/actions/waiver";
import { ReturnHomeButton } from "@/components/ReturnHomeButton";
import { SendEmailButton } from "@/components/SendEmailButton";
import WaiverDownloadButton from "@/components/WaiverDownloadButton";

import { format } from "date-fns";
import { notFound } from "next/navigation";

export default async function ConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  const signature = await getSignatureById(params.id);

  if (!signature) {
    notFound();
  }

  return (
    <div className='max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center'>
      <div className='text-center mt-10'>
        <h1 className='text-2xl font-bold text-green-600'>
          ✅ Waiver Submitted
        </h1>
        <p className='mt-2'>
          Thanks for signing! Your waiver has been successfully submitted.
        </p>

        <p className='text-center text-sm text-gray-600 mt-4'>
          <span className='text-red-500'>Submitted by:</span> {signature.name}{" "}
          <br />
          <span className='text-red-500'>Confirmation ID:</span> {signature.id}{" "}
          <br />
          <span className='text-red-500'>Submitted on:</span>{" "}
          {format(new Date(signature.uploadedAt), "PPPpp")}
        </p>
        <hr className='my-6 border-t border-gray-200 max-w-xs mx-auto' />

        <ReturnHomeButton />
      </div>

      <p className='text-sm mt-5'>
        <span>Need</span> a copy? <br />
        <div className='flex justify-center relative'>
          <WaiverDownloadButton waiverId={signature.waiverId} />
          or
          <SendEmailButton id={signature.id} waiverId={signature.waiverId} />
        </div>
      </p>
    </div>
  );
}
