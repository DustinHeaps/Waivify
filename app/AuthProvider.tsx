"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      afterSignInUrl='/dashboard'
      afterSignUpUrl='/dashboard'
    >
      {children}
    </ClerkProvider>
  );
}
