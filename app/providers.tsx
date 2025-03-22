"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      afterSignInUrl='/admin'
      afterSignUpUrl='/admin'
    >
      {children}
    </ClerkProvider>
  );
}
