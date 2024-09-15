'use client'
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

export default function UploadFile(options:{uploadCV:any, setUploading: Dispatch<SetStateAction<boolean>>, uploading: boolean}) {

    const [file, setFile] = useState<File | null>(null);

    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!file) {
            toast("Please select a file to upload");
            return;
        }

        options.setUploading(true);

        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
              }),
            }
        );

      if (response.ok) {
      const {url, fields} = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
      formData.append(key,  value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
				method: "POST",
				body: formData,
			});

			if (uploadResponse.ok) {
				const verified = await uploadResponse.json();
				console.log({ verified });
				toast("Upload successful!");
          options.uploadCV(verified.imageUrl)
				return { verified };
			} else {
				console.error("S3 Upload Error:", uploadResponse);
				toast("Upload failed.");
			}
		} else {
			toast("Failed to get pre-signed URL.");
		}
      
      options.setUploading(false);
    };

    return (
      <>
        <Input
        id='file'
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if(files) {
            setFile(files[0]);
          }
        }}
        multiple
        className="shadow-lg"
        placeholder="Select a file"
  />
        {options.uploading ? (
        <Loader2 className="h-2 w-2 animate-spin"/>
        ) : ( 
          'Upload File'     
        )}
 </>
    )
}
