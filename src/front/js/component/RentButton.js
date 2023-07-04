import React from 'react';

const RentButton = () => {
    const handleRentClick = () => {
        window.location.href = '/calendar';
    };

    return (
        <button onClick={handleRentClick}>Rent</button>
    );
};

export default RentButton;