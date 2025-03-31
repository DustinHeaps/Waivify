
import { getAdminHealth,  } from "@/app/actions/admin";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminHealthPage() {
  const data = await getAdminHealth();
//   const uploadStats = await getUploadthingStats();
//   const usedMB = (uploadStats.used / 1024 / 1024).toFixed(2);
//   const fileCount = uploadStats.files;
  return (
    <div className='max-w-4xl mx-auto py-8 space-y-4'>
      <h1 className='text-2xl font-semibold'>Admin Health Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardContent className='p-4 space-y-1'>
            <span className='text-muted-foreground text-sm'>👥 Users</span>
            <div className='text-2xl font-medium'>{data.userCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4 space-y-1'>
            <span className='text-muted-foreground text-sm'>📝 Waivers</span>
            <div className='text-2xl font-medium'>{data.waiverCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4 space-y-1'>
            <span className='text-muted-foreground text-sm'>
              🟢 DB Connection
            </span>
            <div
              className={`text-2xl font-medium ${data.dbStatus === "OK" ? "text-green-600" : "text-red-600"}`}
            >
              {data.dbStatus === "OK" ? "Healthy" : "Failed"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 space-y-1'>
            <span className='text-muted-foreground text-sm'>
              📦 Storage Used
            </span>
            <div className='text-2xl font-medium'>
              {/* {usedMB} MB */}
            </div>
            <p className='text-xs text-muted-foreground'>
              {/* {fileCount} files uploaded */}
            </p>
          </CardContent>
        </Card>
      </div>
      <p className='text-xs text-muted-foreground text-center pt-4'>
        Last refreshed: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
