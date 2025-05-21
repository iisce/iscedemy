'use client';
import { updateCourse } from "@/actions/course";
import { COURSE_PRICING, ProgramType } from "@/lib/course-pricing";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Switch } from "../../ui/switch";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import { Button } from "../../ui/button";
import { LoaderIcon } from "lucide-react";
import { formatClassDays, formatToNaira, toSlug } from "@/lib/utils";
import { UpdateCourseSchema } from "@/schemas";
import UploadFile from "../tutor/tutor-upload-file";

interface EditCourseFormProps {
  course: Course;
  setIsEditing: (isEditing: boolean) => void;
}

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  course,
  setIsEditing,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [imageError, setImageError] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateCourseSchema>>({
    resolver: zodResolver(UpdateCourseSchema),
    defaultValues: {
      id: course.id,
      title: course.title,
      textSnippet: course.textSnippet,
      description: course.description,
      conclusion: course.conclusion,
      summary: course.summary,
      programType: course.programType,
      duration: course.duration,
      category: course.category,
      videoUrl: course.videoUrl || "",
      noOfClass: course.noOfClass,
      classDays: course.classDays,
      certificate: course.certificate,
      overView: course.overView || "",
      image: course.image || "",
    },
  });

  const selectedProgramType = form.watch("programType") || course.programType;
  const prices = COURSE_PRICING[selectedProgramType as ProgramType];

  const onSubmit = (values: z.infer<typeof UpdateCourseSchema>) => {
    console.log('Form Values:', values); // Add this line to log the form data
    setError("");
    setSuccess("");

    startTransition(() => {
      updateCourse(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setSuccess("Course updated successfully");
            toast.success("Course updated successfully");
            setIsEditing(false);
            router.refresh();
          }
        })
        .catch((error) => {
          console.error("Error during update:", error);
          setError("Ugh! Something went wrong! Try again");
        });
    });
  };

  // Preview content based on form values
  const previewContent = {
    title: form.watch("title") || course.title || "Untitled Course",
    category: form.watch("category") || course.category || "Uncategorized",
    textSnippet: form.watch("textSnippet") || course.textSnippet || "No header text provided",
    description: form.watch("description") || course.description || "No description provided",
    conclusion: form.watch("conclusion") || course.conclusion || "No conclusion provided",
    summary: form.watch("summary") || course.summary || "No summary provided",
    overView: form.watch("overView") || course.overView || "No overview provided",
    programType: form.watch("programType") || course.programType || "CRASH_COURSE",
    duration: form.watch("duration") || course.duration || "Not specified",
    noOfClass: form.watch("noOfClass") || course.noOfClass || "Not specified",
    classDays: form.watch("classDays") || course.classDays || "Not specified",
    certificate: form.watch("certificate") ? "Yes" : course.certificate ? "Yes" : "No",
    videoUrl: form.watch("videoUrl") || course.videoUrl || "No video provided",
    image: form.watch("image") || course.image || "No image provided",
  };

  const handleImageUpload = (url: string) => {
    form.setValue("image", url, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {isPreviewMode ? "Course Preview" : "You are editing this course"}
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
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="mb-4">
              {previewContent.image && previewContent.image !== "No image provided" && !imageError ? (
                <img
                  src={previewContent.image}
                  alt="Course Image"
                  className="w-full max-w-xs h-40 object-cover rounded-md"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full max-w-xs h-40 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
            <h4 className="text-xl font-bold mb-2">{previewContent.title}</h4>
            <p className="text-sm text-gray-600 mb-2">Category: {previewContent.category}</p>
            <p className="text-sm mb-2">Header Text: {previewContent.textSnippet}</p>
            <p className="text-sm mb-2">Description: {previewContent.description}</p>
            <p className="text-sm mb-2">Conclusion: {previewContent.conclusion}</p>
            <p className="text-sm mb-2">Summary: {previewContent.summary}</p>
            <p className="text-sm mb-2">Overview: {previewContent.overView}</p>
            <p className="text-sm mb-2">Program Type: {previewContent.programType.replace("_", " ")}</p>
            <p className="text-sm mb-2">Duration: {previewContent.duration}</p>
            <p className="text-sm mb-2">Number of Classes: {previewContent.noOfClass}</p>
            <p className="text-sm mb-2">Class Days: {previewContent.classDays}</p>
            <p className="text-sm mb-2">Certificate Offered: {previewContent.certificate}</p>
            <p className="text-sm mb-2">Video URL: {previewContent.videoUrl}</p>
            <p className="text-sm mb-2">Image URL: {previewContent.image}</p>
            <div className="mt-4">
              <p className="text-sm font-medium">Assigned Prices:</p>
              <p className="text-sm">Virtual: {formatToNaira(prices.virtualPrice)}</p>
              <p className="text-sm">Physical: {formatToNaira(prices.physicalPrice)}</p>
            </div>
          </div>
        ) :(
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
                  placeholder="e.g., intermediate-digital-marketing"
                  disabled={isPending}
                  onChange={(e) => {
                    const slugifiedValue = toSlug(e.target.value);
                    field.onChange(slugifiedValue);
                  }}
                  value={field.value}
                />              
                </FormControl>
                <FormDescription>
                Use hyphens instead of spaces (e.g., "intermediate-digital-marketing").
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
                <Input {...field} placeholder="e.g., Technology, Business" disabled={isPending} />
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
                  className="overflow-y-scroll h-32 break-all"
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
                  className="overflow-y-scroll h-32 break-all"
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
                  className="overflow-y-scroll h-32 break-all"
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
                  className="overflow-y-scroll h-32 break-words"
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
              <FormLabel>Overview (optional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Overview of the course"
                  disabled={isPending}
                  className="overflow-y-scroll h-32 break-words"
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
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CRASH_COURSE">Crash Course</SelectItem>
                  <SelectItem value="THREE_MONTHS">3-Month Program</SelectItem>
                  <SelectItem value="SIX_MONTHS">6-Month Program</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Display assigned prices */}
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-medium">Assigned Prices:</p>
          <p className="text-sm">Virtual: {formatToNaira(prices.virtualPrice)}</p>
          <p className="text-sm">Physical: {formatToNaira(prices.physicalPrice)}</p>
        </div>
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., 5 hours or 3 months" disabled={isPending} />
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
              <FormLabel>Number of Classes</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., 10 classes" disabled={isPending} />
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
                  placeholder="e.g., Tuesdays--Thursdays"
                  disabled={isPending}
                  onChange={(e) => {
                    const formattedValue = formatClassDays(e.target.value);
                    field.onChange(formattedValue);
                  }}
                  value={field.value}
                />              
                </FormControl>
                <FormDescription>
                Use double hyphens to separate days (e.g., "Tuesdays--Thursdays").
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
              <FormLabel>Offer Certificate</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
                <Input {...field} placeholder="e.g., https://youtube.com/video" disabled={isPending} value={field.value ?? ''}/>
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
              <FormLabel>Re-upload Image</FormLabel>
              <FormControl>
                    <UploadFile
                      uploadCV={handleImageUpload}
                      setUploading={setUploading}
                      uploading={uploading}
                    />
                  </FormControl>

              <FormControl>
                {field.value && (

                <Input {...field} placeholder="Image URL" disabled={isPending} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
</>)}
        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="grid gap-2">
          <Button disabled={isPending} type="submit">
            {isPending ? <LoaderIcon className="animate-spin" /> : "Update Course"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCourseForm;