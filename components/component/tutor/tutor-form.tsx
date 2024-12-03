'use client'
import { BecomeTutor } from "@/actions/become-tutor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     Select,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COURSES } from "@/lib/consts";
import { TutorRegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import {
     Form,
     FormControl,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../../ui/form";
import UploadFile from "./tutor-upload-file";

export default function BecomeTutorForm() {
     const [uploading, setUploading] = useState(false);
     const [error, setError] = useState<string | undefined>("");
     const [success, setSuccess] = useState<string | undefined>("");
     const [isPending, startTransition] = useTransition();
     const router = useRouter();

     const form = useForm<z.infer<typeof TutorRegisterSchema>>({
          resolver: zodResolver(TutorRegisterSchema),
          defaultValues: {
               fullname: "",
               email: "",
               phone: "",
               coverletter: "",
               uploadcv: "",
          },
          mode: "onChange",
     });

     console.log(form.getValues())

     const handleCVUpload = async (url: string) => {
          console.log("Uploaded Cv:", url)
          form.setValue('uploadcv', url);
     }

     const onSubmit = (values: z.infer<typeof TutorRegisterSchema>) => {
          setError("");
          setSuccess("");

          startTransition(() => {
            BecomeTutor(values)
              .then((data) => {
                if (data?.error) {
                  setError(data.error);
                } else {
                  setSuccess('Tutor registered successfully!');
                  router.push('/');
                }
              })
              .catch((error) => {
                  console.error('Error registering tutor. Please try', error);
              });
          });
     };

     return (
          <div className="my-10 flex w-full flex-col px-4 md:px-8">
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-center">
                         <h1 className="text-left text-7xl font-bold leading-tight md:text-8xl md:leading-none">
                              Want to Become a Tutor?
                         </h1>
                    </div>

                    <div className="">
                         <Form {...form}>
                              <form
                                   className="w-full shadow-lg px-6 py-3 outline-2"
                                   onSubmit={form.handleSubmit(onSubmit)}
                              >
                                   <div className="font mt-3 grid w-full items-center gap-4">
                                        <div className="font flex flex-col space-y-1.5">
                                             <FormField
                                                  control={form.control}
                                                  name="fullname"
                                                  render={({ field }) => (
                                                       <FormItem>
                                                            <FormLabel className="font-bold">
                                                                 Full Name
                                                            </FormLabel>
                                                            <FormControl>
                                                                 <Input
                                                                      {...field}
                                                                      disabled={
                                                                           isPending
                                                                      }
                                                                      className="shadow-lg"
                                                                      placeholder="Enter your full name"
                                                                 />
                                                            </FormControl>
                                                            <FormMessage />
                                                       </FormItem>
                                                  )}
                                             />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                             <div className="flex flex-col space-y-1.5">
                                                  <FormField
                                                       control={form.control}
                                                       name="email"
                                                       render={({ field }) => (
                                                            <FormItem>
                                                                 <FormLabel className="font-bold">
                                                                      Email
                                                                      Address
                                                                 </FormLabel>
                                                                 <FormControl>
                                                                      <Input
                                                                           {...field}
                                                                           disabled={
                                                                                isPending
                                                                           }
                                                                           className="shadow-lg"
                                                                           placeholder="johndoe@gmail.com"
                                                                      />
                                                                 </FormControl>
                                                                 <FormMessage />
                                                            </FormItem>
                                                       )}
                                                  />
                                             </div>

                                             <div className="flex flex-col space-y-1.5">
                                                  <FormField
                                                       control={form.control}
                                                       name="phone"
                                                       render={({ field }) => (
                                                            <FormItem>
                                                                 <FormLabel className="font-bold">
                                                                      Phone
                                                                      Number
                                                                 </FormLabel>
                                                                 <FormControl>
                                                                      <Input
                                                                           {...field}
                                                                           disabled={
                                                                                isPending
                                                                           }
                                                                           className="shadow-lg"
                                                                           placeholder="0123456789"
                                                                      />
                                                                 </FormControl>
                                                                 <FormMessage />
                                                            </FormItem>
                                                       )}
                                                  />
                                             </div>

                                             <div className="flex flex-col space-y-1.5">
                                                  <FormField
                                                       control={form.control}
                                                       name="course"
                                                       render={({ field }) => (
                                                            <FormItem>
                                                                 <FormLabel className="font-bold">
                                                                      Course
                                                                      Specialty
                                                                 </FormLabel>

                                                                 <Select
                                                                      disabled={
                                                                           isPending
                                                                      }
                                                                      onValueChange={
                                                                           field.onChange
                                                                      }
                                                                      defaultValue={
                                                                           field.value
                                                                      }
                                                                 >
                                                                      <FormControl>
                                                                           <SelectTrigger
                                                                                id="course"
                                                                                className="shadow-lg"
                                                                           >
                                                                                <SelectValue placeholder="Choose a course" />
                                                                           </SelectTrigger>
                                                                      </FormControl>
                                                                      <SelectContent position="popper">
                                                                           {COURSES.map(
                                                                                (
                                                                                     course,
                                                                                     i,
                                                                                ) => (
                                                                                     <SelectGroup
                                                                                          key={
                                                                                               i
                                                                                          }
                                                                                     >
                                                                                          <SelectItem
                                                                                               value={
                                                                                                    course.name
                                                                                               }
                                                                                          >
                                                                                               {
                                                                                                    course.name
                                                                                               }
                                                                                          </SelectItem>
                                                                                     </SelectGroup>
                                                                                ),
                                                                           )}
                                                                      </SelectContent>
                                                                 </Select>
                                                                 <FormMessage />
                                                            </FormItem>
                                                       )}
                                                  />
                                             </div>

                                             <div className="flex flex-col space-y-1.5">
                                                  <FormField
                                                       control={form.control}
                                                       name="uploadcv"
                                                       render={({ field }) => (
                                                            <FormItem>
                                                                 <FormLabel className="font-bold">
                                                                      Upload CV
                                                                 </FormLabel>
                                                                 
                                                                 <FormControl >
                                                                       
                                                                     <UploadFile setUploading={setUploading} uploading={uploading} uploadCV={handleCVUpload }  />
                                                                 </FormControl>
                                                                 <FormMessage />
                                                            </FormItem>
                                                       )}
                                                  />
                                             </div>

                                             <div className="flex flex-col py-5 space-y-2">
                                                  <FormField
                                                       control={form.control}
                                                       name="coverletter"
                                                       render={({ field }) => (
                                                            <FormItem>
                                                                 <FormLabel className="font-bold">
                                                                      Cover
                                                                      Letter {" "}
                                                                 </FormLabel>
                                                                 <FormControl>
                                                                      <Textarea
                                                                           {...field}
                                                                           disabled={
                                                                                isPending
                                                                           }
                                                                           className="h-40 xl:w-[90svh] md:w-[50svh] w-full p-3 shadow-lg"
                                                                           placeholder="Max. 200 words"
                                                                      />
                                                                 </FormControl>
                                                                 <FormMessage />
                                                            </FormItem>
                                                       )}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <FormError message={error} />
                                   <FormSuccess message={success} />
                                   <Button
                                      type="submit" 
                                      disabled={uploading}
                                      className="w-full bg-black md:w-auto">
                                      {isPending || uploading  ? (
                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                             "Register"
                                        )}
                                   </Button>
                              </form>
                         </Form>
                    </div>
               </div>
          </div>
     );
}
