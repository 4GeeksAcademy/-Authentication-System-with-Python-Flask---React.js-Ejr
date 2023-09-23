import React, { Component } from "react";
import "../../styles/modalreview.css";

const ModalReview = () => {

    <div className="container">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalReview">
            <i className="far fa-star"></i> Review this book
        </button>

        <div className="modal fade" id="modalReview" tabindex="-1" aria-labelledby="modalReviewLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalReviewLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary">Submit Review</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default ModalReview;