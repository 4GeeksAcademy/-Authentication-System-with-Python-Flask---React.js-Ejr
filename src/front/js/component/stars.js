import React from 'react';
import RatingStars from './RatingStars';

const Stars = () => {
  
  const userRatings = [5, 4, 4.5, 3,5, 3,4];

  return (
    <div>
          <RatingStars userRatings={userRatings} />
    </div>
  );
};

export default Stars;
