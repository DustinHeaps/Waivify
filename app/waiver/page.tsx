import SimpleWaiverForm from "@/components/SimpleWaiverForm";
import { markWaiverViewed } from "../actions/waiver";

export const metadata = {
  title: "Sign Your Waiver – Fast & Secure | Powered by Waivify",
  description:
    "Fill out and sign your waiver online in seconds. Waivify makes digital waiver signing fast, secure, and effortless.",
  keywords: [
    "sign waiver online",
    "digital waiver form",
    "e-sign waiver",
    "Waivify signature",
    "fill out consent form",
  ],
};

export default async function WaiverPage() {
  await markWaiverViewed();
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <SimpleWaiverForm />
    </div>
  );
}
