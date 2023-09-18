import React, { Component } from "react";
import "../../styles/review.css";

export const Review = () => (
	<div className="row no-gutters">
			<div className="container d-flex justify-content-center">
                <div className="col-2">
                    <img className="rounded-circle thumbnail mt-2 mx-2"src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"/>
                </div>

                <div className="col-10">
                    <div className="reviewbody">
                        <div className="row g-3 d-flex">
                            <p className="username">@username rated this book</p>
                            <p>02/02/2022</p>
                        </div>
                        <div className="row g-3 d-flex">
                            <p>★★★★★</p>
                            <p className="reviewdescription">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
                        </div>
                    </div>
                </div>
			</div>
		</div>
);

export default Review;