import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";



export default function HomePage() {
  return (
    <div className='max-w-7xl mx-auto py-16 px-4 space-y-12'>
      {/* Header */}
      <section className='text-center space-y-2'>
        <h1 className='text-4xl font-bold'>Hey Dustin 👋</h1>
        <p className='text-gray-600'>
          Welcome to Waivify. Here’s what’s happening in your account.
        </p>
      </section>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Left Column */}
        <div className='space-y-6 md:col-span-2'>
          {/* Onboarding Progress */}
          <Card>
            <CardContent className='p-6 space-y-3'>
              <h2 className='font-semibold text-lg'>Getting Started</h2>
              <div className='space-y-2 text-sm text-gray-500'>
                <div>✅ Create your first waiver</div>
                <div>✅ Share via link or QR code</div>
                <div>⬜ Collect your first signature</div>
              </div>
              <Link
                href='/waivers/new'
                className='text-teal-500 hover:underline inline-block mt-2'
              >
                Finish onboarding →
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className='p-6 space-y-3'>
              <h2 className='font-semibold text-lg'>Recent Activity</h2>
              <ul className='space-y-2 text-sm text-gray-500'>
                <li>+ 2 waivers signed this week</li>
                <li>5 active waivers</li>
                <li>New feature: CSV Export is now available</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          {/* Quick Actions */}
          <Card>
            <CardContent className='p-6 space-y-3'>
              <h2 className='font-semibold text-lg'>Quick Actions</h2>
              <div className='flex flex-col space-y-2'>
                <Link
                  href='/dashboard'
                  className='px-4 py-2 bg-teal-500 rounded text-white text-center'
                >
                  Go to Dashboard
                </Link>
                <Link
                  href='/waivers/new'
                  className='px-4 py-2 bg-gray-200 rounded text-center'
                >
                  Create New Waiver
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Helpful Links */}
          <Card>
            <CardContent className='p-6 space-y-3'>
              <h2 className='font-semibold text-lg'>Helpful Links</h2>
              <div className='flex flex-col space-y-2 text-sm text-teal-500'>
                <Link href='/features' className='hover:underline'>
                  Features
                </Link>
                <Link href='/pricing' className='hover:underline'>
                  Pricing
                </Link>
                <Link href='/faq' className='hover:underline'>
                  FAQ
                </Link>
                <Link href='/policy' className='hover:underline'>
                  Digital Signature Policy
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
