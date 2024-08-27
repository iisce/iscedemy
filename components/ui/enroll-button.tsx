'use client'
import { addToCourse } from "@/actions/add-to-course";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { getCourseBySlug } from "@/data/course";



const EnrollButton = ({userId, courseId}: {userId:string; courseId: string}) => {
    const [isPending, startTransition] = useTransition()
    const handleEnroll = async () => {

        startTransition(async ()=> {
            try{
                console.log('Attempting to enroll with userId:', userId, 'and courseId:', courseId);
                const response = await addToCourse(userId, courseId);
                toast.success('Successfully Enrolled');
                revalidatePath(`/student`);

            } catch (error) {
                console.error('Error during enrollment:', error);
            }
        });
    };

    return (
        <Button className="rounded-full" onClick={handleEnroll}
        disabled={isPending}>
            {isPending ? 'Enrolling..' : 'Take this course'}
        </Button>
    );
};
export default EnrollButton;