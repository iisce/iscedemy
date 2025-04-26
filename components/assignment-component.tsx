import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Upload, CheckCircle, Clock } from "lucide-react"

interface CourseAssignmentsProps {
  courseId: string;
  programType: "crash" | "six-month" | "other"; // Adjust the union type as needed
}

export function CourseAssignments({ courseId, programType }: CourseAssignmentsProps) {
  // This would typically come from your database
  const assignments = [
    {
      id: "1",
      title: "Getting Started Project",
      description: "Create your first project to demonstrate basic understanding",
      dueDate: "2023-12-15",
      status: "completed" as "completed" | "pending" | "not-started",
    },
    {
      id: "2",
      title: "Mid-term Assignment",
      description: "Apply the concepts learned in the first half of the course",
      dueDate: "2024-01-15",
      status: "pending" as "completed" | "pending" | "not-started",
    },
  ]

  // Additional assignments for longer programs
  const advancedAssignments =
    programType !== "crash"
      ? [
          {
            id: "3",
            title: "Group Collaboration Project",
            description: "Work with peers to solve a complex problem",
            dueDate: "2024-02-15",
            status: "not-started" as "completed" | "pending" | "not-started",
          },
          {
            id: "4",
            title: "Case Study Analysis",
            description: "Analyze a real-world scenario and propose solutions",
            dueDate: "2024-03-01",
            status: "not-started",
          },
        ]
      : []

  // Even more assignments for 6-month programs
  const expertAssignments =
    programType === "six-month"
      ? [
          {
            id: "5",
            title: "Industry Partner Project",
            description: "Work on a real project with our industry partners",
            dueDate: "2024-04-15",
            status: "not-started",
          },
          {
            id: "6",
            title: "Capstone Project",
            description: "Final comprehensive project showcasing all your skills",
            dueDate: "2024-06-01",
            status: "not-started",
          },
        ]
      : []

  const allAssignments = [...assignments, ...advancedAssignments, ...expertAssignments]

  const getStatusBadge = (status: "completed" | "pending" | "not-started") => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Assignments & Projects</h2>
      <p className="text-muted-foreground">
        Complete these assignments to apply what you've learned and build your portfolio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
                {getStatusBadge(assignment.status)}
              </div>
              <CardDescription>{assignment.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            </CardContent>
            <CardFooter>
              {assignment.status === "completed" ? (
                <Button variant="outline" className="w-full" disabled>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Completed
                </Button>
              ) : assignment.status === "pending" ? (
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Assignment
                </Button>
              ) : (
                <Button variant="outline" className="w-full">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
