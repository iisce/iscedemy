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
import { useEffect, useState, useTransition, useRef } from "react";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import { CreateCurriculumSchema } from "@/schemas";
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurriculumStore } from '@/stores/curriculum-store';

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
        lessonKey: string;
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
  const [showDialog, setShowDialog] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [initialDraft, setInitialDraft] = useState<z.infer<typeof CreateCurriculumSchema> | null>(null);
  const isInitialMount = useRef(true);
  const hasReset = useRef(false);
  const router = useRouter();

  // Zustand store
  const { draft, setDraft, clearDraft } = useCurriculumStore();

  // Load draft synchronously on mount
  useEffect(() => {
    const loadDraft = () => {
      let loadedDraft: z.infer<typeof CreateCurriculumSchema> | null = null;
      // First, check Zustand store
      if (draft && draft.courseId === courseId) {
        console.log("Loaded draft from Zustand:", draft);
        loadedDraft = draft;
      } else {
        // Fallback to localStorage
        const storedDraft = typeof window !== "undefined" ? localStorage.getItem('curriculum-draft') : null;
        if (storedDraft) {
          try {
            const parsedDraft = JSON.parse(storedDraft);
            if (parsedDraft.state && parsedDraft.state.draft && parsedDraft.state.draft.courseId === courseId) {
              console.log("Loaded draft from localStorage:", parsedDraft.state.draft);
              loadedDraft = parsedDraft.state.draft;
              setDraft(parsedDraft.state.draft); // Sync Zustand
            }
          } catch (e) {
            console.error("Failed to parse draft from localStorage:", e);
          }
        }
      }
      if (loadedDraft) {
        setInitialDraft(loadedDraft);
      }
      setIsFormReady(true);
    };
    loadDraft();
  }, [courseId, draft, setDraft]);

  // Set default values and reset form once
  const defaultValues = initialDraft || (existingCurriculum
    ? {
        courseId,
        modules: existingCurriculum.modules.map((module) => ({
          headingNumber: module.headingNumber,
          headingName: module.headingName,
          headingDescription: module.headingDescription,
          duration: module.duration,
          order: module.order,
          lessons: module.lessons.map((lesson) => ({
            lessonKey: lesson.lessonKey,
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
                lessonKey: uuidv4(),
                title: "",
                description: "",
                duration: "",
                videoUrl: "",
                order: 1,
              },
            ],
          },
        ],
      });

  const form = useForm<z.infer<typeof CreateCurriculumSchema>>({
    resolver: zodResolver(CreateCurriculumSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isInitialMount.current && initialDraft && !hasReset.current) {
      console.log("Resetting form with draft on initial mount:", initialDraft);
      form.reset(initialDraft);
      hasReset.current = true; // Prevent further resets
    }
  }, [initialDraft, form]);

  // Show dialog on initial mount with draft
  useEffect(() => {
    if (isInitialMount.current && initialDraft) {
      console.log("Showing dialog - Draft exists on initial mount:", initialDraft);
      setShowDialog(true);
      isInitialMount.current = false; // Prevent future triggers
    }
  }, [initialDraft]);

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules",
  });

  // Save draft on form changes
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        if (value.courseId) {
          console.log("Saving draft on change:", value);
          setDraft(value as z.infer<typeof CreateCurriculumSchema>);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setDraft, courseId]);

  const handleRemoveModule = (index: number) => {
    removeModule(index);
    const currentValues = form.getValues();
    console.log("Saving draft on remove module:", currentValues);
    setDraft(currentValues);
  };

  const handleRemoveLesson = (moduleIndex: number, lessonIndex: number) => {
    const lessons = form.getValues(`modules.${moduleIndex}.lessons`) || [];
    lessons.splice(lessonIndex, 1);
    form.setValue(`modules.${moduleIndex}.lessons`, lessons);
    const currentValues = form.getValues();
    console.log("Saving draft on remove lesson:", currentValues);
    setDraft(currentValues);
  };

  const onSubmit = async (values: z.infer<typeof CreateCurriculumSchema>) => {
    setError("");
    setSuccess("");
    console.log("Form Submission Data:", JSON.stringify(values, null, 2));

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

        console.log("Clearing draft on successful submit");
        clearDraft();
        setInitialDraft(null);
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

  const handleContinue = () => {
    if (initialDraft) {
      console.log("Continuing with draft:", initialDraft);
      form.reset(initialDraft);
    }
    setShowDialog(false);
  };

  const handleDiscard = () => {
    console.log("Discarding draft");
    clearDraft();
    setInitialDraft(null);
    form.reset({
      courseId,
      modules: existingCurriculum
        ? existingCurriculum.modules.map((module) => ({
            headingNumber: module.headingNumber,
            headingName: module.headingName,
            headingDescription: module.headingDescription,
            duration: module.duration,
            order: module.order,
            lessons: module.lessons.map((lesson) => ({
              lessonKey: lesson.lessonKey,
              title: lesson.title,
              description: lesson.description,
              duration: lesson.duration,
              videoUrl: lesson.videoUrl,
              order: lesson.order,
            })),
          }))
        : [
            {
              headingNumber: "Module 1",
              headingName: "",
              headingDescription: "",
              duration: "",
              order: 1,
              lessons: [
                {
                  lessonKey: uuidv4(),
                  title: "",
                  description: "",
                  duration: "",
                  videoUrl: "",
                  order: 1,
                },
              ],
            },
          ],
    });
    setShowDialog(false);
  };

  // Clear draft on navigation
  const handleCancel = () => {
    clearDraft();
    setInitialDraft(null);
    router.push(`/tutor/courses/${courseId}`);
  };

  if (!isFormReady) {
    return (
      <div className="space-y-6">
        {/* Simulate form header */}
        <Skeleton className="h-6 w-1/3" />
  
        {/* Module Card Skeleton */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border p-4 rounded-md space-y-4">
            <Skeleton className="h-5 w-1/4" /> {/* Module Title */}
  
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/5" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
  
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
  
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
  
            {/* Lessons Skeleton */}
            {[...Array(2)].map((_, j) => (
              <div key={j} className="pl-4 border-l space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ))}
  
        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Continue Editing?</DialogTitle>
            <DialogDescription className="text-red-700">
              It looks like you have a saved draft for this curriculum. Would you like to continue
              editing or discard it and start fresh?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDiscard} disabled={isPending}>
              Discard
            </Button>
            <Button onClick={handleContinue} disabled={isPending}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <div key={lesson.lessonKey || lessonIndex} className="border p-4 rounded-md space-y-4">
                      <h6 className="text-sm font-semibold">Lesson {lessonIndex + 1}</h6>
                      <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.lessons.${lessonIndex}.lessonKey`}
                        render={({ field }) => (
                          <FormItem className="hidden">
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                        onClick={() => handleRemoveLesson(moduleIndex, lessonIndex)}
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
                      const newLessonKey = uuidv4();
                      lessons.push({
                        lessonKey: newLessonKey,
                        title: "",
                        description: "",
                        duration: "",
                        videoUrl: "",
                        order: lessons.length + 1,
                      });
                      form.setValue(`modules.${moduleIndex}.lessons`, lessons);
                      const currentValues = form.getValues();
                      console.log("Saving draft on add lesson:", currentValues);
                      setDraft(currentValues);
                    }}
                    disabled={isPending}
                  >
                    Add Lesson
                  </Button>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={() => handleRemoveModule(moduleIndex)}
                disabled={isPending || moduleFields.length === 1}
              >
                Remove Module
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() => {
              const newLessonKey = uuidv4();
              appendModule({
                headingNumber: `Module ${moduleFields.length + 1}`,
                headingName: "",
                headingDescription: "",
                duration: "",
                order: moduleFields.length + 1,
                lessons: [
                  {
                    lessonKey: newLessonKey,
                    title: "",
                    description: "",
                    duration: "",
                    videoUrl: "",
                    order: 1,
                  },
                ],
              });
              const currentValues = form.getValues();
              console.log("Saving draft on add module:", currentValues);
              setDraft(currentValues);
            }}
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
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateCurriculumForm;