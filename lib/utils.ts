import { updateNextStep } from "@/app/actions/onboarding";
import { useNextSteps } from "@/hooks/useNextSteps";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth, clerkClient } from "@clerk/nextjs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToCSV(data: any[]) {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => `"${row[field] ?? ""}"`).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}

export function downloadCSV(data: any[], filename = "Waivers.csv") {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();
}

/**
 * Mark step completed by ID if not already done
 */

export const markStepIfEligible = async (id: string) => {
  const nextSteps = useNextSteps();
  const alreadyCompleted = nextSteps.find((s) => s.id === id)?.completed;

  if (!alreadyCompleted) {
    await updateNextStep(id, true);
  }
};
