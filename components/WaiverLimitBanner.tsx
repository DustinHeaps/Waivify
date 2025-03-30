import { useUser } from "@clerk/nextjs";

export const WaiverLimitBanner = () => {
  const { user } = useUser();
  const waiversUsed = Number(user?.publicMetadata?.waiversUsed) || 0;
  const plan = user?.publicMetadata?.plan || "free";

  if (plan !== "free") return null;

  return (
    <div className='p-4 bg-yellow-50 border rounded text-sm space-y-1'>
      <p>You’ve used {waiversUsed}/10 free waivers.</p>
      {waiversUsed >= 10 && (
        <p>
          You’ve reached your limit.{" "}
          <a href='/billing' className='text-blue-600 underline'>
            Upgrade to Starter
          </a>{" "}
          to unlock unlimited waivers.
        </p>
      )}
    </div>
  );
};
