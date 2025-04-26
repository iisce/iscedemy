"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, Video, Users } from "lucide-react"
interface CourseAssignmentsProps {
    courseId: string;
    programType: "crash" | "six-month" | "other"; // Adjust the union type as needed
  }

export function CourseMentorship({ courseId, programType } : CourseAssignmentsProps) {
  const [date, setDate] = useState(new Date())

  // This would typically come from your database
  const mentors = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Developer",
      avatar: "/diverse-group-city.png",
      bio: "Sarah has 10+ years of experience in web development and has worked with companies like Google and Microsoft.",
      expertise: ["React", "Node.js", "AWS"],
      availability: ["Monday", "Wednesday", "Friday"],
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "UX Designer",
      avatar: "/diverse-group-city.png",
      bio: "Michael specializes in user experience design with a focus on mobile applications and responsive web design.",
      expertise: ["UI/UX", "Figma", "User Research"],
      availability: ["Tuesday", "Thursday"],
    },
  ]

  // Additional mentors for 6-month programs
  const additionalMentors =
    programType === "six-month"
      ? [
          {
            id: "3",
            name: "Jessica Williams",
            role: "Product Manager",
            avatar: "/diverse-group-city.png",
            bio: "Jessica has led product teams at several startups and specializes in bringing products from concept to market.",
            expertise: ["Product Strategy", "Agile", "Go-to-Market"],
            availability: ["Monday", "Friday"],
          },
        ]
      : []

  const allMentors = [...mentors, ...additionalMentors]

  // This would typically come from your database
  const upcomingSessions = [
    {
      id: "1",
      title: "1:1 Mentorship Session",
      mentor: "Sarah Johnson",
      date: "2023-12-10T14:00:00",
      type: "video",
    },
    {
      id: "2",
      title: "Group Q&A Session",
      mentor: "Michael Chen",
      date: "2023-12-15T16:00:00",
      type: "group",
    },
  ]

  return (
    <div className="space-y-8">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Session</TabsTrigger>
          <TabsTrigger value="mentors">Your Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Upcoming Mentorship Sessions</h2>

            {upcomingSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{session.title}</CardTitle>
                      <CardDescription>with {session.mentor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm mb-2">
                        <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                        {new Date(session.date).toLocaleDateString()} at{" "}
                        {new Date(session.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      <div className="flex items-center text-sm">
                        {session.type === "video" ? (
                          <>
                            <Video className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Video Call</span>
                          </>
                        ) : (
                          <>
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>Group Session</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Session</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-center text-muted-foreground">
                    You don't have any upcoming mentorship sessions.
                    <br />
                    Schedule a session to get started.
                  </p>
                  <Button className="mt-4">Schedule Session</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
              <Card>
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => day && setDate(day)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
              {date ? (
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        9:00 AM
                      </Button>
                      <Button variant="outline" className="justify-start">
                        10:00 AM
                      </Button>
                      <Button variant="outline" className="justify-start">
                        11:00 AM
                      </Button>
                      <Button variant="outline" className="justify-start">
                        1:00 PM
                      </Button>
                      <Button variant="outline" className="justify-start">
                        2:00 PM
                      </Button>
                      <Button variant="outline" className="justify-start">
                        3:00 PM
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Session</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      Please select a date to view available time slots.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mentors">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Mentors</h2>
            <p className="text-muted-foreground">
              These experienced professionals are here to guide you through your learning journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allMentors.map((mentor) => (
                <Card key={mentor.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{mentor.bio}</p>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Available On</h4>
                      <p className="text-sm text-muted-foreground">{mentor.availability.join(", ")}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="flex-1">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
