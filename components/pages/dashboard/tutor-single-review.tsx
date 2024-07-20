import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';
import { Review } from '@prisma/client';

export default function ViewReview({ reviews } : {reviews: Review[]}) {
  return (
    <div className="mt-8 backdrop:blur-md">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent>
              <div className="grid gap-4 w-full py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className='bg-green-600'>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-medium">{review.reviewerName}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-green-600" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <div className="">
                <h3>{review.title}</h3>
                <p className="text-sm mt-2">{review.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
