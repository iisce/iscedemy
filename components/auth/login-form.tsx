'use client'
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Login } from "@/actions/login";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
     const searchParams = useSearchParams();
     const urlError =
          searchParams.get("error") === "OAuthAccountNotLinked"
               ? "Email already in use with different provider!"
               : "";
     const callbackUrl = searchParams.get("callbackUrl") ?? undefined;
     console.log("callback url from search params", { callbackUrl });
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const [isPending, startTransition] = useTransition();
     const router = useRouter();

     const form = useForm<z.infer<typeof LoginSchema>>({
          resolver: zodResolver(LoginSchema),
          defaultValues: {
               email: "",
               password: "",
          },
     });

     const onSubmit = (values: z.infer<typeof LoginSchema>) => {
          setError("");
          setSuccess("");

          startTransition(() => {
               Login(values, callbackUrl).then((data) => {
                    console.log({ data });
                    if (data?.error) {
                         setError(data?.error);
                         toast.error(data.error);
                    } else if (data?.success) {
                         toast.success(data?.success);
                         router.push(String(data.redirectUrl));
                         router.refresh();
                    }
               });
          });
     };

     return (
          <CardWrapper
               headerLabel="Login to continue"
               backButtonLabel="Don't have an account? Sign-Up"
               backButtonHref="/sign-up"
               showSocial
          >
               <Form {...form}>
                    <form
                         onSubmit={form.handleSubmit(onSubmit)}
                         className="space-y-6"
                    >
                         <div className="space-y-4">
                              <FormField
                                   control={form.control}
                                   name="email"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Email</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       disabled={isPending}
                                                       placeholder="email@example.com"
                                                       type="email"
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="password"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Password</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       disabled={isPending}
                                                       placeholder="*****"
                                                       type="password"
                                                  />
                                             </FormControl>
                                             <Button
                                                  asChild
                                                  size="sm"
                                                  variant="link"
                                                  className="px-0 font-normal"
                                             >
                                                  <Link href="reset">
                                                       Forgot password?
                                                  </Link>
                                             </Button>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                         </div>
                         <FormError message={error || urlError} />
                         <FormSuccess message={success} />
                         <Button
                              type="submit"
                              className="w-full rounded-full"
                              disabled={isPending}
                         >
                              {`Login`}
                         </Button>
                    </form>
               </Form>
          </CardWrapper>
     );
}
