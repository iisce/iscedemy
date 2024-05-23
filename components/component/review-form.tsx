  'use client';

  import { ReviewSchema } from '@/schemas';
import { Review } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import StarRating from '../ui/star-rating';
import { Textarea } from '../ui/textarea';


  interface ReviewFormProps {
    tutorName: string;
    reviewerId: string
    reviewerName: string
    onAddReview: (newReview: Review) => void;
  }

  const ReviewForm: React.FC<ReviewFormProps> = ({ tutorName, reviewerId, reviewerName, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const parsed = ReviewSchema.safeParse({
        tutorName,
        reviewerName,
        reviewerId,
        rating,
        title: reviewTitle,
        description: reviewText,
      });
      if (!parsed.success) {
        setFormError(parsed.error.message)
        
        console.error("Error occured while submitting review:", parsed.error);
        return;
      }
      setFormError(null);

      const payload = parsed.data

      // Send newReview data to server-side API route
      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Successfully added review, update state
          onAddReview({
            id: String(Math.random()),
            createdAt: new Date(),
            description: payload.description,
            rating: payload.rating,
            title: payload.title,
            tutorName: payload.tutorName,
            userId: payload.reviewerId,
            reviewerName: payload.reviewerName
          });

          router.refresh();
          setRating(0);
          setReviewTitle('');
          setReviewText('');
        } else {
          const data = await response.json();
          setFormError(data.error || 'An error occurred while submitting the review.')
        }
      } catch (error) {
        setFormError('An error occurred while submitting the review. Please try again.');
      }
    };


    return (
      <form onSubmit={handleSubmit} className="space-y-4">
      <StarRating rating={rating} setRating={setRating} />
      {formError && <p className="text-destructive/35  text-sm">{formError}</p>}
        <Input
          type="text"
          placeholder="Your Name (Optional)"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Review Title"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
        />

        <Textarea
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <Button type="submit">Submit Review</Button>
      </form>
    );
  };

  export default ReviewForm;
