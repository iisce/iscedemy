import React, { useState } from 'react';
import * as Icons from '@/lib/icons';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rating: number) => {
    setRating(rating);
  };

  const handleMouseOver = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Icons.StarIcon
            key={index}
            className={`h-6 w-6 cursor-pointer ${
              ratingValue <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'
            }`}
            onClick={() => handleClick(ratingValue)}
            onMouseOver={() => handleMouseOver(ratingValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
