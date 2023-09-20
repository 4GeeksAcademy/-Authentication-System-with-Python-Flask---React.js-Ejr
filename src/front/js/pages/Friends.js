import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Friends = () => {
    return (
        <div className="friends_box container mt-5" style={{ width: "50rem" }}>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="title">
                            <h1>My Friends</h1>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="search_bar">
                            <form className="d-flex justify-content-end">
                                <div class="input-group" style={{ width: "230px" }}>
                                    <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input" />
                                    <span class="input-group-append">
                                        <button class="btn btn-outline-secondary border-start-0 border-bottom-0 border ms-n5" type="button">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr className="my-4 bold-hr" />
                <div className="friends_list">
                    <div className="card mb-3" style={{ border: "none" }}>
                        <div className="row g-0">
                            <div className="col-md-2 mx-auto">
                                <img src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" className="card-img-top rounded-circle" alt="..." />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title">Name Surname</h5>
                                    <div className="row">
                                        <div className="col">
                                            <a href="#" className="trash">Delete Friend</a>
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

