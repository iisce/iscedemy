// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useToast } from "@/components/ui/use-toast"
// import { enrollInCourse } from "@/actions/enroll"

// const formSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   phone: z.string().min(10, { message: "Please enter a valid phone number" }),
// })

// export function EnrollmentForm({ courseId, programType }: { courseId: string; programType: string }) {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//   })

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true)

//     try {
//       const result = await enrollInCourse({
//         courseId,
//         studentName: values.name,
//         studentEmail: values.email,
//         studentPhone: values.phone,
//         programType,
//       })

//       if (result.success) {
//         toast({
//           title: "Enrollment Successful!",
//           description: "You've been enrolled in the course. Check your email for details.",
//         })
//         form.reset()
//       } else {
//         toast({
//           title: "Enrollment Failed",
//           description: result.error || "There was an error processing your enrollment. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Enrollment Failed",
//         description: "There was an error processing your enrollment. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="John Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="john@example.com" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="+234 800 000 0000" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isSubmitting}>
//           {isSubmitting ? "Processing..." : "Enroll Now"}
//         </Button>
//       </form>
//     </Form>
//   )
// }
