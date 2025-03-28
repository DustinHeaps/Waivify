import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  currentUser,
} from "@clerk/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Waivify Home – Welcome Back",
  description:
    "You're signed in and ready to manage digital waivers. Head to your dashboard or start fresh.",
};

export default async function HomePage() {
  const user = await currentUser();

  return (
    <div className='min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center justify-center text-center'>
      <div className='absolute top-6 right-6 z-50'>
        <UserButton afterSignOutUrl='/' />
      </div>
      <h1 className='text-4xl font-bold text-gray-900 mb-2'>
        Hey {user?.firstName || "there"} 👋
      </h1>
      <p className='text-gray-600 text-lg mb-8'>
        Welcome to Waivify. You’re all set to manage your digital waivers.
      </p>

      <div className='flex gap-4 mb-10'>
        <Link
          href='/admin'
          className='bg-teal-500 text-white px-6 py-3 rounded hover:bg-teal-400 transition'
        >
          Go to Dashboard
        </Link>
        <Link
          href='/waiver/new'
          className='bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition'
        >
          Create New Waiver
        </Link>
      </div>

      <SignedIn>
        <div className='text-sm text-gray-500 flex items-center gap-2'>
          <span>Signed in as {user?.emailAddresses?.[0]?.emailAddress}</span>
        </div>
      </SignedIn>

      <SignedOut>
        <SignInButton mode='modal'>
          <button className='bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 transition'>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
