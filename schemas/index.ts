import * as z from 'zod'

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

    course: z.string({
        required_error: "Please select at least 1 course!",
    })
        .refine(
            (value) => ['Web Development', 'CyberSecurity', 'Graphic Design', 'UI/UX Design', 'Mobile Development', 'Project Management','Smart-home Automation', 'Digital Marketing'].includes(value),
            {
                message: "Invalid course selected!",
            }
    ),

    occupation: z.string({
        required_error: "Please select at least 1 category!",
    })
        .refine(
            (value) => ['I am an undergraduate looking to improve my soft skill.',
             'I am graduate looking to learn new/improve my soft skill.', 
             'I am a secondary school student ready to start a career in tech.', 
             'Employed and looking to upscale my soft skill.', 
             'Unemployed and looking to learn new soft skill.', 
             ].includes(value),
            {
                message: "Invalid occupation!",
            }
    ),
    expectations: z.string(),
    
    
});
