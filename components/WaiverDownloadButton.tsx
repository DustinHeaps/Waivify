'use client';

import { getSecureFileUrl } from '@/app/actions/waiver';


type Props = {
  fileKey: string;
};

export default function WaiverDownloadButton({ fileKey }: Props) {
  const handleDownload = async () => {
    try {
      const url = await getSecureFileUrl(fileKey);
      window.open(url, '_blank'); 
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
    >
      Download Signature
    </button>
  );
}
