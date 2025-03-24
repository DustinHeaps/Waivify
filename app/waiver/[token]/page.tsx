import { getWaiverById, markWaiverViewed } from "@/app/actions/waiver";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ExpiredWaiverPage from "../expired/page";

type PageProps = {
  params: { token: string };
};

export default async function ViewWaiverPage({ params }: PageProps) {
  const waiver = await prisma.waiver.findUnique({
    where: { token: params.token },
  });

  if (!waiver) return notFound();

  // Expiration logic — 30 days after last view or creation
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  const lastActivity = waiver.viewedAt || waiver.date;
  if (lastActivity < cutoff) {
    return <ExpiredWaiverPage waiverId={waiver.id} />;
  }

  // ✅ Mark as viewed if not already
  await markWaiverViewed(waiver.id);

  return (
    <div className='max-w-xl mx-auto mt-10 border p-6 rounded shadow'>
      <h1 className='text-2xl font-bold mb-4'>Signed Waiver</h1>
      <p>
        <strong>Name:</strong> {waiver.name}
      </p>
      <p>
        <strong>Date:</strong> {new Date(waiver.date).toLocaleString()}
      </p>
      <p>
        <strong>IP Address:</strong> {waiver.ipAddress}
      </p>
      <p>
        <strong>Terms:</strong> {waiver.terms ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>Liability:</strong> {waiver.liability ? "✅ Yes" : "❌ No"}
      </p>
      <p>
        <strong>Signature:</strong>
      </p>
      <img
        src={`https://uploadthing.com/f/${waiver.signature}`}
        alt='Signature'
        className='mt-2 max-w-xs border'
      />
    </div>
  );
}
