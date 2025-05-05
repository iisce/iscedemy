"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { CompletionSchema } from '@/schemas';
import { completeSession } from '@/actions/mentorship';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormError from '@/components/form-error';
import FormSuccess from '@/components/form-success';
import { LoaderIcon } from "lucide-react";
import { redirect } from "next/navigation";

type CompletionFormValues = z.infer<typeof CompletionSchema>;

export default function CompleteSessionForm({ mentorshipId, courseId }: { mentorshipId: string; courseId: string }) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CompletionFormValues>({
    resolver: zodResolver(CompletionSchema),
    defaultValues: {
      notes: '',
    },
  });

  const onSubmit = async (values: CompletionFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await completeSession(mentorshipId, values.notes);
      if (result.success) {
        setSuccess(result.success);
        redirect(`/tutor/courses/${courseId}`); // ✅ use window.location on client
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Notes (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Add any notes about the session" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit">
          {isPending ? <LoaderIcon className="animate-spin" /> : "Mark as Completed"}
        </Button>
      </form>
    </Form>
  );
}
