"use server";

import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs";
import { utapi } from "../api/uploadthing/core";

export const getAdminHealth = async () => {
  try {
    // Users
    const users = await clerkClient.users.getUserList();
    const userCount = users.length;

    // DB Connection
    await prisma.$queryRaw`SELECT 1`;

    // Waivers
    const waiverCount = await prisma.waiver.count();

    return {
      userCount,
      waiverCount,
      dbStatus: "OK",
    };
  } catch (error) {
    return {
      userCount: 0,
      waiverCount: 0,
      dbStatus: "Failed",
    };
  }
};

// export async function getUploadthingStats() {
//     try {
//         const res = await fetch('https://uploadthing.com/api/stats', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${process.env.UPLOADTHING_SECRET}`, 
//           },
//           cache: 'no-store',
//         });
    
//         if (!res.ok) throw new Error('UploadThing API error');
    
//         const data = await res.json();
    
//         return {
//           used: data.used ?? 0, // bytes
//           fileCount: data.filesUploaded ?? 0,
//         };
//       } catch (err) {
//         console.error('Failed to fetch UploadThing stats:', err);
//         return {
//           used: 0,
//           fileCount: 0,
//         };
//       }
    
// }

// export const getStorageStats = async () => {
//   try {
//     const files = await utapi.listFiles();
//     return {
//     //   fileCount: files.length,
//     };
//   } catch (err) {
//     return {
//       fileCount: 0,
//     };
//   }
// };

// export async function getAdminStats() {
//   const [waiverCount, userCount, orgs,] = await Promise.all([
//     prisma.waiver.count(),
//     // prisma.user.count(),
//     clerkClient.organizations.getOrganizationList(),
//     utapi.listFiles(),
//   ]);

//   return {
//     waiverCount,
//     userCount,
//     // organizationCount: orgs.length,
//     // fileCount: files.length,
//     pendingJobs: 0, // replace with real queue stats
//     activeJobs: 0,  // replace with real queue stats
//   };
// }
