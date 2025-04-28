"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { LoaderIcon } from "lucide-react";
import { SubmissionSchema } from "@/schemas";



type SubmissionFormValues = z.infer<typeof SubmissionSchema>;

interface SubmissionFormProps {
  courseId: string;
  projectId: string;
}

export default function SubmissionForm({ courseId, projectId }: SubmissionFormProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(SubmissionSchema),
    defaultValues: {
      content: "",
      fileUrl: "",
    },
  });

  const onSubmit = async (values: SubmissionFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/assignments/submit/${projectId}`, {
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

        setSuccess("Assignment submitted successfully");
        toast.success("Assignment submitted successfully");
        router.push(`/courses/${courseId}`);
      } catch (error) {
        console.error("Error during submission:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Submission Content</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter your submission here"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File URL (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., https://your-file-url.com"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="grid gap-2">
          <Button disabled={isPending} type="submit">
            {isPending ? <LoaderIcon className="animate-spin" /> : "Submit Assignment"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/courses/${courseId}`)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}