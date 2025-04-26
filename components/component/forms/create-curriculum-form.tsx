'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { LoaderIcon } from "lucide-react";
import { useState, useTransition } from "react";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import { CreateCurriculumSchema } from "@/schemas";

interface CreateCurriculumFormProps {
  courseId: string;
  existingCurriculum?: {
    id: string;
    courseId: string;
    modules: {
      id: string;
      curriculumId: string;
      headingNumber: string;
      headingName: string;
      headingDescription: string;
      duration: string;
      order: number;
      lessons: {
        id: string;
        moduleId: string;
        title: string;
        description: string;
        duration: string;
        videoUrl: string;
        order: number;
      }[];
    }[];
  } | null;
}

const CreateCurriculumForm: React.FC<CreateCurriculumFormProps> = ({
  courseId,
  existingCurriculum,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  const defaultValues = existingCurriculum
    ? {
        courseId,
        modules: existingCurriculum.modules.map((module) => ({
          headingNumber: module.headingNumber,
          headingName: module.headingName,
          headingDescription: module.headingDescription,
          duration: module.duration,
          order: module.order,
          lessons: module.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            videoUrl: lesson.videoUrl,
            order: lesson.order,
          })),
        })),
      }
    : {
        courseId,
        modules: [
          {
            headingNumber: "Module 1",
            headingName: "",
            headingDescription: "",
            duration: "",
            order: 1,
            lessons: [
              {
                title: "",
                description: "",
                duration: "",
                videoUrl: "",
                order: 1,
              },
            ],
          },
        ],
      };
      
  const form = useForm<z.infer<typeof CreateCurriculumSchema>>({
    resolver: zodResolver(CreateCurriculumSchema),
    defaultValues
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  const onSubmit = async (values: z.infer<typeof CreateCurriculumSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/curriculum/create-or-update", {
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

        form.reset();
        setSuccess("Curriculum created successfully");
        toast.success("Curriculum created successfully");
        router.push(`/tutor/courses/${courseId}`);
      } catch (error) {
        console.error("Error during curriculum creation:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {moduleFields.map((moduleField, moduleIndex) => (
          <div key={moduleField.id} className="border p-4 rounded-md space-y-4">
            <h4 className="text-lg font-semibold">Module {moduleIndex + 1}</h4>
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.headingNumber`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Module 1" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.headingName`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Heading Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Introduction to Programming" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.headingDescription`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heading Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="e.g., Learn the basics of programming" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.duration`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 2 weeks" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`modules.${moduleIndex}.order`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="e.g., 1"
                      disabled={isPending}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Lessons */}
            <div className="space-y-4 pl-4 border-l-2">
              <h5 className="text-md font-semibold">Lessons</h5>
              <div className="space-y-4">
                {form.getValues(`modules.${moduleIndex}.lessons`)?.map((lesson: any, lessonIndex: any) => (
                  <div key={lessonIndex} className="border p-4 rounded-md space-y-4">
                    <h6 className="text-sm font-semibold">Lesson {lessonIndex + 1}</h6>
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesson Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., Variables and Data Types" disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.lessons.${lessonIndex}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Lesson description" disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 10 minutes" disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.lessons.${lessonIndex}.videoUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., https://youtube.com/video" disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`modules.${moduleIndex}.lessons.${lessonIndex}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="e.g., 1"
                              disabled={isPending}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const lessons = form.getValues(`modules.${moduleIndex}.lessons`);
                        lessons.splice(lessonIndex, 1);
                        form.setValue(`modules.${moduleIndex}.lessons`, lessons);
                      }}
                      disabled={isPending || form.getValues(`modules.${moduleIndex}.lessons`)?.length === 1}
                    >
                      Remove Lesson
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    const lessons = form.getValues(`modules.${moduleIndex}.lessons`) || [];
                    lessons.push({
                      title: "",
                      description: "",
                      duration: "",
                      videoUrl: "",
                      order: lessons.length + 1,
                    });
                    form.setValue(`modules.${moduleIndex}.lessons`, lessons);
                  }}
                  disabled={isPending}
                >
                  Add Lesson
                </Button>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={() => removeModule(moduleIndex)}
              disabled={isPending || moduleFields.length === 1}
            >
              Remove Module
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={() =>
            appendModule({
              headingNumber: `Module ${moduleFields.length + 1}`,
              headingName: "",
              headingDescription: "",
              duration: "",
              order: moduleFields.length + 1,
              lessons: [{ title: "", description: "", duration: "", videoUrl: "", order: 1 }],
            })
          }
          disabled={isPending}
        >
          Add Module
        </Button>

        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="grid gap-2">
          <Button disabled={isPending} type="submit">
            {isPending ? <LoaderIcon className="animate-spin" /> : "Save Curriculum"}
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
};

export default CreateCurriculumForm;