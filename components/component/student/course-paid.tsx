import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Curriculum } from "@prisma/client";
import { BookIcon } from "lucide-react";
import Link from "next/link";

export function CoursePaid({
    title,
    curriculum,
}: {
    title: string;
    curriculum?: Curriculum[];
}) {
    return (
         <Card>
              <CardContent>
                   <div className="my-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold capitalize">
                             {title.split("-").join(" ")}
                        </h3>
                   </div>
                   <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" asChild>
                             <Link href={`/courses/${title}?tab=curriculum`}>
                                  Resume
                             </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                             <BookIcon className="h-4 w-4 text-gray-500" />
                             <span className="text-gray-500">
                                  {curriculum?.length} lessons
                             </span>
                        </div>
                   </div>
              </CardContent>
         </Card>
    );
}