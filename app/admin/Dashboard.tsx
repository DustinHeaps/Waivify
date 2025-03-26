"use client";

import { useState } from "react";
import { Filters } from "./components/Filters";
// import WeeklyCount from "./components/WeeklyCount";
import WaiverTable from "./components/WaiverTable";
import { useFilteredWaivers } from "./hooks/useFilteredWaivers";
import { Waiver } from "@/types";
import WeeklyCount from "./components/WeeklyCount";
import { FaClipboardList } from "react-icons/fa";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";
import { deleteWaiver } from "../actions/waiver";

type Props = {
  waivers: Waiver[];
};

export default function Dashboard({ waivers }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [waiverList, setWaiverList] = useState(waivers);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const filteredWaivers = useFilteredWaivers(
    waiverList,
    searchQuery,
    dateFilter
  );

  const handleDelete = async (id: string) => {
    const previousList = [...waiverList];

    try {
      // Server-side deletion first
      const res = await deleteWaiver(id);

      if (!res?.success) {
        throw new Error("Delete failed");
      }
  
      // ✅ Optimistic UI (only if delete didn't throw)
      setWaiverList((prev) => prev.filter((w) => w.id !== id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (err) {
      console.error("Failed to delete waiver:", err);
      // Rollback UI if the deletion fails
      setWaiverList(previousList);
      setShowError(true); // you can animate or display an error
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className='max-w-5xl mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Signed Waivers</h1>
      <motion.div
        className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className='flex flex-1 gap-2'>
          <input
            type='text'
            placeholder='Search by name or ID'
            className='w-full border rounded px-3 py-2 text-sm'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className='border rounded px-3 py-2 text-sm'
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value='all'>All Time</option>
            <option value='7days'>Last 7 Days</option>
            <option value='month'>This Month</option>
          </select>
        </div>

        <WeeklyCount waivers={waivers} />
      </motion.div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className='flex items-center gap-2 text-green-600 text-sm mb-4'
          >
            <span>✅</span>
            <span>Waiver deleted successfully.</span>
          </motion.div>
        )}
        {showError && (
          <p className='text-red-600 text-sm mt-2'>
            ❌ Failed to delete waiver. Please try again.
          </p>
        )}
      </AnimatePresence>
      <SwitchTransition mode='out-in'>
        <CSSTransition
          key={
            waivers.length === 0
              ? "no-waivers"
              : filteredWaivers.length === 0
                ? "no-filtered"
                : "show-table"
          }
          classNames='fade'
          timeout={300}
          unmountOnExit
        >
          <>
            {waivers.length === 0 ? (
              <motion.div
                className='text-center bg-gray-50 p-6 rounded-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaClipboardList
                  className='mx-auto text-gray-400 mb-4'
                  size={48}
                />
                <p className='text-lg font-medium text-gray-500'>
                  You haven’t submitted any waivers yet.
                </p>
                <a
                  href='/waiver'
                  className='inline-block mt-2 text-blue-600 hover:underline text-sm'
                >
                  Submit a waiver →
                </a>
              </motion.div>
            ) : filteredWaivers.length === 0 ? (
              <div className='text-center bg-gray-50 p-6 rounded-lg'>
                <p className='text-lg font-medium text-gray-500'>
                  No waivers match your filters.
                </p>
              </div>
            ) : (
              <WaiverTable
                waivers={filteredWaivers}
                searchQuery={searchQuery}
                dateFilter={dateFilter}
                onDelete={handleDelete}
              />
            )}
          </>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
