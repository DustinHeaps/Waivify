import { ExpiredContent } from '@/components/ExpiredContent';
import WaiverExpiredTracker from "@/components/WaiverExpiredTracker";

type Props = {
  params: { waiverId: string };
};

export default function ExpiredWaiverPage({ params }: Props) {
  const { waiverId } = params;

  return (
    <ExpiredContent waiverId={waiverId} />
  );
}
