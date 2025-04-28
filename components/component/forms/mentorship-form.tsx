"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { LoaderIcon } from "lucide-react";
import { MentorshipSchema } from "@/schemas";


type MentorshipFormValues = z.infer<typeof MentorshipSchema>;

interface MentorshipFormProps {
  courseId: string;
}

export default function MentorshipForm({ courseId }: MentorshipFormProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<MentorshipFormValues>({
    resolver: zodResolver(MentorshipSchema),
    defaultValues: {
      scheduledAt: "",
      duration: 30,
      topic: "",
    },
  });

  const onSubmit = async (values: MentorshipFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await fetch(`/api/mentorship/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            courseId,
            scheduledAt: new Date(values.scheduledAt).toISOString(),
          }),
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

        setSuccess("Mentorship slot created successfully");
        toast.success("Mentorship slot created successfully");
        router.push(`/tutor/courses/${courseId}`);
      } catch (error) {
        console.error("Error creating mentorship slot:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="scheduledAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scheduled Date and Time</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., Advanced SEO Strategies Q&A"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meetingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting URL (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., https://meet.google.com/abc-def-ghi"
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
            {isPending ? <LoaderIcon className="animate-spin" /> : "Create Mentorship Slot"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/tutor/courses/${courseId}`)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}