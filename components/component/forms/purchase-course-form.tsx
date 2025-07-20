"use client";
import { initiatePayment } from "@/actions/initialize-payment";
import { Switch } from "@/components/ui/switch";
import { TYPE } from "@/lib/consts";
import { formatToNaira } from "@/lib/utils";
import { PurchaseCourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../../ui/form";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "../../ui/select";

export default function PurchaseCourseForm({
     course,
     student,
}: {
     course: Course;
     student: User;
}) {
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const [isPending, startTransition] = useTransition();
     const router = useRouter();

     const [additionalCostMessage, setAdditionalCostMessage] = useState<
          string | null
     >(null);

     const form = useForm<z.infer<typeof PurchaseCourseSchema>>({
          resolver: zodResolver(PurchaseCourseSchema),
          defaultValues: {
               courseId: course.id,
               userId: student.id,
               includeCertificate: true,
          },
          mode: "onChange",
     });

     useEffect(() => {
          const courseType = form.getValues("type");
          const includeCertificate =
               form.getValues("includeCertificate") !== false;
          let basePrice =
               courseType === "Physical"
                    ? course.physicalPrice
                    : course.virtualPrice;
          let totalAdditional = 0;

          if (!student.hasStudentId) {
               totalAdditional += 15000;
          }
          if (includeCertificate) {
               totalAdditional += 5000;
          }

          const totalPrice = basePrice + totalAdditional;
          if (totalAdditional > 0) {
               setAdditionalCostMessage(
                    `Includes ${
                         !student.hasStudentId
                              ? "15,000 Naira for Digital Student ID (one-time) and "
                              : ""
                    }${includeCertificate ? "5,000 Naira for Certificate" : ""}${
                         !student.hasStudentId && includeCertificate
                              ? "."
                              : !student.hasStudentId
                                ? "."
                                : includeCertificate
                                  ? "."
                                  : ""
                    }`,
               );
          } else {
               setAdditionalCostMessage(null);
          }
     }, [
          form.watch("type"),
          form.watch("includeCertificate"),
          student.hasStudentId,
          course.physicalPrice,
          course.virtualPrice,
     ]);

     const onSubmit = (values: z.infer<typeof PurchaseCourseSchema>) => {
          setError("");
          setSuccess("");

          startTransition(() => {
               initiatePayment(values)
                    .then((data) => {
                         if (data?.error) {
                              setError(data.error);
                              return;
                         } else if (data.success) {
                              setTimeout(() => {
                                   router.push(data.authorization_url);
                              }, 2000);
                              form.reset();
                         }
                    })
                    .catch((error) => {
                         console.error(
                              "Error occured while submitting your form. Please try again!",
                              error,
                         );
                    });
               console.log(values);
          });
     };

     return (
          <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className="mb-4 text-3xl font-bold capitalize text-gray-900 dark:text-gray-100">
                         {course.title.split("-").join(" ")}
                    </h1>
                    <p className="mb-8 text-gray-600 dark:text-gray-400">
                         {course.description}
                    </p>
                    <div className="flex flex-col gap-3">
                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                              {formatToNaira(
                                   form.getValues("type") === "Virtual"
                                        ? course.virtualPrice
                                        : course.physicalPrice,
                              )}
                         </div>
                         {additionalCostMessage && (
                              <p className="text-sm text-destructive/70">
                                   {additionalCostMessage}
                              </p>
                         )}
                         <FormField
                              name="type"
                              control={form.control}
                              render={({ field }) => (
                                   <FormItem>
                                        <FormLabel className="px-3 font-semibold">
                                             {`Which are you registering for?..`}
                                        </FormLabel>

                                        <Select
                                             disabled={isPending}
                                             onValueChange={field.onChange}
                                             defaultValue={field.value}
                                        >
                                             <FormControl>
                                                  <SelectTrigger className="w-full">
                                                       <SelectValue placeholder="We want to know where you belong" />
                                                  </SelectTrigger>
                                             </FormControl>
                                             <SelectContent>
                                                  {TYPE.map((type, i) => (
                                                       <SelectItem
                                                            key={i}
                                                            value={type.name}
                                                       >
                                                            {type.name}
                                                       </SelectItem>
                                                  ))}
                                             </SelectContent>
                                        </Select>
                                        <FormMessage />
                                   </FormItem>
                              )}
                         />

                         <FormField
                              name="includeCertificate"
                              control={form.control}
                              render={({ field }) => (
                                   <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                             <FormLabel>
                                                  Include Certificate (5,000
                                                  Naira)
                                             </FormLabel>
                                             <FormMessage />
                                        </div>
                                        <FormControl>
                                             <Switch
                                                  checked={field.value === true}
                                                  onCheckedChange={
                                                       field.onChange
                                                  }
                                                  disabled={isPending}
                                                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                                             />
                                        </FormControl>
                                   </FormItem>
                              )}
                         />
                         <Button disabled={isPending} type="submit">
                              Pay Now
                         </Button>
                    </div>
               </form>
          </Form>
     );
}
