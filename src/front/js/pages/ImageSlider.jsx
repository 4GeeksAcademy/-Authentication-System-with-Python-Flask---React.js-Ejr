import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import image1 from '../../img/image11.jpg';
import image2 from '../../img/image10.jpg';
import image3 from '../../img/image3.jpg';
import image4 from '../../img/image8.jpg';
import image5 from '../../img/image6.webp';

const slides = [
    {
        title: 'Instant Notifications',
        description: 'Say goodbye to intermediaries and WhatsApp groups.',
        details: 'With Crossfy, communicate seamlessly in real-time with your members, keeping everyone in the loop and engaged.',
        image: image1
    },
    {
        title: 'Effortless Class Reservations',
        description: 'Streamlined management of classes and shifts.',
        details: 'Booking a class has never been this easy. Utilize QR check-ins to simplify the process and enhance the member experience.',
        image: image2
    },
    {
        title: 'Personalized WODs and Routines',
        description: 'Tailored training for optimal results.',
        details: 'Offer distance training and customized WODs designed to meet individual fitness goals, driving member satisfaction and retention.',
        image: image3
    },
    {
        title: 'Comprehensive Cash and Product Control',
        description: 'Efficiently manage your finances and inventory.',
        details: 'Gain precise control over your cash flow and product inventory, ensuring your business runs smoothly and profitably.',
        image: image4
    },
    {
        title: 'Cutting-Edge Technology',
        description: 'Constantly evolving based on your feedback.',
        details: 'We continuously enhance our platform to meet your needs, providing the advanced gym software you’ve been waiting for.',
        image: image5
    }
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Cambiar cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider-container">
            {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
                    <img src={slide.image} alt={slide.title} className="slide-image" />
                    <div className="slide-content">
                        <h2 className="slide-title">{slide.title}</h2>
                        <p className="slide-description">{slide.description}</p>
                        <p className="slide-details">{slide.details}</p>
                    </div>
                </div>
            ))}
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
