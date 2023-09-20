import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { TargetCard } from "../component/targetCard";
import { BookCarousel } from "../component/BookCarousel";
import { ProfileOne } from "../component/ProfileOne";
import { ProfileTwo } from "../component/ProfileTwo";

export const PublicProfile = () => {
    return (
        <div className="container">
            <div className="image">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <img src="https://images.pexels.com/photos/2648230/pexels-photo-2648230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" style={{height:"350px"}} alt="..." />
                    </div>
                    <div className="position-relative">
                    <div className="custom-position">
                        <img src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="Profile Icon" style={{ width: "10rem", height: "10rem" }} className="rounded-circle" />
                    </div>
            </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="my-5">
                        <ProfileOne />
                    </div>
                    <div className="my-5">
                        <ProfileTwo  />
                    </div>
                    <div className="my-5">
                        <TargetCard  />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-4">
                        <div className="Profile_information">
                            <div className="nav flex-column">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <h4 className="name_surname">Name Surname</h4>
                                    </div>
                                    <div className="col-md-7 text-end">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="dropdown">
                                                    <a className="btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fas fa-chevron-down"></i>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <li><a className="dropdown-item" href="#">Message User</a></li>
                                                        <li><a className="dropdown-item" href="#">Report User</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <i className="fas fa-cog"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary mb-4"><i class="fas fa-user-plus mx-2"></i>Follow</button>
                                    </div>
                                </div>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <p className="form-label mb-5">
                                            “Hello, fellow book lovers! I'm absolutely passionate about the written word. My life revolves around the magic of literature, and you'll often find me lost in the pages of a good book, sipping on a cup of tea.”
                                        </p>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <h3>My Swaps</h3>
                                        <BookCarousel />
                                    </div>
                                    <div className="col-12">
                                        <h3>Books to Swap</h3>
                                        <BookCarousel />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

