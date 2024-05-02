import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COURSES, OCCUPATION } from "@/lib/consts"
import { Drawer, DrawerClose, DrawerFooter } from "../ui/drawer"
import { Textarea } from "../ui/textarea"

export default function CourseRegisterPage() {
  return (
    <div className="flex h-full w-full flex-col dark:bg-gray-950">
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{`Register for a Course`}</h1>
              <p className="text-gray-500 dark:text-gray-400">
              {`Fill out the form below to enroll in your desired course.`}
              </p>
            </div>
            <Card>
              <CardContent className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="px-3 font-semibold">{`First Name`}</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="px-3 font-semibold">{`Last Name`}</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="px-3 font-semibold">{`Email`}</Label>
                  <Input id="email" placeholder="Enter your email address" type="email" required/>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="course" className="px-3 font-semibold">{`Course`}</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                    {COURSES.map((course, i) => (
                      <SelectGroup key={i}>
                        <SelectItem value={course.name}>{course.name}</SelectItem>
                      </SelectGroup>
                    ))}
                    </SelectContent>
                  </Select>   
                </div>
                <div className="space-y-3">
              <Label htmlFor="occupant" className="px-3 font-semibold">{`Let's Know you`}</Label>
                  <Select required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tell us a bit about yourself." />
                    </SelectTrigger>
                    <SelectContent>
                    {OCCUPATION.map((occupant, i) => (
                      <SelectGroup key={i}>
                        <SelectItem value={occupant.name}>{occupant.name}</SelectItem>
                      </SelectGroup>
                    ))}
                    </SelectContent>
                  </Select>  
                </div>

                
                <div className="space-y-2">
                 <Textarea className="h-32" placeholder="What are your expectations from this course?">
                 </Textarea>
                  
                </div>
                
              </CardContent>
              <CardFooter>
                <Drawer>
                  <DrawerFooter className="pt-2 w-full grid">
                      <Button className="w-full" type="submit">
                     {` Register`}
                      </Button>
                    <DrawerClose asChild>
                      <Button variant="outline">{`Cancel`}</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </Drawer>   
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}




