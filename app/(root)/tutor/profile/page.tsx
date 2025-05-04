import { auth } from '@/auth';
import TutorImageUpload from '@/components/component/tutor/tutor-image-uploader';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic';


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

      const updateProfile = async (formData: FormData) => {
        "use server";

        try {
            const name = formData.get('name') as string;
            const description = formData.get('description') as string;
            const phone = formData.get('phone') as string;
            const position = formData.get('position') as string;

            await db.user.update({
                where: {id: session.user.id},
                data: {
                    name: name || tutor.name,
                    description: description || tutor.description,
                    phone: phone || tutor.phone,
                    position: position || tutor.position,
                },
            });

            revalidatePath('/tutor/profile');
            return {success: 'Profile updated successfully!'};
        } catch (error) {
            console.error('Error updating profile:', error);
            return {error: 'Failed to update profile. Please try again!'};
        }
      };

      const updateImage = async (imageUrl: string) => {
        "use server";

        try {
            await db.user.update({
                where: {id: session.user.id},
                data: {image: imageUrl},
            });

            revalidatePath('/tutor/profile');
            return {success: 'Profile image updated successfully!'};
        } catch (error) {
            console.error('Error updating profile image:', error);
            return { error: 'Failed to update profile image. Please try again.' };
          }
      };

      return (
        <MaxWidthWrapper className="py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold">Tutor Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={tutor.image || '/default-tutor.jpg'} alt={tutor.name || 'Tutor'} />
                    <AvatarFallback>{tutor.name?.charAt(0) || 'T'}</AvatarFallback>
                  </Avatar>
                  <TutorImageUpload setImageUrl={updateImage} />
                </div>
    
                {/* Profile Details Form */}
                <form
                  action={async (formData: FormData) => {
                    'use server';
                    const result = await updateProfile(formData);
                    if (result.success) {
                      return redirect('/tutor/profile?success=Profile updated successfully!');
                    } else {
                      return redirect('/tutor/profile?error=Failed to update profile.');
                    }
                  }}
                  className="flex-1 space-y-4"
                >
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={tutor.name || ''}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={tutor.email || ''}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      defaultValue={tutor.phone || ''}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      defaultValue={tutor.position || ''}
                      placeholder="Your position (e.g., Senior Developer)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      defaultValue={tutor.description || ''}
                      placeholder="Tell us about yourself"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Update Profile
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </MaxWidthWrapper>
      );
}
