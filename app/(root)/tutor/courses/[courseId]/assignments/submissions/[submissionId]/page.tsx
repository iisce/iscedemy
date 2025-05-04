interface IAssignmentSubmissionPageProps{
    params: {courseId: string, submissionId: string}
}

import { auth } from '@/auth';
import SubmissionReviewForm from '@/components/component/forms/submission-review-form';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AssignementSubmisionPage({params}: IAssignmentSubmissionPageProps) {
    const {courseId, submissionId} = params;

    const session = await auth();
    if(!session) {
        redirect('/login');
    }

    if (session.user.role !== 'TUTOR'){
        redirect('/login');
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId, tutorId: session.user.id
        },
    })

    if(!course){
        redirect('/tutor');
    }

    const submission = await db.projectSubmission.findUnique({
        where: {id: submissionId},
        include: {
            user: true,
            project: {
                include: {
                    course: true
                },
            },
        },
    });

    if(!submission || submission.project.courseId !== courseId){
        redirect(`/tutor/courses/${courseId}`);
    } 

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Submission Details for {submission.project.title}</h1>
      <div className="mb-6">
      <Button asChild variant="outline">
        <Link href={`/tutor/courses/${courseId}`}>
          Back to Course
        </Link>
        </Button>
      </div>
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold">{submission.user.name}</h3>
        <p className="text-muted-foreground">Submitted on: {new Date(submission.submittedAt).toLocaleDateString()}</p>
        <p className="mt-2">{submission.content}</p>
        {submission.fileUrl && (
          <p>
            File: <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">{submission.fileUrl}</a>
          </p>
        )}
        {submission.grade && <p>Grade: {submission.grade}%</p>}
        {submission.feedback && <p>Feedback: {submission.feedback}</p>}
        <div className="mt-4">
          <SubmissionReviewForm submissionId={submission.id} initialGrade={submission.grade} initialFeedback={submission.feedback} />
        </div>
      </div>
    </div>
  )
}
