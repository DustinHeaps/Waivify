import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import { getAllWaivers } from '../actions/waiver';

export default async function AdminPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const waivers = await getAllWaivers()

  return <Dashboard waivers={waivers} />;
}

