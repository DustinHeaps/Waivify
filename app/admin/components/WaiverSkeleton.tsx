import { Skeleton } from "@/components/ui/skeleton";

export function WaiverSkeleton() {
  return (
    <tr>
      <td className='px-4 py-2'>
        <Skeleton className='h-4 w-24' />
      </td>
      <td className='px-4 py-2'>
        <Skeleton className='h-4 w-32' />
      </td>
      <td className='px-4 py-2'>
        <Skeleton className='h-4 w-40' />
      </td>
      <td className='px-4 py-2 flex gap-2'>
        <Skeleton className='h-6 w-12' />
        <Skeleton className='h-6 w-12' />
        <Skeleton className='h-6 w-16' />
      </td>
    </tr>
  );
}
