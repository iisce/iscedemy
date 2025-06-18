'use client';

import { updateBankDetails } from "@/actions/tutor-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { bankCodes } from "@/lib/bankcodes";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export function BankDetailsForm({ tutor, session }: { tutor: any; session: any }) {
  const [isPending, startTransition] = useTransition();
  const [bankName, setBankName] = useState(tutor.bankName || '');
  const [accountNumber, setAccountNumber] = useState(tutor.accountNumber || '');
  const [isSubmitted, setIsSubmitted] = useState(!!tutor.bankName && !!tutor.accountNumber);
    const [banks, setBanks] = useState<{ name: string; code: string }[]>([]);
      const [isLoadingBanks, setIsLoadingBanks] = useState(true);
    


 useEffect(() => {
    const fetchBanks = async () => {
        setIsLoadingBanks(true);
      try {
        const response = await fetch('https://api.paystack.co/bank', {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_PUBLIC_KEY || ''}`, 
          },
        });
        if (response.ok) {
          const data = await response.json();
          const bankList = data.data.map((b: any) => ({ name: b.name, code: b.code }));
          setBanks(bankList);

         if (tutor.bankName && !bankList.some((b: any) => b.name === tutor.bankName)) {
            console.warn('Tutor bankName not found in API:', tutor.bankName, 'Falling back to closest match');
            const closestMatch = bankList.find((b : any) => b.name.toLowerCase().includes(tutor.bankName.toLowerCase()));
            if (closestMatch) setBankName(closestMatch.name);
          }
        } else {
          console.warn('API failed, using local bankCodes:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch banks, using local fallback:', error);
        setBanks(Object.keys(bankCodes).map((name) => ({ name, code: bankCodes[name] })));
      } finally{
        setIsLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);


  useEffect(() => {
    setBankName(tutor.bankName || '');
    setAccountNumber(tutor.accountNumber || '');
    setIsSubmitted(!!tutor.bankName && !!tutor.accountNumber);
  }, [tutor.bankName, tutor.accountNumber]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
        if (accountNumber.length !== 10) {
          toast.error('Account number must be exactly 10 digits.');
          return;
        }

    if (!isSubmitted) {
      const proceed = await new Promise((resolve) => {
        toast.custom((t) => (
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <p className="text-gray-800">Warning: Saving these details will create a subaccount. This action cannot be reversed unless you contact support <span>support@palmtechniq.com</span>. Proceed?</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>Bank Name: <strong>{bankName}</strong></p>
              <p>Account Number: <strong>{accountNumber}</strong></p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  toast.dismiss(t);
                  resolve(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  toast.dismiss(t);
                  resolve(true);
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        ));
      });

      if (!proceed) return;
    }

    
    startTransition(async () => {
        const formData = new FormData();
        formData.append('bankName', bankName);
      formData.append('accountNumber', accountNumber);

      const result = await updateBankDetails(formData, session);
      if (result.success) {
        toast.success(result.success);
         setIsSubmitted(true);
      } else {
        toast.error(result.error || 'Failed to create subaccount.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700">Bank Details</h3>
      <div>
        <Label htmlFor="bankName">Bank Name</Label>
        {isLoadingBanks ? (
          <div className="w-full p-2 border rounded-lg shadow-sm flex items-center justify-center bg-gray-100">
            <Skeleton className="w-full h-10" />
          </div>
        ) : (
          <select
            id="bankName"
            name="bankName"
            value={isSubmitted && tutor.bankName && banks.some((b) => b.name === tutor.bankName) ? tutor.bankName : bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
            disabled={isSubmitted}
            className="w-full p-2 border rounded-lg shadow-sm"
          >
            <option value="" disabled>Select a bank</option>
            {banks.map((bank) => (
              <option key={`${bank.name}-${bank.code}`} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          value={isSubmitted && tutor.accountNumber ? tutor.accountNumber : accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="e.g., 03634875397"
          maxLength={10}
          minLength={10}
          pattern="\d{`10`}"
          required
          disabled={isSubmitted}
          title="Account number must be exactly `10` digits"
        />      </div>
     {!isSubmitted && (
        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Bank Details'}
        </Button>
      )}
      {isSubmitted && (
<div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-green-600 text-sm font-medium">Bank details saved. Contact <a href="mailto:support@palmtechniq.com" className="underline">support@palmtechniq.com</a> to make changes.</p>
          <div className="mt-2 text-sm text-gray-700">
            <p><strong>Bank Name:</strong> {tutor.bankName || 'Not set'}</p>
            <p><strong>Account Number:</strong> {tutor.accountNumber || 'Not set'}</p>
          </div>
        </div>        
      )}
    </form>
  );
}