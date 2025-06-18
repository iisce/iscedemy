"use client";
import { requestWithdrawal } from "@/actions/tutor-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatToNaira } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function TutorWallet({ tutor, session }: { tutor: any; session: any }) {
  const [isPending, startTransition] = useTransition();
  const [walletBalance, setWalletBalance] = useState(tutor.walletBalance || 0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  useEffect(() => {
    setWalletBalance(tutor.walletBalance || 0);
  }, [tutor.walletBalance]);

  const handleWithdrawal = async () => {
    if (withdrawalAmount <= 0 || withdrawalAmount > walletBalance) {
      toast.error('Invalid withdrawal amount or insufficient balance.');
      return;
    }

    startTransition(async () => {
       try {
      const result = await requestWithdrawal(withdrawalAmount, session);
      if (result.success) {
        toast.success(result.success);
        setWalletBalance((prev: any) => prev - withdrawalAmount);
      }
    } catch (error: any) {
      toast.error(error.message || 'Withdrawal failed.');
    }
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700">Wallet</h3>
      <p className="text-lg text-gray-800">Balance: {formatToNaira(walletBalance/100)}</p>
      {!tutor.bankName && (
        <p className="text-yellow-600 text-sm">Please add bank details to request withdrawals.</p>
      )}
      {tutor.bankName && (
        <>
          <div>
            <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-gray-700">
              Withdrawal Amount (₦)
            </label>
            <Input
              id="withdrawalAmount"
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              className="mt-1 p-2 w-full border rounded-lg shadow-sm"
              min="0"
              placeholder="Enter amount"
              disabled={isPending}
            />
          </div>
          <Button
            onClick={handleWithdrawal}
            className="bg-green-600 hover:bg-green-700 text-white mt-2 w-full"
            disabled={isPending || !tutor.bankName}
          >
            {isPending ? 'Processing...' : 'Request Withdrawal'}
          </Button>
        </>
      )}
    </div>
  );
}