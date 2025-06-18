'use server';

import { bankCodes } from '@/lib/bankcodes';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function updateProfile(formData: FormData, session: any) {
    const tutor = await db.user.findUnique({
            where: { id: session.user.id },
          });
        
          if (!tutor) {
            redirect('/login');
          }
  try {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;

    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: name || tutor.name,
        description: description || tutor.description,
        phone: phone || tutor.phone,
        position: position || tutor.position,
      },
    });

    revalidatePath('/tutor/profile');
    return { success: 'Profile updated successfully!' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error: 'Failed to update profile. Please try again!' };
  }
}

export async function updateImage(imageUrl: string, session: any) {
  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { image: imageUrl },
    });

    revalidatePath('/tutor/profile');
    return { success: 'Profile image updated successfully!' };
  } catch (error) {
    console.error('Error updating profile image:', error);
    return { error: 'Failed to update profile image. Please try again.' };
  }
}

export async function updateBankDetails(formData: FormData, session: any) {
  try {
    const bankName = formData.get('bankName') as string;
    const accountNumber = formData.get('accountNumber') as string;
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('Paystack secret key is not set');
    }

    if (!accountNumber || accountNumber.length !== 10 || !/^\d+$/.test(accountNumber)) {
      throw new Error('Account number must be 10 digits');
    }

    const normalizedBankName = bankName.replace(' Plc', '').trim();
    let settlementBank: string | undefined;

    try {
        const bankResponse = await fetch('https://api.paystack.co/bank', {
          headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },                                                                   
        });
        if (!bankResponse.ok) throw new Error('API request failed');
        const banksData = await bankResponse.json();
      const bank = banksData.data.find((b: any) => b.name === bankName);
      settlementBank = bank ? bank.code : undefined;

    }catch (apiError) {
      console.warn('Paystack API failed, falling back to local bank codes:', apiError);
      settlementBank = bankCodes[normalizedBankName];
    }

    
    if (!settlementBank) {
      throw new Error('Unsupported bank. Please select a valid bank.');
    }

    const subaccountResponse = await fetch('https://api.paystack.co/subaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        business_name: `Tutor Account`,
        settlement_bank: settlementBank,
        account_number: accountNumber,
        percentage_charge: 0,
        primary_contact_email: session.user.email || '',
        primary_contact_phone: session.user.phone || '',
      }),
    });

    if (!subaccountResponse.ok) {
      const errorData = await subaccountResponse.json();
      throw new Error(errorData.message || 'Failed to create subaccount');
    }

    const subaccountData = await subaccountResponse.json();
    await db.user.update({
      where: { id: session.user.id },
      data: {
        bankName: normalizedBankName,
        accountNumber: accountNumber,
        subaccountCode: subaccountData.data.subaccount_code,
      },
    });

    revalidatePath('/tutor/profile');
    return { success: 'Bank details and subaccount created successfully!' };
  } catch (error) {
    console.error('Error updating bank details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create subaccount. Please try again!';
    return { error: errorMessage };
  }
}

export async function requestWithdrawal(amount: number, userId: string) {
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
  if (!PAYSTACK_SECRET_KEY) throw new Error('Paystack secret key is not set');

  const user = await db.user.findUnique({ where: { id: userId} });
  if (!user) throw new Error("User not found.");
  if (!user.bankName || !user.accountNumber) throw new Error("Bank details not set.");

  let recipientCode = user.recipientCode;
  // Create transfer recipient
  if(!recipientCode) {

    const transferRecipientResponse = await fetch('https://api.paystack.co/transferrecipient', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'nuban',
        name: user.name || 'Tutor',
        account_number: user.accountNumber,
        bank_code: bankCodes[user.bankName],
        currency: 'NGN',
      }),
    });
  
    if (!transferRecipientResponse.ok) {
      const errorData = await transferRecipientResponse.json();
      throw new Error(errorData.message || 'Failed to create transfer recipient');
    }
  
    const recipientData = await transferRecipientResponse.json();
  
    recipientCode = recipientData.data.recipient_code
  
    await db.user.update({
      where: {id: userId},
      data: {recipientCode}
    })
  }

  const transferResponse = await fetch('https://api.paystack.co/transfer', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: 'balance',
      reason: 'Tutor withdrawal',
      amount: Math.round(amount * 100), 
      recipient: recipientCode,
      currency: "NGN",
    }),
  });

  if (!transferResponse.ok) {
    const errorData = await transferResponse.json();
    throw new Error(errorData.message || 'Failed to process withdrawal');
  }

  await db.user.update({
    where: { id: userId },
    data: { walletBalance: { decrement: amount } },
  });

  await db.transaction.create({
    data: {
      userId: userId,
      courseId: '',
      amount: -amount,
      type: 'withdrawal',
      status: 'processing',
      createdAt: new Date(),

    },
  });
  revalidatePath('/tutor/wallet');
  return { success: `Withdrawal of ₦${(amount.toFixed(2))} requested successfully!` };
}