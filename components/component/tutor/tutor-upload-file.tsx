'use client';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

export default function UploadFile(options: {
    uploadCV: any,
    setUploading: Dispatch<SetStateAction<boolean>>,
    uploading: boolean
}) {
    const [file, setFile] = useState<File | null>(null);

    const handlesubmit = async (testFile: File | null) => {
        if (!testFile) {
            toast("Please select a file to upload.");
            return;
        }

        options.setUploading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/upload`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        filename: testFile.name,
                        contentType: testFile.type,
                    }),
                }
            );

            if (!response.ok) {
                toast(`Error: ${response.statusText || "Server error"}`);
                console.error("Server Error:", await response.text());
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
            formData.append("file", testFile);

            const uploadResponse = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (uploadResponse.ok) {
              const fileUrl = `${url}${fields.key}`;
                toast("Upload successful!");
                options.uploadCV(fileUrl);
            } else {
                console.error("S3 Upload Error:", await uploadResponse.text());
                toast("Upload failed.");
            }
        } catch (error) {
            console.error("Unexpected Error:", error);
            toast("An unexpected error occurred.");
        } finally {
            options.setUploading(false);
        }
    };

    return (
        <>
            <Input
                id="file"
                type="file"
                disabled={options.uploading}
                onChange={(e) => {
                    const files = e.target.files;
                    if (files && files[0]) {
                        setFile(files[0]);
                        handlesubmit(files[0]);
                    }
                }}
                className="shadow-lg"
                placeholder="Select a file"
            />
            {options.uploading ? (
                <Loader2 className="h-2 w-2 animate-spin" />
            ) : (
                "Upload File"
            )}
        </>
    );
}
