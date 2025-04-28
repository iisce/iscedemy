"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { LoaderIcon } from "lucide-react";
import { AssignmentReviewSchema } from "@/schemas";

// Define the schema for the review form


type ReviewFormValues = z.infer<typeof AssignmentReviewSchema>;

interface SubmissionReviewFormProps {
  submissionId: string;
  initialGrade?: string | null;
  initialFeedback?: string | null;
}

export default function SubmissionReviewForm({ submissionId, initialGrade, initialFeedback }: SubmissionReviewFormProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(AssignmentReviewSchema),
    defaultValues: {
      grade: initialGrade || "",
      feedback: initialFeedback || "",
    },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/assignments/review/${submissionId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.error.includes("Unauthorized")) {
            router.push("/login");
          } else {
            setError(data.error || "An unexpected error occurred. Please try again.");
          }
          return;
        }

        setSuccess("Submission reviewed successfully");
        toast.success("Submission reviewed successfully");
        router.refresh();
      } catch (error) {
        console.error("Error reviewing submission:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., A, 85/100" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Provide feedback to the student" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          {isPending ? <LoaderIcon className="animate-spin" /> : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
}