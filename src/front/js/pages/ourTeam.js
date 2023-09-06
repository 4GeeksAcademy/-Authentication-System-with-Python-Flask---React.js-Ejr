import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const OurTeam = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-info">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className=" navbar-nav w-50 d-flex justify-content-start">
                            <a className="navbar-brand" href="#">Market Logo</a>
                            <li className="nav-item my-2">
                                <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                        </div>
                        <div className=" navbar-nav w-50 d-flex justify-content-center">
                            <form className="d-flex" role="search">
                                <input className="form-control " type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <div className=" navbar-nav w-50 d-flex justify-content-end">
                            <li className="nav-item my-2 mx-2">
                                <Link to="/wishList" className="nav-link active">Wish List</Link>
                            </li>
                            <div></div>
                            <button type="button" className="btn btn-primary position-relativ mx-2">
                                <Link to="/cart">Cart</Link>
                            </button>
                            <li className="nav-item my-2 mx-2 ">
                                <Link to="/signinLogin" className="nav-link active">Sign in / Log in</Link>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg bg-primary navbar-dark text-light">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center " id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item p-1 border border-light rounded-start">
                                <Link to="/bookSales" className="nav-link active " aria-current="page">Book sales</Link>
                            </li>
                            <li className="nav-item p-1 border border-light ">
                                <Link to="/bookExchange" className="nav-link active">Book exchange</Link>
                            </li>
                            <li className="nav-item p-1 border border-light rounded-end">
                                <Link to="/bestSeller" className="nav-link active">Best seller</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="text-center m-3 mb-5">
                <h1>FOUNDERS</h1>
            </div>
            <div className="d-flex m-5 justify-content-evenly ">
                <div className="w-50 d-flex align-items-center">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime inventore quo natus fugit ut nemo tempore,
                        facere ducimus incidunt. Numquam tempora aperiam ipsa. Quo dolorum perspiciatis quia inventore. Quia, vero.
                    </p>
                </div>
                <div className="mx-2">
                    <img className="rounded"
                        src="https://static01.nyt.com/images/2022/01/16/fashion/VIRAL-LIBRARY/VIRAL-LIBRARY-jumbo.jpg?quality=75&auto=webp"
                        alt="..." />
                </div>
            </div>
            <div className="text-center d-flex justify-content-evenly ">
                <div className="card" style="width: 211px; height: 361px;">
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/child_boy_man_people_avatar_icon_131265.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">José</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>

                    </div>
                </div>
                <div className="card" style="width: 211px; height: 361px;">
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/avatar_boy_man_child_person_people_icon_131284.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Alejandro</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
                <div className="card" style="width: 211px; height: 361px;">
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/moustache_man_boy_avatar_people_male_icon_131273.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Ignacio</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
                <div className="card" style="width: 211px; height: 361px;">
                    <img src="https://cdn.icon-icons.com/icons2/2121/PNG/512/boy_man_avatar_people_knob_icon_131279.png"
                        className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Juan</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                            content.</p>
                    </div>
                </div>
            </div>
            <div className=" mb-3 mt-5 border border-black bg-light text-center d-flex justify-content-evenly">
                <div className="m-1  border border-black w-50 bg-info">
                    <h4 className="border bg-primary">How to buy</h4>
                    <Link to="/buyingGuide" className="nav-link active">
                        <h6>Buying guide</h6>
                    </Link>
                    <Link to="/paymentMethod" className="nav-link active">
                        <h6>Payment method</h6>
                    </Link>
                    <Link to="/shippongMethod" className="nav-link active">
                        <h6>Shipping method</h6>
                    </Link>
                </div>
                <div className="m-1 border border-black w-50 bg-info">
                    <h4 className="border bg-primary">How to exchange</h4>
                    <Link to="/exchangedGuide" className="nav-link active">
                        <h6>Exchanged guide</h6>
                    </Link>
                </div>
                <div className="m-1 border border-black w-50 bg-info">
                    <h4 className="border solid 2px bg-primary">Customer service</h4>
                    <Link to="/contactUs" className="nav-link active">
                        <h6>Contact us</h6>
                    </Link>
                    <Link to="/faqs" className="nav-link active">
                        <h6>FAQs</h6>
                    </Link>
                </div>
                <div className=" m-1 border border-black w-50 bg-info">
                    <h4 className="border solid 2px bg-primary">About Us</h4>
                    <Link to="/ourTeam" className="nav-link active">
                        <h6>Our team</h6>
                    </Link>
                    <Link to="/ourStory" className="nav-link active">
                        <h6>Our story</h6>
                    </Link>
                </div>
                <div className="m-1 border border-black w-50 bg-info ">
                    <h4 className="border solid 2px bg-primary">Follow Us</h4>
                    <Link to="/facebook" className="nav-link active">
                        <h6>Facebook</h6>
                    </Link>
                    <Link to="/instagram" className="nav-link active">
                        <h6>Instagram</h6>
                    </Link>
                    <Link to="/tiktok" className="nav-link active">
                        <h6>Tiktok</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
};