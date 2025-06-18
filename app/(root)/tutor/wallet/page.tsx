import { auth } from '@/auth';
import { TutorWalletExtra } from '@/components/component/tutor/tutor-wallet-extra';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { calculateMonthlyEarnings, calculateTotalEarnings } from '@/data/tutor';
import { db } from '@/lib/db';
import { formatToNaira } from '@/lib/utils';
import { ClockIcon, WalletIcon } from '@heroicons/react/24/outline';
import { Wallet } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { FaNairaSign } from 'react-icons/fa6';

export const metadata: Metadata = {
    title: 'Tutor Wallet',
    description: 'Manage your wallet, view balance, and request withdrawals.',
    metadataBase: new URL('https://www.palmtechniq.com/tutor/wallet'),
    keywords: 'tutor, wallet, balance, withdrawals, manage wallet',
    openGraph: {
        title: 'Tutor Wallet',
        description: 'Manage your wallet, view balance, and request withdrawals.',
        url: 'https://www.palmtechniq.com/tutor/wallet',
        images: [
            {
                url: '/images/tutor-wallet-og.jpg',
                width: 1200,
                height: 630,
                alt: 'Tutor Wallet',
            },
        ],
    },
    alternates: {
        canonical: '/tutor/wallet',
    },

};


export default async function WalletPage() {
    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    if (session.user.role !== "TUTOR"){
        redirect('/login');
    }

    const tutor = await db.user.findUnique({
        where: {id: session.user.id},
        include: {transactions: true},
    })

    if(!tutor){
        redirect('/login');
    }

  return (
    <MaxWidthWrapper className="py-6 min-h-screen">
        {/* Breadcrumb Navigation */}
        {/* <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/tutor/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Wallet</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div> */}

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <WalletIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
              <p className="text-muted-foreground">Manage your earnings, withdrawals, and payment history</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatToNaira((tutor.walletBalance)/100)}</div>
              <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <FaNairaSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatToNaira(await calculateTotalEarnings(tutor.id)/100)}
              </div>
              <p className="text-xs text-muted-foreground">From all courses</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">₦0.00</div>
              <p className="text-xs text-muted-foreground">Processing in 2-3 days</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
                          <FaNairaSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatToNaira(await calculateMonthlyEarnings(tutor.id)/100)}
              </div>
              <p className="text-xs text-muted-foreground">From current month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Wallet Component */}
        <Suspense fallback={<WalletSkeleton />}>
          <TutorWalletExtra tutor={tutor} session={session} />
        </Suspense>
        {/* <Suspense fallback={<WalletSkeleton />}>
          <TutorWallet tutor={tutor} session={session} />
        </Suspense> */}
      </MaxWidthWrapper>
  )
}

function WalletSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/3" />
      <div className="h-6 bg-gray-100 rounded w-1/2" />
      <div className="h-40 bg-gray-100 rounded" />
    </div>
  );
}
