import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const styles = {
  star: {
    color: '#FFD700',
    fontSize: '30px',
    
  },
  ratingText: {
    fontSize: '25px',
    color: 'white',
    fontFamily: 'Arial, sans-serif', 
    fontWeight: 'bold',
  },
};

const RatingStars = ({ userRatings }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (userRatings.length > 0) {
      const total = userRatings.reduce((acc, rating) => acc + rating, 0);
      setAverageRating((total / userRatings.length).toFixed(1));
      setTotalVotes(userRatings.length);
    }
  }, [userRatings]);

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <FontAwesomeIcon key={`filled-${index}`} icon={faStar} style={styles.star} />
        ))}
        {halfStar === 1 && <FontAwesomeIcon icon={faStar} style={{ ...styles.star, color: '#FFD70080' }} />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon key={`empty-${index}`} icon={faStar} style={{ ...styles.star, color: '#3b3f42' }} />
        ))}
      </>
    );
  };

  return (
    <div className="mb-2 d-flex align-items-center">
      {renderStars(averageRating)}
      <span className="ms-2" style={styles.ratingText}>
        {averageRating}/5 
      </span>
    </div>
  );
};

export default RatingStars;
