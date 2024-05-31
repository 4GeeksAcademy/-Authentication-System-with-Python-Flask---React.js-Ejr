import React, { useState } from 'react';
import './ImageSlider.css';

const slides = [
    {
        title: 'WHY CALISTHENICS?',
        description: 'Mobility, Functionality, and Flexibility',
        details: 'Compound bodyweight exercise and moves build a platinum functional, flexible body. All calisthenics movements require great flexibility to be performed therefore practicing calisthenics puts the body in positions that force it to be more mobile, functional, and flexible.',
    },
    // Aquí puedes agregar más objetos con la información de otros slides
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="slider-container">
            <div className="slide">
                <h2 className="slide-title">{slides[currentIndex].title}</h2>
                <p className="slide-description">{slides[currentIndex].description}</p>
                <p className="slide-details">{slides[currentIndex].details}</p>
            </div>
            <div className="slider-controls">
                <button className="prev-btn" onClick={handlePrevClick}>
                    <i className="arrow left"></i>
                </button>
                <button className="next-btn" onClick={handleNextClick}>
                    <i className="arrow right"></i>
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;