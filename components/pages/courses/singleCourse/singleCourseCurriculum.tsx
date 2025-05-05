'use client';
import YouTubePlayer from '@/components/shared/youtube-player';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ISingleCourseCurriculumProps } from '@/lib/types';
import { extractVideoId } from '@/lib/utils';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import { LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SingleCourseCurriculum({ modules, progress }: ISingleCourseCurriculumProps) {
	const router = useRouter();
	const [watchedLessons, setWatchedLessons] = useState<string[]>(progress.filter(p => p.completed).map(p => p.lessonId));
	const [activePlayers, setActivePlayers] = useState<string[]>([]); // Track lessons with visible YouTube players

	const markLessonAsCompleted = async (lessonId: string) => {
		try {
			const response = await fetch('/api/lesson-progress/mark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ lessonId }),
			});

			if (response.ok) {
				setWatchedLessons(prev => [...prev, lessonId]);
				router.refresh(); 
			} else {
				console.error('Failed to mark lesson as completed:', response.statusText);
			}
		} catch (error) {
			console.error('Error marking lesson as completed:', error);
		}
	};

	const togglePlayer = (lessonId: string) => {
		setActivePlayers(prev =>
			prev.includes(lessonId)
				? prev.filter(id => id !== lessonId)
				: [...prev, lessonId]
		);
	};

	const sortedModules = [...modules].sort((a, b) => a.order - b.order);

	const isModuleLocked = (moduleIndex: number) => {
		if (moduleIndex === 0) return false;

		const previousModule = sortedModules[moduleIndex - 1];
		const previousModuleLessons = previousModule.lessons;
		return !previousModuleLessons.every(lesson => watchedLessons.includes(lesson.id));
	};

	const isLessonLocked = (moduleIndex: number, lessonIndex: number) => {
		if (isModuleLocked(moduleIndex)) return true; 
		const currentModule = sortedModules[moduleIndex];
		const lessons = [...currentModule.lessons].sort((a, b) => a.order - b.order);

		if (lessonIndex === 0) return false; 

		const previousLesson = lessons[lessonIndex - 1];
		return !watchedLessons.includes(previousLesson.id);
	};

	return (
		<div className="grid gap-4">
			<Accordion type="single" collapsible className="w-full">
				{sortedModules.map((module, moduleIndex) => {
					const moduleProgress = module.lessons.filter(lesson =>
						watchedLessons.includes(lesson.id)
					).length;
					const totalLessons = module.lessons.length;
					const progressPercentage = totalLessons > 0 ? (moduleProgress / totalLessons) * 100 : 0;
					const moduleLocked = isModuleLocked(moduleIndex);

					return (
						<AccordionItem key={module.id} value={module.id}>
							<AccordionTrigger className="text-left">
								<div className="flex items-center justify-between w-full pr-4">
									<div className="flex items-center gap-2">
										{moduleLocked && <LockIcon className="w-4 h-4 text-gray-500" />}
										<span>{module.headingName}</span>
									</div>
									<div className="flex items-center gap-2">
										<Badge variant="secondary">{`${moduleProgress}/${totalLessons} Lessons`}</Badge>
										<Progress value={progressPercentage} className="w-24" />
									</div>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<Card>
									<CardContent className="pt-6">
										<div className="space-y-4">
											<p className="text-sm text-gray-600">{module.headingDescription}</p>
											<div className="space-y-2">
												{[...module.lessons]
													.sort((a, b) => a.order - b.order)
													.map((lesson, lessonIndex) => {
														const isCompleted = watchedLessons.includes(lesson.id);
														const lessonLocked = isLessonLocked(moduleIndex, lessonIndex);
														const videoId = extractVideoId(lesson.videoUrl);
														const isPlayerActive = activePlayers.includes(lesson.id);

														if (!videoId) {
															return (
																<div
																	key={lesson.id}
																	className="flex items-center justify-between p-2 border rounded-md"
																>
																	<div className="flex items-center gap-2">
																		<PlayCircleIcon className="w-4 h-4 text-gray-500" />
																		<div>
																			<p className="text-sm font-medium">{lesson.title}</p>
																			<p className="text-xs text-gray-500">{lesson.duration}</p>
																		</div>
																	</div>
																	<Badge variant="destructive">Video Unavailable</Badge>
																</div>
															);
														}
														return (
															<div
																key={lesson.id}
																className="p-2 border rounded-md"
															>
																<div className="mb-2">
																	<div className="flex items-center gap-2">
																		{lessonLocked ? (
																			<TooltipProvider>
																				<Tooltip>
																					<TooltipTrigger>
																						<LockIcon className="w-4 h-4 text-gray-500" />
																					</TooltipTrigger>
																					<TooltipContent>
																						{lessonIndex === 0
																							? "Complete all lessons in the previous module to unlock"
																							: "Complete the previous lesson to unlock"}
																					</TooltipContent>
																				</Tooltip>
																			</TooltipProvider>
																		) : (
																			<PlayCircleIcon className="w-4 h-4 text-green-500" />
																		)}
																		<div>
																			<p className="text-sm font-medium">{lesson.title}</p>
																			<p className="text-xs text-gray-500">{lesson.duration}</p>
																			{!lessonLocked && isCompleted && (
																				<Badge variant="greenTeal" className="mt-1">
																					Completed
																				</Badge>
																			)}
																		</div>
																	</div>
																</div>
																{!lessonLocked && (
																	<div className="w-full">
																		{isPlayerActive ? (
																			<YouTubePlayer
																				videoId={videoId}
																				lessonId={lesson.id}
																				onVideoEnd={markLessonAsCompleted}
																			/>
																		) : (
																			<Button
																				variant="outline"
																				size="sm"
																				onClick={() => togglePlayer(lesson.id)}
																				className="w-full"
																			>
																				{isCompleted ? "Watch Lesson Again" : "Take This Lesson"}
																			</Button>
																		)}
																	</div>
																)}
															</div>
														);
													})}
											</div>
										</div>
									</CardContent>
								</Card>
							</AccordionContent>
						</AccordionItem>
					);
				})}
			</Accordion>
		</div>
	);
}