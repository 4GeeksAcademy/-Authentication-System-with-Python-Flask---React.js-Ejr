import React, { useState } from "react";
import { Context } from "../store/appContext";

export const Recommendations = () => {
    return (
        <div className="recommendations">
            <div className="recommendations_container mt-5">
                <a className="nav-link mb-3" href="#">
                    Recommendations
                </a>
            </div>
            <div className="recommendations">
                <div className="card" style={{ width: "32rem", border: "none" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="..." className="card-img-top" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <p className="card-author">@username recommended this book.
                                    Do you want to add it to your Wishlist?</p>
                                <div className="mb-3 row">
                                    <div className="col-md">
                                        <div class="alert alert-info-accept text-center" role="alert">
                                            <i class="fas fa-heart mx-2"></i>
                                            Add to Wishlist
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <div className="col-md">
                                        <div class="alert alert-info-decline text-center" role="alert">
                                            Dismiss recommendations
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}