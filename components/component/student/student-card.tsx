import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

export function CourseCard({
	badgeText,
	courseId,
	courseSlug,
	courseTitle,
	courseDescription,
	timeLeft,
	duration,
	isBought,
}: {
	badgeText?: string;
	timeLeft: string;
	duration: string;
	courseTitle: string;
	courseDescription: string;
	courseId?: string;
	courseSlug: string;
	isBought?: boolean;
}) {
	return (
		<Card>
			<CardContent>
				<div className="my-4 flex items-center justify-between">
					<Badge variant='greenTeal'>{badgeText}</Badge>
					<div className="text-gray-500">{timeLeft}</div>
				</div>
				<h3 className="mb-2 text-xl font-bold capitalize">
					{courseTitle}
				</h3>
				<p className="mb-4 line-clamp-2 text-gray-500">
					{courseDescription}
				</p>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<ClockIcon className="h-4 w-4 text-gray-500" />
						<span className="text-gray-500">{duration}</span>
					</div>

						{!isBought && (
						<Button asChild size="sm">
							<Link href={`/courses/${courseSlug}/pay`}>
								Enroll
							</Link>
						</Button>


					)}
				</div>
			</CardContent>
		</Card>
	);
}
