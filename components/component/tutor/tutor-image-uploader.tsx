'use client';

import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

/**
 * A React component for uploading tutor images. This component allows users to select an image file,
 * validates the file type, and uploads it to a server. It also provides feedback to the user during
 * the upload process.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(imageUrl: string) => Promise<{ success?: string; error?: string }>} props.setImageUrl - 
 * A function to handle the uploaded image URL. It should return a promise that resolves to an object
 * containing either a success or error message.
 *
 * @returns {JSX.Element} The rendered TutorImageUpload component.
 *
 * @example
 * ```tsx
 * <TutorImageUpload setImageUrl={async (url) => {
 *   // Handle the uploaded image URL
 *   console.log('Uploaded image URL:', url);
 *   return { success: 'Image URL saved successfully!' };
 * }} />
 * ```
 *
 * @remarks
 * - The component uses the `useState` hook to manage the uploading state and the selected file.
 * - It validates the file type to ensure only images (JPEG, PNG, GIF) are uploaded.
 * - The upload process involves sending metadata to an API endpoint and then uploading the file to
 *   a provided URL (e.g., S3 bucket).
 * - Displays a loading spinner while the upload is in progress.
 *
 * @dependencies
 * - `Input`: A custom input component for file selection.
 * - `Loader2`: A loader/spinner component for indicating progress.
 * - `toast`: A function for displaying user notifications.
 *
 * @file /C:/Users/USER/iscedemy/components/component/tutor/tutor-image-uploader.tsx
 */
export default function TutorImageUpload({
  setImageUrl,
}: {
  setImageUrl: (imageUrl: string) => Promise<{ success?: string; error?: string }>;
}) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (testFile: File | null) => {
    if (!testFile) {
      toast('Please select an image to upload.');
      return;
    }

    // Validate file type (only images)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(testFile.type)) {
      toast('Please upload a valid image file (JPEG, PNG, or GIF).');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: testFile.name,
          contentType: testFile.type,
        }),
      });

      if (!response.ok) {
        toast(`Error: ${response.statusText || 'Server error'}`);
        console.error('Server Error:', await response.text());
        return;
      }

      const jsonData = await response.json();
      const { url, fields } = jsonData || {};

      if (!url || !fields) {
        toast('Invalid server response.');
        return;
      }

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      formData.append('file', testFile);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        const fileUrl = `${url}${fields.key}`;
        toast('Image uploaded successfully!');
        const result = await setImageUrl(fileUrl);
        if (result.error) {
          toast(result.error);
        }
      } else {
        console.error('S3 Upload Error:', await uploadResponse.text());
        toast('Upload failed.');
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      toast('An unexpected error occurred.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        id="image"
        type="file"
        accept="image/jpeg,image/png,image/gif"
        disabled={uploading}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            setFile(files[0]);
            handleSubmit(files[0]);
          }
        }}
        className="shadow-lg"
      />
      {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}