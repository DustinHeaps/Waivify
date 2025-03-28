"use client";

import CopyButton from "./CopyButton";
import { Waiver } from "@/types";
import { motion } from "framer-motion";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { useEffect, useState } from "react";
import { WaiverSkeleton } from "./WaiverSkeleton";
import { useDebounced } from "@/hooks/useDebounced";
import { archiveWaivers } from '@/app/actions/waiver';

type Props = {
  waivers: Waiver[];
  onDelete: (id: string) => void;
  isLoading: boolean;
};

export default function WaiverTable({ waivers, onDelete, isLoading }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected = selectedIds.length === waivers.length;
  const debouncedLoading = useDebounced(isLoading, 200);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? [] : waivers.map((w) => w.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleArchive = async () => {
    await archiveWaivers(selectedIds);
    // Refresh waivers list or optimistically update state
  };

  return (
    <div className='bg-white shadow rounded-lg overflow-hidden mt-6'>
      {selectedIds.length > 0 && (
        <div className='flex justify-between items-center px-4 py-2 border-b bg-gray-50 text-sm text-gray-700'>
          <span>{selectedIds.length} selected</span>
          <div className='space-x-2'>
            <button
              onClick={() => {
                selectedIds.forEach(onDelete);
                setSelectedIds([]);
              }}
              className='text-red-600 hover:underline'
            >
              Delete Selected
            </button>
            <button onClick={() => handleArchive()} className='text-gray-600 hover:underline'>Archive</button>
          </div>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='w-full table-auto min-w-[640px]'>
          <thead className='bg-gray-100 text-left text-sm text-gray-600'>
            <tr>
              <th className='px-4 py-3'>
                <input
                  type='checkbox'
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3'>Date</th>
              <th className='px-4 py-3'>Waiver ID</th>
              {/* <th className='px-4 py-3'>Actions</th> */}
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
                    <td className='px-4 py-3'>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(waiver.id)}
                        onChange={() => toggleSelect(waiver.id)}
                      />
                    </td>
                    <td className='px-4 py-3 text-sm whitespace-nowrap'>
                      {waiver.name}
                    </td>
                    <td className='px-4 py-3 text-sm whitespace-nowrap'>
                      {new Date(waiver.date).toLocaleString()}
                    </td>
                    <td className='px-4 py-3 text-sm text-gray-500 whitespace-nowrap'>
                      <span title={waiver.id}>
                        {waiver.id.slice(0, 4)}...{waiver.id.slice(-4)}
                      </span>
                      <CopyButton text={waiver.id} />
                    </td>
                    {/* <td className='px-4 py-3 space-x-4 text-sm whitespace-nowrap'>
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
                    </td> */}
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
