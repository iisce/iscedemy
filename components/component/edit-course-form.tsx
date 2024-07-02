import { updateCourse } from "@/actions/course";
import { UpdateCourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";

interface EditCourseFormProps {
    course: Course;
    setIsEditing: (isEditing: boolean) => void;
  }

  const EditCourseForm: React.FC<EditCourseFormProps> = ({
    course,
    setIsEditing
  }) => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();
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
        },
    });

    const onSubmit = (values: z.infer<typeof UpdateCourseSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            updateCourse(values)
            .then((data) => {
                if (data?.error) {
                    setError(data.error);
                } else {
                    form.reset();
                    setSuccess('Course updated successfully')
                    toast.success('Course updated successfully');
                    setIsEditing(false);
                }
            })
            .catch((error) => {
              console.error("Error during update:", error);
              setError('Ughrr! Something went wrong! Try again')
          
          })
        });
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                  {...field} 
                  placeholder='Course Title' 
                  disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='textSnippet'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                  {...field} 
                  placeholder='Header Text' 
                  disabled={isPending} 
                  className=" overflow-y-scroll h-32 break-all"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                  {...field} 
                  placeholder='Description' 
                  disabled={isPending} 
                  className=" overflow-y-scroll h-32 break-all"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='conclusion'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                  {...field} 
                  placeholder='Conclusion' 
                  disabled={isPending} 
                  className=" overflow-y-scroll h-32 break-all"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='summary'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                  {...field} 
                  placeholder='Summary' 
                  disabled={isPending} 
                  className=" overflow-y-scroll h-32 break-words "/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormError message={error} />
          <FormSuccess message={success} />
  
          <div className='grid'>
            <Button disabled={isPending} type='submit'>
              {isPending ? (
                <LoaderIcon className='animate-spin' />
              ) : (
                'Update Course'
              )}
            </Button>
          </div>
        </form>
      </Form>
    );
  };
export default EditCourseForm;
