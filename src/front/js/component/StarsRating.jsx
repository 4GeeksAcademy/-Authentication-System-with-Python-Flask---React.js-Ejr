import React, { useState } from "react";
import '../../styles/StarRatings.css';

export const StarsRating = ({ totalStars = 5, SingleOfferRating = '' }) => {
    const [ratings, setRatings] = useState([]);

    const handleRating = (rate) => {
        setRatings((prevRatings) => [...prevRatings, rate]);
    };

    const calculateAverageRating = () => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((sum, rating) => sum + rating, 0);
        return (total / ratings.length).toFixed(1); 
    };

    const averageRating = calculateAverageRating();

    return (
        <div className={`rating d-flex ${SingleOfferRating}`}>
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    style={{ color: index < averageRating ? '#ffd700' : '#ccc' }}
                >
                    ★
                </span>
            ))}
            <p>({averageRating})</p>
        </div>
    );
};





