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
import { AssignmentSchema } from "@/schemas";

// Define the schema for the assignment form


type AssignmentFormValues = z.infer<typeof AssignmentSchema>;

interface AssignmentFormProps {
  courseId: string;
  existingAssignment?: {
    id: string;
    title: string;
    description: string;
    dueDate?: Date | null;
  };
}

export default function AssignmentForm({ courseId, existingAssignment }: AssignmentFormProps) {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(AssignmentSchema),
    defaultValues: {
      title: existingAssignment?.title || "",
      description: existingAssignment?.description || "",
      dueDate: existingAssignment?.dueDate
        ? new Date(existingAssignment.dueDate).toISOString().split("T")[0]
        : undefined,
    },
  });

  const onSubmit = async (values: AssignmentFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const endpoint = existingAssignment
          ? `/api/assignments/update/${existingAssignment.id}`
          : `/api/assignments/create`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            courseId,
            dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : undefined,
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

        setSuccess(existingAssignment ? "Assignment updated successfully" : "Assignment created successfully");
        toast.success(existingAssignment ? "Assignment updated successfully" : "Assignment created successfully");
        router.push(`/tutor/courses/${courseId}`);
      } catch (error) {
        console.error("Error during assignment creation/update:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Build a Website" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="e.g., Create a responsive website using HTML and CSS."
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date (optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="grid gap-2">
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : existingAssignment ? (
              "Update Assignment"
            ) : (
              "Create Assignment"
            )}
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