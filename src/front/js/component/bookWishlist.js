import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const BookWishlist = () => {

    return (
        <div className="book_whislist" style={{ width: "50rem" }} >
            <div className="card_wishlist">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="..." className="card-img-top" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title" style={{ margin: "20px 0" }}>Book Title</h5>
                            <p className="card-author" style={{ margin: "10px 0" }}>Book Author</p>
                            <div className="mb-3 row">
                                <div className="col">
                                    <a href="#" className="paper_plane"><i className="far fa-paper-plane"></i> Request Swap</a>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <a href="#" className="trash"><i className="far fa-trash-alt"></i> Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
