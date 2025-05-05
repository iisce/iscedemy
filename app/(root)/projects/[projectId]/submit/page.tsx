'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function SubmitProject({ params }: { params: { projectId: string } }) {
    const [content, setContent] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call API to submit project
        await fetch(`/api/projects/submit`, {
            method: 'POST',
            body: JSON.stringify({
                projectId: params.projectId,
                content,
                fileUrl
            })
        });
        router.push(`/projects/${params.projectId}`);
    };

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold'>Submit Project</h1>
            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                <Textarea
                    placeholder='Project Details'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Input
                    placeholder='File URL (optional)'
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                />
                <Button type='submit'>Submit Project</Button>
            </form>
        </div>
    );
}