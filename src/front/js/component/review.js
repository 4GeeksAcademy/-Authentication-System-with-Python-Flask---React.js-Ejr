import React, { Component, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../../styles/review.css";

export const Review = () => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
    
    return (

    <div className="d-flex flex-row bd-highlight mb-3 col-10 align-items-center">
        <div className="p-2 col-md-2">
            <img className="rounded-circle mt-2 mx-2"src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" height="100"/>
        </div>

        <div className="p-2 col-md-10">
            <div className="row">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="px-2 bd-highlight">@username rated this book</div>
                    <div className="px-2 bd-highlight text-end">DATE</div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex flex-row bd-highlight mb-3">
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                    value={3}
                />
                    <div className="px-2 bd-highlight">5</div>
                </div>
            </div>
            <div className="row">
                <p>"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500."</p>
            </div>
        </div>
    </div>
    )
};

export default Review;