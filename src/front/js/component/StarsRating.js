import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';import { faStar } from '@fortawesome/free-regular-svg-icons';
import '../../styles/starRatingInput.css'

const StarsRating = ({ onRatingChange}) => {
    const [rating, setRating ] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        onRatingChange(selectedRating);
    }

  return (
    <div className="star-rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <FontAwesomeIcon
        key={star}
        icon={faStar}
        className={star <= rating ? 'active' : ''}
        onClick={() => handleStarClick(star)}
      />
    ))}
  </div>
  )
}

export default StarsRating