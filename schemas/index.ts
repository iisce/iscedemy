import { extractVideoId } from "@/lib/utils";
import * as z from "zod";

export const LoginSchema = z.object({
     email: z.string().email({
          message: "Email is required",
     }),
     password: z.string().min(1, {
          message: "Password is required",
     }),
});

export const NewPasswordSchema = z.object({
     password: z.string().min(6, {
          message: "Minimum of 6 character required!",
     }),
});

export const ResetSchema = z.object({
     email: z.string().email({
          message: "Email is required",
     }),
});

export const SubscribeSchema = z.object({
     email: z.string().email({
          message: "Email is required",
     }),
});

export const RegisterSchema = z.object({
     email: z.string().email({
          message: "Email is required",
     }),
     password: z.string().min(6, {
          message: "Minimum 6 character required",
     }),
     name: z.string().min(1, {
          message: "Name is required",
     }),
     phone: z
          .string()
          .min(1, {
               message: "Phone number is required",
          })
          .regex(
               /^(0|\+?234)?[789][01]\d{8}$/,
               "Phone format (+2348012345678/08012345678)",
          ),
});

export const CourseRegisterSchema = z.object({
     firstname: z.string().min(1, {
          message: "Firstname is required",
     }),

     lastname: z.string().min(1, {
          message: "Lastname is required",
     }),

     email: z.string().email({
          message: "Email is required",
     }),

     course: z
          .string({
               required_error: "Please select at least 1 course!",
          })
          .refine(
               (value) =>
                    [
                         "Web Development",
                         "CyberSecurity",
                         "Graphic Design",
                         "UI/UX Design",
                         "Mobile Development",
                         "Project Management",
                         "Smart-home Automation",
                         "Digital Marketing",
                    ].includes(value),
               {
                    message: "Invalid course selected!",
               },
          ),

     occupation: z
          .string({
               required_error: "Please select at least 1 category!",
          })
          .refine(
               (value) =>
                    [
                         "I am an undergraduate looking to improve my soft skill.",
                         "I am graduate looking to learn new/improve my soft skill.",
                         "I am a secondary school student ready to start a career in tech.",
                         "Employed and looking to upscale my soft skill.",
                         "Unemployed and looking to learn new soft skill.",
                    ].includes(value),
               {
                    message: "Invalid occupation!",
               },
          ),
     expectations: z.string(),
     type: z
          .string({
               required_error: "Please select at least 1 category!",
          })
          .refine((value) => ["Virtual", "Physical"].includes(value), {
               message: "Invalid selection!",
          }),

     phone: z
          .string({
               required_error: "Phone number is required",
          })
          .max(11, "Rating cannot exceed 11"),
});

export const TutorRegisterSchema = z.object({
     fullname: z.string().min(1, {
          message: "Fullname is required",
     }),

     email: z.string().email({
          message: "Email is required",
     }),

     course: z.string({
          required_error: "Please select a course!",
     }),

     phone: z
          .string({
               required_error: "Phone number is required",
          })
          .max(11, "Rating cannot exceed 11"),

     uploadcv: z.string({
          required_error: "Upload CV is required",
     }),

     coverletter: z
          .string({
               required_error: "Cover letter is required",
          })
          .max(200, "Rating cannot exceed 200"),
});

export const PurchaseCourseSchema = z.object({
     userId: z.string(),
     courseId: z.string({
          required_error: "Please select at least 1 course!",
     }),
     type: z.enum(["Physical", "Virtual"]),
     includeCertificate: z.boolean().optional().default(true),
});

export const ReviewSchema = z.object({
     tutorName: z.string({
          required_error: "Tutor name is required",
     }),

     reviewerName: z.string(),

     reviewerId: z.string(),

     rating: z
          .number({
               required_error: "Rating is required",
          })
          .min(1, "Rating must be at least 1")
          .max(5, "Rating cannot exceed 5"),

     title: z.string().min(1, {
          message: "Title is required",
     }),

     description: z.string().min(10, {
          message: "Description must be at least 10 characters long",
     }),
     courseId: z.string().min(1, "Course ID is required"),
});

export const UpdateReviewSchema = z.object({
     id: z.string().optional(),
     rating: z
          .number({
               required_error: "Rating is required",
          })
          .min(1, "Rating must be at least 1")
          .max(5, "Rating cannot exceed 5"),
     title: z.string().min(1, {
          message: "Title is required",
     }),
     description: z.string().min(10, {
          message: "Description must be at least 10 characters long",
     }),
});

export const UpdateCourseSchema = z.object({
     id: z.string().min(1, "Course ID is required"),
     title: z.string().min(3, "Title must be at least 3 characters"),
     textSnippet: z
          .string()
          .min(10, "Header text must be at least 10 characters"),
     description: z
          .string()
          .min(20, "Description must be at least 20 characters"),
     conclusion: z
          .string()
          .min(10, "Conclusion must be at least 10 characters"),
     summary: z.string().min(10, "Summary must be at least 10 characters"),
     programType: z
          .enum(["CRASH_COURSE", "THREE_MONTHS", "SIX_MONTHS"])
          .optional(),
     duration: z.string().min(1, "Duration is required").optional(),
     category: z.string().min(1, "Category is required").optional(),
     videoUrl: z
          .string()
          .optional()
          .nullable()
          .transform((url) => {
               console.log("Raw videoUrl:", url);
               return url ? url : undefined;
          })
          .refine(
               (url) => {
                    if (!url) return true;
                    if (url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
                         console.log("videoUrl is already a video ID:", url);
                         return true;
                    }
                    const videoId = extractVideoId(url);
                    console.log("Extracted videoId:", videoId);
                    return !!videoId;
               },
               {
                    message: "Please provide a valid YouTube video URL",
                    path: ["videoUrl"],
               },
          ),
     noOfClass: z.string().min(1, "Number of classes is required").optional(),
     classDays: z.string().min(1, "Class days are required").optional(),
     certificate: z.boolean().optional(),
     overView: z.string().optional(),
     image: z.string().optional(),
});

export const CreateCourseSchema = z.object({
     title: z.string().min(3, "Ttitle must be at least 3 characters"),
     textSnippet: z
          .string()
          .min(10, "Header text must be at least 10 characters"),
     description: z
          .string()
          .min(20, "Description must be at least 20 characters"),
     conclusion: z
          .string()
          .min(10, "Conclusion must be at least 10 characters"),
     summary: z.string().min(10, "Summary must be at least 10 characters"),
     programType: z.enum(["CRASH_COURSE", "THREE_MONTHS", "SIX_MONTHS"]),
     duration: z.string().min(1, "Duration is required"),
     category: z.string().min(1, "Category is required"),
     videoUrl: z
          .string()
          .min(1, "Video URL is required")
          .refine((url) => !!extractVideoId(url), {
               message: "Please provide a valid YouTube video URL",
               path: ["videoUrl"],
          })
          .transform((url) => extractVideoId(url) || url),
     noOfClass: z.string().min(1, "Number of classes is required"),
     classDays: z.string().min(1, "Class days are required"),
     certificate: z.boolean(),
     overView: z.string().optional(),
     lessonKey: z.string().optional(),
     image: z.string().optional(),
     tutorId: z.string().min(1, "Tutor ID is required"),
});

export const CreateCurriculumSchema = z.object({
     courseId: z.string().min(1, "Course ID is required"),
     modules: z.array(
          z.object({
               headingNumber: z.string().min(1, "Heading number is required"),
               headingName: z
                    .string()
                    .min(1, "Module heading name is required"),
               headingDescription: z
                    .string()
                    .min(1, "Module heading description is required"),
               duration: z.string().min(1, "Duration is required"),
               order: z.number().min(1, "Order must be a positive number"),
               lessons: z.array(
                    z.object({
                         lessonKey: z.string().min(1, "Lesson key is required"),
                         title: z.string().min(1, "Lesson title is required"),
                         description: z.string().optional(),
                         duration: z.string().min(1, "Duration is required"),
                         videoUrl: z.string().optional(),
                         order: z
                              .number()
                              .min(1, "Order must be a positive number"),
                    }),
               ),
          }),
     ),
});

export const AssignmentSchema = z.object({
     title: z.string().min(1, "Title is required"),
     description: z.string().min(1, "Description is required"),
     dueDate: z.string().optional(),
});

export const SubmissionSchema = z.object({
     content: z.string().min(1, "Submission content is required"),
     fileUrl: z.string().url("Must be a valid URL").optional(),
});

export const AssignmentReviewSchema = z.object({
     grade: z.string().min(1, "Grade is required"),
     feedback: z.string().optional(),
});

export const MentorshipSchema = z.object({
     scheduledAt: z.string().min(1, "Scheduled date and time are required"),
     duration: z
          .number()
          .min(15, "Duration must be at least 15 minutes")
          .max(120, "Duration cannot exceed 120 minutes"),
     topic: z.string().min(1, "Topic is required"),
     meetingUrl: z.string().url("Must be a valid URL").optional(),
});

export const CompletionSchema = z.object({
     notes: z.string().optional(),
});

export const UpdateProfileSchema = z.object({
     name: z
          .string()
          .min(2, "Name must be at least 2 characters")
          .max(50, "Name must be less than 50 characters"),
});

export const AwarenessProgramSchema = z.object({
     fullName: z
          .string()
          .min(2, { message: "Name must be at least 2 characters" }),
     age: z.string().refine(
          (val) => {
               const num = Number.parseInt(val);
               return num >= 14 && num <= 100;
          },
          { message: "Age must be between 16 and 100" },
     ),
     dateOfBirth: z.string().nonempty({ message: "Date of birth is required" }),
     phoneNumber: z
          .string()
          .regex(/^\+?[1-9][\d]{0,15}$/, { message: "Invalid phone number" }),
     email: z.string().email({ message: "Invalid email address" }),
     industry: z.string().optional(),
     goals: z.string().optional(),
});
