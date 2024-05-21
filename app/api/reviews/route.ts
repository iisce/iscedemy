import { db } from '@/lib/db';
import { ReviewSchema } from '@/schemas';
import { useSession } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(request: Request) {
  try {
    const tutorName = new URL(request.url).searchParams.get('tutorName');
    if (!tutorName) {
      return new NextResponse("Tutor name is required", { status: 400 });
    }

    const reviews = await db.review.findMany({
      where: { tutorName },
      orderBy: { createdAt: 'desc' }, // Order by newest reviews first
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new NextResponse("Error fetching reviews", { status: 500 });
  }
}

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { tutorName, reviewerName, rating, title, description } = ReviewSchema.parse(body);

    if (!reviewerName) {
        return new NextResponse("Reviewer name is required", { status: 400 });
    }

    const newReview = await db.review.create({
      data: {
        tutorName,
        reviewerName,
        rating,
        title,
        description
      },
    });
    revalidatePath(`/tutors/${tutorName}`);
    revalidatePath('/courses/[courseTitle]/reviews');
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, { status: 422 });
    }
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
      const reviewId = params.id;
      const body = await req.json();
      const { tutorName, reviewerName, rating, title, description } = ReviewSchema.parse(body);
  
      const updatedReview = await db.review.update({
        where: { id: reviewId },
        data: {
          tutorName,
          reviewerName,
          rating,
          title,
          description,
        },
      });
      revalidatePath('/courses/[courseTitle]/reviews');
      return NextResponse.json(updatedReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new NextResponse(error.message, { status: 422 });
      }
  
      return new NextResponse("Something went wrong", { status: 500 });
    }
  }

  export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const reviewId = params.id;
  
      await db.review.delete({
        where: { id: reviewId },
      });
      revalidatePath('/courses/[courseTitle]/reviews');
      return new NextResponse("Review deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse("Error deleting review", { status: 500 });
    }
  }
  