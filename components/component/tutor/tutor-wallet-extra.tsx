'use client';

import { requestWithdrawal } from '@/actions/tutor-profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatToNaira } from '@/lib/utils';
import {
    ArrowDownRight,
    ArrowUpRight,
    Calendar,
    CreditCard,
    Download,
    Eye,
    Filter,
    Search
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { FaNairaSign } from 'react-icons/fa6';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TutorWalletProps {
  tutor: any;
  session: any;
}

export function TutorWalletExtra({ tutor }: TutorWalletProps) {
  const { data: session } = useSession();
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
    const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  const transactions = tutor.transactions || [];

  const paymentMethods = [
    {
      id: '1',
      type: 'bank',
      name: tutor.bankName || 'Default Bank',
      details: `****${tutor.accountNumber?.slice(-4)}`,
      isDefault: true,
    },
  ];

  const filteredTransactions = transactions.filter((t: any) =>
    (t.description ? t.description.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );
  const handleWithdraw = async () => {
    if (!withdrawalAmount || !selectedMethod) {
      setMessage('Please enter an amount and select a payment method.');
      return;
    }
    const amount = parseFloat(withdrawalAmount);
    if (amount > tutor.walletBalance || amount <= 0) {
      setMessage('Insufficient balance or invalid amount.');
      return;
    }

    startTransition(async () => {
      try {
        const result = await requestWithdrawal(amount, session?.user.id!);
        setMessage(result.success);
        setWithdrawalAmount(''); 
        setSelectedMethod(''); 
      } catch (error: any) {
        setMessage(error.message || 'Withdrawal failed. Please try again.');
      }
    });
  };

  const getChartData = () => {
    const now = new Date();
    let startDate = new Date();
    switch (selectedPeriod) {
      case '7':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90':
        startDate.setDate(now.getDate() - 90);
        break;
      case '365':
        startDate.setDate(now.getDate() - 365);
        break;
    }

    const dailyEarnings: { [key: string]: number } = {};
    const filteredTx = transactions.filter((t: any) => {
      const isValidDate = t.createdAt && new Date(t.createdAt).toISOString().split('T')[0];
      const isWithinPeriod = isValidDate && new Date(isValidDate) >= startDate;
      return isValidDate && isWithinPeriod && (t.type === 'Course Payment' || t.type === 'payment') && t.status === 'success';
    });
    filteredTx.forEach((t: any) => {
      const date = new Date(t.createdAt).toISOString().split('T')[0];
      dailyEarnings[date] = (dailyEarnings[date] || 0) + (t.amount / 100); 
    });

    const labels = Object.keys(dailyEarnings).sort();
    const data = labels.map((date) => dailyEarnings[date] || 0);

    return { labels, data };
  };
  useEffect(() => {
    const { labels, data } = getChartData();
    setChartData({ labels, data });
  }, [selectedPeriod, transactions]);


  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings performance over time</CardDescription>
                </div>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                </Select>            
      </div>
            </CardHeader>
            <CardContent>
              {chartData.labels.length > 0 ? (
                <div className="h-[300px]">
                  <Line
                    data={{
                      labels: chartData.labels,
                      datasets: [
                        {
                          label: 'Earnings (₦)',
                          data: chartData.data,
                          borderColor: '#4B93F7',
                          backgroundColor: 'rgba(75, 147, 247, 0.2)',
                          fill: true,
                          tension: 0.4,
                          pointRadius: 4,
                          pointBackgroundColor: '#4B93F7',
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: { display: true, text: 'Earnings (₦)' },
                        },
                        x: { title: { display: true, text: 'Date' } },
                      },
                      plugins: {
                        legend: { position: 'top' },
                        tooltip: { mode: 'index', intersect: false },
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No earnings data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === 'earning' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {transaction.type === 'earning' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description || 'Course Payment'}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.createdAt && new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatToNaira(Math.abs(transaction.amount))}
                      </p>
                      <Badge variant={transaction.status === 'success' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View all your earnings and withdrawals</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <p className="font-medium">{transaction.description || 'Course Payment'}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'earning' ? 'default' : 'secondary'}>
                          {transaction.type || 'Payment'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === 'success' ? 'default' : 'secondary'}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {formatToNaira(Number(Math.abs(transaction.amount).toFixed(2)))}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredTransactions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No transactions found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>Transfer your earnings to your bank account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <FaNairaSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      className="pl-10"
                      max={tutor.walletBalance}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available balance: {formatToNaira((tutor.walletBalance)/100)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            {method.name} ({method.details})
                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing fee</span>
                    <span>₦50.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing time</span>
                    <span>2-3 business days</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>You'll receive</span>
                      <span>
                        ₦{(withdrawalAmount ? parseFloat(withdrawalAmount) - 50 : 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

               <Button
                                 className="w-full"
                                 onClick={handleWithdraw}
                                 disabled={isPending || !withdrawalAmount || !selectedMethod}
                               >
                                 {isPending ? (
                                   'Processing...'
                                 ) : (
                                   <>
                                     <ArrowDownRight className="h-4 w-4 mr-2" />
                                     Withdraw Funds
                                   </>
                                 )}
                               </Button>
                               {message && (
                                 <p className={`text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                                   {message}
                                 </p>
                               )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
                <CardDescription>Your recent withdrawal requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions
                    .filter((t: any) => t.type === 'withdrawal')
                    .map((withdrawal: any) => (
                      <div
                        key={withdrawal.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-red-100 text-red-600">
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{withdrawal.description || 'Withdrawal'}</p>
                            <p className="text-sm text-muted-foreground">
                              {withdrawal.createdAt && new Date(withdrawal.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">₦{Math.abs(withdrawal.amount).toFixed(2)}</p>
                          <Badge variant={withdrawal.status === 'success' ? 'default' : 'secondary'}>
                            {withdrawal.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}