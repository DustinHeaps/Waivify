"use client";

import CopyButton from "./CopyButton";
import { Waiver } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { useEffect, useState } from "react";
import { WaiverSkeleton } from "./WaiverSkeleton";
import { useDebounced } from "@/hooks/useDebounced";

type Props = {
  waivers: Waiver[];
  onDelete: (id: string) => void;
  isLoading: boolean;
};

export default function WaiverTable({ waivers, onDelete, isLoading }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const debouncedLoading = useDebounced(isLoading, 200);

  return (
    <div className='bg-white shadow rounded-lg overflow-hidden mt-6'>
      <table className='w-full table-auto'>
        <thead className='bg-gray-100 text-left text-sm text-gray-600'>
          <tr>
            <th className='px-4 py-3'>Name</th>
            <th className='px-4 py-3'>Date</th>
            <th className='px-4 py-3'>Waiver ID</th>
            <th className='px-4 py-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {debouncedLoading
            ? Array.from({ length: 5 }).map((_, idx) => <WaiverSkeleton />)
            : waivers.map((waiver) => (
                <motion.tr
                  layout
                  key={waiver.id}
                  initial={hasMounted ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className='border-t hover:bg-gray-50 transition'
                >
                  <td className='px-4 py-3'>{waiver.name}</td>
                  <td className='px-4 py-3'>
                    {new Date(waiver.date).toLocaleString()}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-500'>
                    <span title={waiver.id}>
                      {waiver.id.slice(0, 4)}...{waiver.id.slice(-4)}
                    </span>
                    <CopyButton text={waiver.id} />
                  </td>
                  <td className='px-4 py-3 space-x-4 text-sm'>
                    <ConfirmDeleteDialog
                      onConfirm={() => onDelete(waiver.id)}
                      waiverId={waiver.id}
                    >
                      <button className='text-red-600 hover:underline p-0 h-auto'>
                        Delete
                      </button>
                    </ConfirmDeleteDialog>

                    <a
                      href={`/waiver/${waiver.token}`}
                      target='_blank'
                      className='text-blue-600 hover:underline'
                    >
                      View
                    </a>
                    <a
                      href={`/api/download?waiverId=${waiver.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      Download
                    </a>
                  </td>
                </motion.tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
