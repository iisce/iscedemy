'use client';

import { updateProfile } from '@/actions/tutor-profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormEvent, useTransition } from 'react';
import { toast } from 'sonner';

export function ProfileForm({ tutor, session }: { tutor: any; session: any }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfile(formData, session);
      if (result.success) {
        toast.success(result.success);
      } else {
        toast.error(result.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-700">Profile Details</h3>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={tutor.name || ''} placeholder="Your name" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={tutor.email || ''} disabled />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" defaultValue={tutor.phone || ''} placeholder="Your phone number" />
      </div>
      <div>
        <Label htmlFor="position">Position</Label>
        <Input id="position" name="position" defaultValue={tutor.position || ''} placeholder="Your position" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={tutor.description || ''} placeholder="Tell us about yourself" rows={5} />
      </div>
      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </Button>
    </form>
  );
}