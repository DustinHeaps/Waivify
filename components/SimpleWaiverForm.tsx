"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import SignaturePad from "react-signature-pad-wrapper";

const WaiverSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms." }),
  }),
  liability: z.literal(true, {
    errorMap: () => ({ message: "You must release liability." }),
  }),
});

type FormData = z.infer<typeof WaiverSchema>;

export default function SimpleWaiverForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(WaiverSchema),
  });

  const sigPadRef = useRef<any>(null);

  const onSubmit = (data: FormData) => {
    
    const signatureDataURL = sigPadRef.current?.toDataURL();
    console.log({ ...data, signature: signatureDataURL });
    // Send to backend or storage
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-6 border rounded bg-white shadow-md"
    >
      <div>
        <label className="block font-semibold">Name</label>
        <input {...register("name")} className="w-full border p-2 rounded" />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Date</label>
        <input
          type="date"
          {...register("date")}
          className="w-full border p-2 rounded"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Signature</label>
        <div className="border rounded">
          <SignaturePad ref={sigPadRef} options={{ penColor: "black" }} />
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("terms" as const)} />
          <span>I agree to the terms & conditions</span>
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("liability" as const)} />
          <span>I release liability for this service</span>
        </label>
        {errors.liability && (
          <p className="text-red-500 text-sm">{errors.liability.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded"
      >
        Submit Waiver
      </button>
    </form>
  );
}

