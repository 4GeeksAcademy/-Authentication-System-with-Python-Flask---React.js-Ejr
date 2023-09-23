import React, { Component } from "react";
import "../../styles/carousel.css";

export const BestRated = () => (
    <div className="carousel">
        <div className="carousel-container">
            <div className="carousel-group">
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Book 1" />
                    <p>Book 1</p>
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Book 2" />
                    <p>Book 2</p>
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Book 3" />
                    <p>Book 3</p>
                </div>
                <div className="carousel-item">
                    <img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Book 4" />
                    <p>Book 4</p>
                </div>
            </div>

        </div>
        <button id="prevBtn">Prev</button>
        <button id="nextBtn">Next</button>
    </div>

);

export default BestRated;