import { Progress } from "@/components/ui/progress"
import * as Icons from '@/lib/icons'
import { Review } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import EditReviewForm from "./edit-review-form"
import ReviewForm from "./review-form"
import { TUTOR_PROFILE } from "@/lib/consts"

export function SingleTutorReviews({ tutorName, }: ISingleTutorReviews) {
  const tutor = TUTOR_PROFILE.find(profile => profile.name === tutorName);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);


  const [tutorReviews, setTutorReviews] = useState<Review[]>([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const {data: session} = useSession();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?tutorName=${tutorName}`);
        if (response.ok) {
          const data = await response.json();
          setTutorReviews(data);
          const currentReview = data.find((review: Review) => review.id === session?.user?.id);
          setEditingReview(currentReview || null);
        } else {
          console.error('Error fetching reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchReviewsCount = async () => {
      try {
        const response = await fetch(`/api/reviews?tutorName=${tutorName}`);
        if (response.ok) {
          const data = await response.json();
          setTotalReviewsCount(data.length);
        } else {
          console.error('Error fecthing review count');
        }
      }catch (error) {
        console.error('There was an error getting reviews', error);
      }
    };
    fetchReviews();
    fetchReviewsCount();
  }, [tutorName, tutorReviews]);


  const handleAddReview = (newReview: Review) => {
    setTutorReviews([...tutorReviews, newReview]);
    setIsEditing(false);
  };
  
  const handleEditReview = (updatedReview: Review) => {
    setTutorReviews(tutorReviews.map(review => review.id === updatedReview.id ? updatedReview : review))
  };

  const handleEditClick = (review: Review) => {
    setEditingReview(review);
    setIsEditing(true);
  };


  const handleCancelEdit = () => {
    setIsEditing(false);
  }
/**This const will be used to calculate the reviews based on the total and displays it on the progress bar
 * Basically; it handles the movement of the progress bar based on number of stars
 * on a particular tutors profile
 */
  const starCounts = [0, 0, 0, 0, 0];
  tutorReviews.forEach((review) => {
    starCounts[review.rating - 1]++;
  })
  const totalRatings = tutorReviews.length;


  /** This const handles the average sume of stars on a tutuor profile reviews
   * rounded average star rating as the number of filled stars, 
   * giving a clearer representation of the tutor's overall performance.
   */
  const highestAverageRating = Math.round(
    tutorReviews.reduce((sum, review) =>
     sum + review.rating, 0)/(totalReviewsCount || 1)
  )

  return (
    <div className="w-full  mx-auto  md:p-8">
      <div className="flex flex-col justify-between overflow-hidden md:space-x-2 gap-6 md:gap-4 items-start">
        <div className="bg-white space-y-1 p-4 rounded-lg shadow flex flex-col items-center">
          <div className="text-3xl font-bold">{totalReviewsCount}</div>
          <div className="flex text-green-600">
            {[...Array(highestAverageRating)].map((_, index) => (
              <Icons.StarIcon key={index}/>
            ))}
          </div>
          <div className="text-sm text-gray-700">{totalReviewsCount}</div>
        </div>
        <div className="flex flex-col space-y-2">
          {[5,4,3,2,1].map((numStars) => {
            const count = starCounts[numStars - 1];
            const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;

            return (
              <div key={numStars} className="flex items-center gap-3">
                <div className="text-green-600 gap-3 flex flex-row">
                  {numStars} <Icons.StarIcon />
                </div>
                <Progress className="w-[250px] mx-2" value={percentage} />
                <div>{count}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-semibold underline">Reviews</h2>
        <div className="mt-4 ">
        {tutorReviews.map((review, i) => (
          <div className="flex items-center space-x-4" key={i}>        
              {/* <Image width={40} height={40} src={review.} alt={`PalmTechnIQ | ${tutorName}`}
                className="object-cover rounded-full" /> */}
               <div className="flex flex-col w-full space-y-2 py-3">
               <div className="text-lg font-semibold">{review.reviewerName}</div>
               <div className="flex text-green-600">
                 {[...Array(review.rating)].map((_, index) => (
                   <Icons.StarIcon key={index} />
                 ))}
               </div>
               <div className="text-gray-900">{review.title}</div>
               <p className="text-gray-700 mt-1">
                 {review.description}
               </p>
               <Separator className="w-full"/>
             </div>   
             {session && session.user?.id === review.id && (
              <>
                <Button onClick={() => handleEditClick(review)}>Edit</Button>
                <Button onClick={() => handleCancelEdit()}>Cancel</Button>
              </>
             )}
          </div>
           ))}
           {isEditing && editingReview ? (
            <EditReviewForm review={editingReview} onEditReview={handleEditReview} onCancelEdit={handleCancelEdit}/>
           ): (
            <ReviewForm tutorName={tutorName} onAddReview={handleAddReview} />  
           )}
         
        </div>
      </div>
    </div>
  )
}


