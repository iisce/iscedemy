import * as z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
});
export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Minimum of 6 character required!',
	}),
});
export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});
export const SubscribeSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});
export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {
		message: 'Minimum 6 character required',
	}),
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	phone: z
		.string()
		.min(1, {
			message: 'Phone number is required',
		})
		.regex(
			/^(0|\+?234)?[789][01]\d{8}$/,
			'Phone format (+2348012345678/08012345678)'
		),
});
export const CourseRegisterSchema = z.object({
	firstname: z.string().min(1, {
		message: 'Firstname is required',
	}),

	lastname: z.string().min(1, {
		message: 'Lastname is required',
	}),

	email: z.string().email({
		message: 'Email is required',
	}),

	course: z
		.string({
			required_error: 'Please select at least 1 course!',
		})
		.refine(
			(value) =>
				[
					'Web Development',
					'CyberSecurity',
					'Graphic Design',
					'UI/UX Design',
					'Mobile Development',
					'Project Management',
					'Smart-home Automation',
					'Digital Marketing',
				].includes(value),
			{
				message: 'Invalid course selected!',
			}
		),

	occupation: z
		.string({
			required_error: 'Please select at least 1 category!',
		})
		.refine(
			(value) =>
				[
					'I am an undergraduate looking to improve my soft skill.',
					'I am graduate looking to learn new/improve my soft skill.',
					'I am a secondary school student ready to start a career in tech.',
					'Employed and looking to upscale my soft skill.',
					'Unemployed and looking to learn new soft skill.',
				].includes(value),
			{
				message: 'Invalid occupation!',
			}
		),
	expectations: z.string(),
	type: z
		.string({
			required_error: 'Please select at least 1 category!',
		})
		.refine((value) => ['Virtual', 'Physical'].includes(value), {
			message: 'Invalid selection!',
		}),

	phone: z
		.string({
			required_error: 'Phone number is required',
		})
		.max(11, 'Rating cannot exceed 11'),
});
export const PurchaseCourseSchema = z.object({
	userId: z.string(),
	courseId: z.string({
		required_error: 'Please select at least 1 course!',
	}),
	type: z.string({
		required_error: 'Please select at least 1 category!',
	}),
});

export const ReviewSchema = z.object({
	tutorName: z.string({
		required_error: 'Tutor name is required',
	}),

	reviewerName: z.string(),

	reviewerId: z.string(),

	rating: z
		.number({
			required_error: 'Rating is required',
		})
		.min(1, 'Rating must be at least 1')
		.max(5, 'Rating cannot exceed 5'),

	title: z.string().min(1, {
		message: 'Title is required',
	}),

	description: z.string().min(10, {
		message: 'Description must be at least 10 characters long',
	}),
});

export const UpdateReviewSchema = z.object({
	id: z.string().optional(),
	rating: z
		.number({
			required_error: 'Rating is required',
		})
		.min(1, 'Rating must be at least 1')
		.max(5, 'Rating cannot exceed 5'),
	title: z.string().min(1, {
		message: 'Title is required',
	}),
	description: z.string().min(10, {
		message: 'Description must be at least 10 characters long',
	}),
});
export const UpdateCourseSchema = z.object({
	id: z.string(),
	title: z.string().min(1, 'Title is required'),
	textSnippet: z.string().min(1, 'Text Snippet is required'),
	description: z.string().min(1, 'Description is required'),
	conclusion: z.string().min(1, 'Conclusion is required'),
	summary: z.string().min(1, 'Summary is required'),
  });
