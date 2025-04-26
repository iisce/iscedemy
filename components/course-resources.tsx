import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, ExternalLink, Book, Video } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CourseResources({ courseId, programType }) {
  // This would typically come from your database
  const resources = [
    {
      id: "1",
      title: "Course Syllabus",
      description: "Complete syllabus for the course",
      type: "pdf",
      url: "#",
    },
    {
      id: "2",
      title: "Recommended Reading",
      description: "Books and articles to supplement your learning",
      type: "link",
      url: "#",
    },
    {
      id: "3",
      title: "Cheat Sheet",
      description: "Quick reference guide for key concepts",
      type: "pdf",
      url: "#",
    },
  ]

  // Additional resources for longer programs
  const advancedResources =
    programType !== "crash"
      ? [
          {
            id: "4",
            title: "Industry Case Studies",
            description: "Real-world examples and analysis",
            type: "pdf",
            url: "#",
          },
          {
            id: "5",
            title: "Interview Preparation Guide",
            description: "Prepare for job interviews in this field",
            type: "pdf",
            url: "#",
          },
        ]
      : []

  // Even more resources for 6-month programs
  const expertResources =
    programType === "six-month"
      ? [
          {
            id: "6",
            title: "Advanced Techniques Workshop",
            description: "Recorded workshop with industry experts",
            type: "video",
            url: "#",
          },
          {
            id: "7",
            title: "Career Transition Playbook",
            description: "Step-by-step guide to changing careers",
            type: "pdf",
            url: "#",
          },
        ]
      : []

  const allResources = [...resources, ...advancedResources, ...expertResources]

  const getResourceIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6" />
      case "link":
        return <ExternalLink className="h-6 w-6" />
      case "video":
        return <Video className="h-6 w-6" />
      default:
        return <Book className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Course Resources</h2>
      <p className="text-muted-foreground">Access supplementary materials to enhance your learning experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="flex flex-row items-start space-y-0 pb-2">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-full">{getResourceIcon(resource.type)}</div>
                <div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.type === "link" ? (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Resource
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </>
                  )}
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
