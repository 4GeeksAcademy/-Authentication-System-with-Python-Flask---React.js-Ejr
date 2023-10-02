import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const BookCarousel = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 1" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 2" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 3" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 1" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 2" />
                            </div>
                            <div className="carousel-item">
                                <img src="https://thumbs.dreamstime.com/z/grey-book-19595267.jpg?w=768" className="d-block w-100" alt="Book 3" />
                            </div>
                        </div>
                        <button id="custom-next-button" className="carousel-control-prev custom-carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="fas fa-chevron-left" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button id="custom-next-button" className="carousel-control-next custom-carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="fas fa-chevron-right" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};