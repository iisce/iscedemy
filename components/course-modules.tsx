"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Circle, PlayCircle, FileText } from "lucide-react"
import { markLessonComplete } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

export function CourseModules({ modules, courseId, completedLessons }) {
  const [expandedModule, setExpandedModule] = useState(modules[0]?.id || "")
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)
  const { toast } = useToast()

  const completedLessonIds = completedLessons.map((cl) => cl.lessonId)

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson)
  }

  const handleMarkComplete = async () => {
    if (!selectedLesson || isMarkingComplete) return

    setIsMarkingComplete(true)

    try {
      const result = await markLessonComplete(selectedLesson.id, "user_id", courseId)

      if (result.success) {
        toast({
          title: "Lesson Completed!",
          description: `You've completed "${selectedLesson.title}". Your progress has been updated.`,
        })

        // Add the lesson to completed lessons
        completedLessonIds.push(selectedLesson.id)
      } else {
        toast({
          title: "Error",
          description: "Failed to mark lesson as complete. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMarkingComplete(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        <Accordion
          type="single"
          collapsible
          value={expandedModule}
          onValueChange={setExpandedModule}
          className="w-full"
        >
          {modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="text-base font-medium">
                Module {index + 1}: {module.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {module.lessons.map((lesson) => {
                    const isCompleted = completedLessonIds.includes(lesson.id)

                    return (
                      <li
                        key={lesson.id}
                        className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                          selectedLesson?.id === lesson.id ? "bg-primary/10" : "hover:bg-muted"
                        }`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <span className={isCompleted ? "text-primary font-medium" : ""}>{lesson.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{lesson.duration || "15 min"}</span>
                      </li>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="md:col-span-2">
        {selectedLesson ? (
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              {selectedLesson.videoUrl ? (
                <iframe src={selectedLesson.videoUrl} className="w-full h-full rounded-lg" allowFullScreen />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <PlayCircle className="h-16 w-16 mb-2" />
                  <p>Video content will be available soon</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
              <div className="prose max-w-none">
                {selectedLesson.content ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
                ) : (
                  <p>Content for this lesson will be available soon.</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{selectedLesson.duration || "15 min"} lesson</span>
              </div>

              <Button
                onClick={handleMarkComplete}
                disabled={isMarkingComplete || completedLessonIds.includes(selectedLesson.id)}
              >
                {completedLessonIds.includes(selectedLesson.id) ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 h-[400px] text-center">
            <FileText className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Select a Lesson</h3>
            <p className="text-muted-foreground">Choose a lesson from the curriculum to start learning</p>
          </Card>
        )}
      </div>
    </div>
  )
}
