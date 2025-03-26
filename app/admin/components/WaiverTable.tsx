"use client";

import { format } from "date-fns";
import CopyButton from "./CopyButton";
import { Waiver } from "@/types";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  waivers: Waiver[];
  searchQuery: string;
  dateFilter: string;
  onDelete: (id: string) => void
};

export default function WaiverTable({
  waivers,
  dateFilter,
  searchQuery,
  onDelete
}: Props) {
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
        <AnimatePresence>
          {waivers.map((waiver) => (
            <motion.tr
              key={waiver.id}
              initial={{ opacity: 0, y: 5 }}
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
                <button
                  onClick={() => onDelete(waiver.id)} 
                  className='text-red-600 hover:underline'
                >
                  Delete
                </button>
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
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
