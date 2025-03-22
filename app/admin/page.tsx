
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in"); 
  }

  return <div className="p-6">Welcome Admin! View submitted waivers here soon.</div>;
}
