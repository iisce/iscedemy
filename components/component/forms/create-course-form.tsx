"use client";

import { createCourse } from "@/actions/course";
import { COURSE_PRICING, ProgramType } from "@/lib/course-pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import { Button } from "../../ui/button";
import { LoaderIcon } from "lucide-react";
import { formatClassDays, formatToNaira, toSlug } from "@/lib/utils";
import { CreateCourseSchema } from "@/schemas";
import UploadFile from "../tutor/tutor-upload-file";

interface CreateCourseFormProps {
     tutorId: string;
     setIsCreating: (isCreating: boolean) => void;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
     tutorId,
     setIsCreating,
}) => {
     const [error, setError] = useState<string | undefined>(undefined);
     const [success, setSuccess] = useState<string | undefined>(undefined);
     const [isPending, startTransition] = useTransition();
     const [isPreviewMode, setIsPreviewMode] = useState(false);
     const [imageError, setImageError] = useState(false);
     const [uploading, setUploading] = useState(false);
     const router = useRouter();

     const form = useForm<z.infer<typeof CreateCourseSchema>>({
          resolver: zodResolver(CreateCourseSchema),
          defaultValues: {
               title: "",
               textSnippet: "",
               description: "",
               conclusion: "",
               summary: "",
               programType: "CRASH_COURSE",
               duration: "",
               category: "",
               videoUrl: "",
               noOfClass: "",
               classDays: "",
               certificate: true, // Default to true since certificates are a key feature
               overView: "",
               image: "",
               tutorId: tutorId,
          },
     });

     const selectedProgramType = form.watch("programType");
     const prices = COURSE_PRICING[selectedProgramType as ProgramType];

     const onSubmit = (values: z.infer<typeof CreateCourseSchema>) => {
          setError("");
          setSuccess("");

          startTransition(() => {
               createCourse(values)
                    .then((data) => {
                         if (data && "error" in data) {
                              setError(data.error);
                         } else {
                              form.reset();
                              setSuccess("Course created successfully");
                              toast.success("Course created successfully");
                              setIsCreating(false);
                              router.refresh();
                         }
                    })
                    .catch((error) => {
                         console.error("Error during creation:", error);
                         setError("Ugh! Something went wrong! Try again");
                    });
          });
     };

     const previewContent = {
          title: form.watch("title") || "Untitled Course",
          category: form.watch("category") || "Uncategorized",
          textSnippet: form.watch("textSnippet") || "No header text provided",
          description: form.watch("description") || "No description provided",
          conclusion: form.watch("conclusion") || "No conclusion provided",
          summary: form.watch("summary") || "No summary provided",
          overView: form.watch("overView") || "No overview provided",
          programType: form.watch("programType") || "CRASH_COURSE",
          duration: form.watch("duration") || "Not specified",
          noOfClass: form.watch("noOfClass") || "Not specified",
          classDays: form.watch("classDays") || "Not specified",
          certificate: form.watch("certificate") ? "Yes" : "No",
          videoUrl: form.watch("videoUrl") || "No video provided",
          image: form.watch("image") || "No image provided",
     };

     const handleImageUpload = (url: string) => {
          form.setValue("image", url, { shouldValidate: true });
     };
     return (
          <Form {...form}>
               <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
               >
                    <div className="mb-4 flex items-center justify-between">
                         <h3 className="text-lg font-semibold">
                              {isPreviewMode
                                   ? "Course Preview"
                                   : "You are creating a new course"}
                         </h3>
                         <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsPreviewMode(!isPreviewMode)}
                              disabled={isPending}
                         >
                              {isPreviewMode ? "Back to Edit" : "Preview"}
                         </Button>
                    </div>

                    {isPreviewMode ? (
                         <div className="rounded-lg border bg-white p-6 shadow-md">
                              <div className="mb-4">
                                   {previewContent.image &&
                                   previewContent.image !==
                                        "No image provided" &&
                                   !imageError ? (
                                        <img
                                             src={previewContent.image}
                                             alt="Course Image"
                                             className="h-40 w-full max-w-xs rounded-md object-cover"
                                             onError={() => setImageError(true)}
                                        />
                                   ) : (
                                        <div className="flex h-40 w-full max-w-xs items-center justify-center rounded-md bg-gray-200">
                                             <span className="text-gray-500">
                                                  No Image Available
                                             </span>
                                        </div>
                                   )}
                              </div>
                              <h4 className="mb-2 text-xl font-bold">
                                   {previewContent.title}
                              </h4>
                              <p className="mb-2 text-sm text-gray-600">
                                   Category: {previewContent.category}
                              </p>
                              <p className="mb-2 text-sm">
                                   Header Text: {previewContent.textSnippet}
                              </p>
                              <p className="mb-2 text-sm">
                                   Description: {previewContent.description}
                              </p>
                              <p className="mb-2 text-sm">
                                   Conclusion: {previewContent.conclusion}
                              </p>
                              <p className="mb-2 text-sm">
                                   Summary: {previewContent.summary}
                              </p>
                              <p className="mb-2 text-sm">
                                   Overview: {previewContent.overView}
                              </p>
                              <p className="mb-2 text-sm">
                                   Program Type:{" "}
                                   {previewContent.programType.replace(
                                        "_",
                                        " ",
                                   )}
                              </p>
                              <p className="mb-2 text-sm">
                                   Duration: {previewContent.duration}
                              </p>
                              <p className="mb-2 text-sm">
                                   Number of Classes: {previewContent.noOfClass}
                              </p>
                              <p className="mb-2 text-sm">
                                   Class Days: {previewContent.classDays}
                              </p>
                              <p className="mb-2 text-sm">
                                   Certificate Offered:{" "}
                                   {previewContent.certificate}
                              </p>
                              <p className="mb-2 text-sm">
                                   Video URL: {previewContent.videoUrl}
                              </p>
                              <p className="mb-2 text-sm">
                                   Image URL: {previewContent.image}
                              </p>
                              <div className="mt-4">
                                   <p className="text-sm font-medium">
                                        Assigned Prices:
                                   </p>
                                   <p className="text-sm">
                                        Virtual:{" "}
                                        {formatToNaira(prices.virtualPrice)}
                                   </p>
                                   <p className="text-sm">
                                        Physical:{" "}
                                        {formatToNaira(prices.physicalPrice)}
                                   </p>
                              </div>
                         </div>
                    ) : (
                         <>
                              <FormField
                                   control={form.control}
                                   name="title"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Course Title</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="Course Title"
                                                       onChange={(e) => {
                                                            const slugifiedValue =
                                                                 toSlug(
                                                                      e.target
                                                                           .value,
                                                                 );
                                                            field.onChange(
                                                                 slugifiedValue,
                                                            );
                                                       }}
                                                       value={field.value}
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormDescription>
                                                  Use hyphens instead of spaces
                                                  (e.g.,
                                                  "intermediate-digital-marketing").
                                             </FormDescription>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="category"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Category</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="e.g., Technology, Business"
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="textSnippet"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Header Text</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder="Header Text"
                                                       disabled={isPending}
                                                       className="h-32 overflow-y-scroll break-all"
                                                  />
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
                                                       placeholder="Description"
                                                       disabled={isPending}
                                                       className="h-32 overflow-y-scroll break-all"
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="conclusion"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Conclusion</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder="Conclusion"
                                                       disabled={isPending}
                                                       className="h-32 overflow-y-scroll break-all"
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="summary"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Summary</FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder="Summary"
                                                       disabled={isPending}
                                                       className="h-32 overflow-y-scroll break-words"
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="overView"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  Overview (optional)
                                             </FormLabel>
                                             <FormControl>
                                                  <Textarea
                                                       {...field}
                                                       placeholder="Overview of the course"
                                                       disabled={isPending}
                                                       className="h-32 overflow-y-scroll break-words"
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="programType"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Program Type</FormLabel>
                                             <Select
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                  disabled={isPending}
                                             >
                                                  <FormControl>
                                                       <SelectTrigger>
                                                            <SelectValue placeholder="Select program type" />
                                                       </SelectTrigger>
                                                  </FormControl>
                                                  <SelectContent>
                                                       <SelectItem value="CRASH_COURSE">
                                                            Crash Course
                                                       </SelectItem>
                                                       <SelectItem value="THREE_MONTHS">
                                                            3-Month Program
                                                       </SelectItem>
                                                       <SelectItem value="SIX_MONTHS">
                                                            6-Month Program
                                                       </SelectItem>
                                                  </SelectContent>
                                             </Select>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              {/* Display assigned prices */}
                              <div className="rounded-md bg-gray-100 p-4">
                                   <p className="text-sm font-medium">
                                        Assigned Prices:
                                   </p>
                                   <p className="text-sm">
                                        Virtual:{" "}
                                        {formatToNaira(prices.virtualPrice)}
                                   </p>
                                   <p className="text-sm">
                                        Physical:{" "}
                                        {formatToNaira(prices.physicalPrice)}
                                   </p>
                              </div>
                              <FormField
                                   control={form.control}
                                   name="duration"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Duration</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="e.g., 5 hours or 3 months"
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="noOfClass"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>
                                                  Number of Classes
                                             </FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="e.g., 10 classes"
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="classDays"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Class Days</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="e.g., Mon, Wed, Fri"
                                                       onChange={(e) => {
                                                            const formattedValue =
                                                                 formatClassDays(
                                                                      e.target
                                                                           .value,
                                                                 );
                                                            field.onChange(
                                                                 formattedValue,
                                                            );
                                                       }}
                                                       value={field.value}
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormDescription>
                                                  Use double hyphens to separate
                                                  days (e.g.,
                                                  "Tuesdays--Thursdays").
                                             </FormDescription>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="certificate"
                                   render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                             <FormLabel>
                                                  Offer Certificate
                                             </FormLabel>
                                             <FormControl>
                                                  <Switch
                                                       checked={field.value}
                                                       onCheckedChange={
                                                            field.onChange
                                                       }
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="videoUrl"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Video URL</FormLabel>
                                             <FormControl>
                                                  <Input
                                                       {...field}
                                                       placeholder="e.g., https://youtube.com/video"
                                                       disabled={isPending}
                                                  />
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                              <FormField
                                   control={form.control}
                                   name="image"
                                   render={({ field }) => (
                                        <FormItem>
                                             <FormLabel>Course Image</FormLabel>
                                             <FormControl>
                                                  <UploadFile
                                                       uploadCV={
                                                            handleImageUpload
                                                       }
                                                       setUploading={
                                                            setUploading
                                                       }
                                                       uploading={uploading}
                                                  />
                                             </FormControl>
                                             {field.value && (
                                                  <div className="mt-2">
                                                       <FormLabel>
                                                            Uploaded Image URL
                                                       </FormLabel>
                                                       <Input
                                                            value={field.value}
                                                            readOnly
                                                            className="cursor-not-allowed bg-gray-100"
                                                       />
                                                  </div>
                                             )}
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />
                         </>
                    )}
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <div className="grid gap-2">
                         <Button disabled={isPending} type="submit">
                              {isPending ? (
                                   <LoaderIcon className="animate-spin" />
                              ) : (
                                   "Create Course"
                              )}
                         </Button>
                         <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsCreating(false)}
                              disabled={isPending}
                         >
                              Cancel
                         </Button>
                    </div>
               </form>
          </Form>
     );
};

export default CreateCourseForm;
