'use client';

import { ReviewSchema } from '@/schemas';
import { Review } from '@prisma/client';
import { FormEvent, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import StarRating from '../ui/star-rating';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


interface EditReviewFormProps {
    review: Review;
    onEditReview: (updatedReview: Review) => void;
    onCancelEdit : () => void;
  }

const EditReviewForm: React.FC<EditReviewFormProps> = ({ 
    review, 
    onEditReview,  
    onCancelEdit,
}) => {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({}); 


    useEffect(() => {
        setRating(review.rating);
        setReviewTitle(review.title);
        setReviewText(review.description)
    }, [review]);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = ReviewSchema.safeParse({
      tutorName: review.tutorName,
      rating,
      title: reviewTitle,
      description: reviewText,
    });
    if (!parsed.success) {
        const errors: { [key: string]: string } = {};

        parsed.error.issues.forEach(issue => {
            const path = issue.path[0]; // Get the field name
            if (!errors[path]) { // Only set the error if it hasn't been set yet
              errors[path] = issue.message;
            }
          });
        setFormErrors(errors);
     return;
    }

    setFormErrors({});

    const updatedReview: Review = {
         // Keep existing properties
      ...review,
      rating: parsed.data.rating,
      title: parsed.data.title,
      description: parsed.data.description,
    };

    // Send newReview data to server-side API route
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      });

      if (response.ok) {
        onEditReview(updatedReview);
        router.refresh();
        onCancelEdit();

      } else {
        const data = await response.json();
        setFormErrors(data.error || 'An error occurred while updating the review.')
      }
    } catch (error) {
      setFormErrors({general: 'An error occurred while updating the review. Please try again.'});
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <StarRating rating={rating} setRating={setRating} />
    {
        Object.keys(formErrors).length > 0 && (
          <div className="text-destructive/50  text-sm">
            {Object.keys(formErrors).map((key) => (
              <p key={key}>{formErrors[key]}</p>
            ))}
          </div>
        )
      }
    <Input
        type="text"
        placeholder="Review Title"
        value={reviewTitle}
        onChange={(e) => setReviewTitle(e.target.value)}
        {...(formErrors.title && { error: formErrors.title })} 
      />

    <Textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        {...(formErrors.description && { error: formErrors.description })}
      />

    <div className="flex space-x-2">
        <Button type="submit">Save Changes</Button>
        <Button type="button" onClick={onCancelEdit}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditReviewForm;

