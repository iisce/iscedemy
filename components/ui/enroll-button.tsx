"use client";
import { addToCourse } from "@/actions/add-to-course";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./button";

const EnrollButton = ({
     userId,
     courseId,
}: {
     userId: string;
     courseId: string;
}) => {
     const [isPending, startTransition] = useTransition();
     const router = useRouter();
     const handleEnroll = async () => {
          startTransition(async () => {
               try {
                    console.log(
                         "Attempting to enroll with userId:",
                         userId,
                         "and courseId:",
                         courseId,
                    );
                    const formData = new FormData();
                    formData.append("userId", userId);
                    formData.append("courseId", courseId);
                    const response = await addToCourse(formData);
                    toast.success("Successfully Enrolled");
                    setTimeout(() => {
                         router.push("/student");
                    }, 1000);
               } catch (error) {
                    console.error("Error during enrollment:", error);
               }
          });
     };

     return (
          <Button
               className="rounded-full"
               onClick={handleEnroll}
               disabled={isPending}
          >
               {isPending ? "Enrolling.." : "Take this course"}
          </Button>
     );
};
export default EnrollButton;
