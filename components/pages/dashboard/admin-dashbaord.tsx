import {
	Activity,
	CreditCard,
	DollarSign,
	Users
} from "lucide-react"

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { formatToNaira } from "@/lib/utils"

interface Transaction {
	student: string;
	email: string;
	type: string;
	status: string;
	date: string;
	amount: number;
}

interface CoursesRevenue {
	totalAmountPerCourse: number;
	netTotalAmount: number;
	}

	interface Courses {
		totalCourses: number;
		totalRegistrationsPerCourse: number;
		netTotalRegistrations: number;
	}

	interface Tutors {
		numberOfTutors: number;
		numberOfTutorCourses: number;
		numberOfStudentsPerTutor: number;
	}
	interface Users {
		thetotalUsersExcludingTutors: number;
	}


	interface AdminDashboardData {
		coursesRevenue: CoursesRevenue;
		courses: Courses;
		tutors: Tutors;
		users: Users;
		transaction: Transaction[];
	}


	interface AdminDashboardProps {
		data: AdminDashboardData;
	}


export default function AdminDashboard({data} : AdminDashboardProps) {


	return (
		<div className="flex min-h-screen w-full flex-col">

			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">Net Total Amount</div>
							<p className="text-xs text-muted-foreground">
							{formatToNaira(data.coursesRevenue.netTotalAmount/100)}
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-1">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
							Courses
							</CardTitle>
							<CreditCard className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">Total Registration</div>
							<p className="text-xs text-muted-foreground">
							{data.courses.netTotalRegistrations}
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-2">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Tutors</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">All Tutors</div>
							<p className="text-xs text-muted-foreground">
							{data.tutors.numberOfTutors}
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-3">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Users</CardTitle>
							<Activity className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-xl font-bold">All With User Role</div>
							<p className="text-xs text-muted-foreground">
							{data.users.thetotalUsersExcludingTutors}
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card
						className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
					>
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Revenue Transactions</CardTitle>
								<CardDescription>
									Recent transactions from PalmtechnIQ.
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Student</TableHead>
						<TableHead className="hidden xl:table-column">Type</TableHead>
						<TableHead className="hidden xl:table-column">Status</TableHead>
						<TableHead className="hidden xl:table-column">Date</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.transaction.map((transaction, index) => (
						<TableRow key={index}>
							<TableCell>
								<div className="font-medium">{transaction.student}</div>
								<div className="hidden text-sm text-muted-foreground md:inline">{transaction.email}</div>
							</TableCell>
							<TableCell className="hidden xl:table-column">{transaction.type}</TableCell>
							<TableCell className="hidden xl:table-column">
								<Badge className="text-xs" variant="outline">
									{transaction.status}
								</Badge>
							</TableCell>
							<TableCell className=" md:table-cell xl:table-column">{transaction.date}</TableCell>
							<TableCell className="text-right">{formatToNaira(transaction.amount/100)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</CardContent>
	</Card>



		<Card x-chunk="dashboard-01-chunk-5">
			<CardHeader>
				<CardTitle>Stay Updated</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>TM</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
						Total Amount Per Course:
						</p>
					</div>
					<div className="ml-auto font-medium">{formatToNaira(data.coursesRevenue.totalAmountPerCourse/100)}</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/02.png" alt="Avatar" />
						<AvatarFallback>NC</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
						Total Number of Courses
						</p>
					</div>
					<div className="ml-auto font-medium">{data.courses.totalCourses}</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/03.png" alt="Avatar" />
						<AvatarFallback>RC</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
						Total Registration Per Course
						</p>
					</div>
					<div className="ml-auto font-medium">{data.courses.totalRegistrationsPerCourse}</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/04.png" alt="Avatar" />
						<AvatarFallback>TC</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
						Number of Tutor Courses
						</p>
					</div>
					<div className="ml-auto font-medium">{data.tutors.numberOfTutorCourses}</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/05.png" alt="Avatar" />
						<AvatarFallback>ST</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
						Number of Students Per Tutor
						</p>
					</div>
					<div className="ml-auto font-medium">{data.tutors.numberOfStudentsPerTutor}</div>
				</div>
			</CardContent>
		</Card>
		</div>
		</main>
		</div>
		)
}

