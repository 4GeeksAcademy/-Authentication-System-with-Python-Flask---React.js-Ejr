import React, { useState } from "react";


export const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);


    const handleRating = (rate) => {
        setRating(rate);
    };

    return (
        <div className="rating">
            {[...Array(totalStars)].map((_, index) => (
                <span key={index}
                    onClick={() => handleRating(index + 1)}
                    style={{ color: index < rating ? '#ffd700' : '#ccc' }}
                >
                    ★

                </span>
            ))}
            <p style={{color: 'white'}}>
                Rating: {rating} / {totalStars}
            </p>
        </div>
    )
}




