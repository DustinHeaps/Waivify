import WaiverExpiredTracker from "./WaiverExpiredTracker";

type ExpiredWaiverProps = {
  waiverId: string;
};

export const ExpiredContent = ({ waiverId }: ExpiredWaiverProps) => {
  return (
    <>
      <WaiverExpiredTracker waiverId={waiverId} />
      <div className='max-w-md mx-auto mt-20 bg-white p-6 rounded-xl text-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>
            This link has expired
          </h1>
          <p className='text-gray-700 mb-6'>
            This waiver is no longer available through this link. If you need
            another copy, please contact us or request a new waiver.
          </p>
          <a
            href='/'
            className='inline-block bg-teal-600 text-white px-5 py-2 rounded hover:bg-teal-700 transition'
          >
            Return Home
          </a>
        </div>
      </div>
    </>
  );
};
