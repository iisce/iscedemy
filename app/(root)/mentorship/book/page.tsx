'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function BookMentorship({ searchParams }: { searchParams: { courseId: string } }) {
    const [topic, setTopic] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Call API to create mentorship session
        await fetch('/api/mentorship/book', {
            method: 'POST',
            body: JSON.stringify({
                courseId: searchParams.courseId,
                topic,
                scheduledAt,
                duration: 30 // Default to 30 minutes
            })
        });
        router.push(`/courses/${searchParams.courseId}?tab=mentorship`);
    };

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold'>Schedule a Mentorship Session</h1>
            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                <Input
                    placeholder='Topic'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <Input
                    type='datetime-local'
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                />
                <Button type='submit'>Book Session</Button>
            </form>
        </div>
    );
}