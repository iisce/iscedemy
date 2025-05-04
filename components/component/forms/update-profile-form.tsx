"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { LoaderIcon } from "lucide-react";
import { updateUser } from "@/actions/student-profile-update"
import { UpdateProfileSchema } from "@/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClientEditProfileForm({ initialName, userId }: { initialName: string; userId: string }) {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();
  
    const form = useForm<z.infer<typeof UpdateProfileSchema>>({
      resolver: zodResolver(UpdateProfileSchema),
      defaultValues: {
        name: initialName,
      },
    });
  
    const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
      setError("");
      setSuccess("");
  
      startTransition(() => {
        interface UpdateUserResponse {
          error?: string;
        }
  
        interface UpdateUserParams {
          id: string;
          name: string;
        }
  
        updateUser({ id: userId, ...values } as UpdateUserParams)
          .then((data: UpdateUserResponse) => {
            if (data?.error) {
              setError(data.error);
            } else {
              setSuccess("Profile updated successfully");
              toast.success("Profile updated successfully");
            }
          })
          .catch((error: unknown) => {
            console.error("Error during update:", error);
            setError("Something went wrong! Please try again.");
          });
      });
    };
  
    return (
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit">
                  {isPending ? <LoaderIcon className="animate-spin" /> : "Update Profile"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    );
  }