import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { markWaiverViewed } from '../actions/waiver';

export default async function WaiverPage() {
    await markWaiverViewed();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <SimpleWaiverForm />
    </div>
  );
}
