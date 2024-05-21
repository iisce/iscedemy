  'use client';

  import { ReviewSchema } from '@/schemas';
import { Review } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import StarRating from '../ui/star-rating';
import { Textarea } from '../ui/textarea';


  interface ReviewFormProps {
    tutorName: string;
    onAddReview: (newReview: Review) => void;
  }

  const ReviewForm: React.FC<ReviewFormProps> = ({ tutorName, onAddReview }) => {
    const [rating, setRating] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const parsed = ReviewSchema.safeParse({
        tutorName,
        reviewerName,
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

      const newReview: Review = {
        ...parsed.data,
        reviewerName: reviewerName || '',
        id: String(Date.now()),
        createdAt: new Date(),
      };

      // Send newReview data to server-side API route
      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview),
        });

        if (response.ok) {
          // Successfully added review, update state
          onAddReview(newReview);

          router.refresh();
          setRating(0);
          setReviewTitle('');
          setReviewText('');
          setReviewerName('');
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
