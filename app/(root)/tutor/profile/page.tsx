"use server";
import { auth } from '@/auth';
import { BankDetailsForm } from '@/components/component/forms/bank-form';
import { ProfileForm } from '@/components/component/forms/tutor-profile-form';
import { TutorWallet } from '@/components/component/tutor/tutor-wallet';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import TutorImageUploadWrapper from '@/components/shared/tutor-image-upload-wrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';



export default async function TutorProfilePage() {
    const session = await auth();
    if(!session) {
        redirect('/login');
    }

    if(session.user.role !== 'TUTOR') {
        redirect('/login');
    }

    const tutor = await db.user.findUnique({
        where: { id: session.user.id },
      });
    
      if (!tutor) {
        redirect('/login');
      }

      

      return (
        <MaxWidthWrapper className="py-6">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gray-100 p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">Tutor Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-2 border-gray-200">
                <AvatarImage src={tutor.image || '/default-tutor.jpg'} alt={tutor.name || 'Tutor'} />
                <AvatarFallback className="bg-gray-200 text-gray-700">{tutor.name?.charAt(0) || 'T'}</AvatarFallback>
              </Avatar>
              <TutorImageUploadWrapper tutorId={session.user.id!} />
            </div>

            {/* Profile Details Form */}
            <ProfileForm tutor={tutor} session={session} />

            {/* Bank Details Form */}
            <BankDetailsForm tutor={tutor} session={session} />
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
      );
}
