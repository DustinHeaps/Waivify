"use client";

import Link from "next/link";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="w-full p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Waivify
      </Link>

      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-teal-500 text-white px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
