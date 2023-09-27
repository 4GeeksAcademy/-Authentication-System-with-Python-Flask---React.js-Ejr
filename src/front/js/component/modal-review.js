import React, { Component, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Buttonsignup } from "../component/btn-signup";
import "../../styles/modalreview.css";

const ModalReview = () => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write your review</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label for="ReactStars" className="col-form-label">Rate this book:</label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    edit={true}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className="mb-3">
                                <label for="message-text" className="col-form-label">What do you think about the book?</label>
                                <textarea className="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-close-review" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-send-review">Send message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalReview;