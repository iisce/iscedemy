'use client';

import { updateImage } from '@/actions/tutor-profile';
import { useTransition } from 'react';
import toast from 'react-hot-toast';
import React from 'react';
import TutorImageUpload from '../component/tutor/tutor-image-uploader';

export default function TutorImageUploadWrapper({ tutorId }: { tutorId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleImageUpload = async (imageUrl: string) => {
    startTransition(async () => {
      const result = await updateImage(imageUrl, { user: { id: tutorId } }); // Pass session data
      if (result.success) {
        toast.success(result.success);
      } else {
        toast.error(result.error || 'Failed to update image.');
      }
    });
  };

  return <TutorImageUpload setImageUrl={handleImageUpload} />;
}