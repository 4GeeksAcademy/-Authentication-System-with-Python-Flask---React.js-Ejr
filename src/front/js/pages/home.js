import React, { useContext } from "react";
import { Context } from "../store/appContext";




export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <nav className="navbar">
                <div className="navbar__container">
                    <a href="/" id="navbar__logo"><i className="fa-solid fa-dumbbell"></i>GYMApp</a>
                    <div className="navbar__toggle" id="mobile-menu">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className="navbar__menu">
                        <li className="navbar__item">
                            <a href="/" className="navbar__links">Home</a>
                        </li>
                        <li className="navbar__item">
                            <a href="/routines.html" className="navbar__links">Routines</a>
                        </li>
                        <li className="navbar__item">
                            <a href="/diets.html" className="navbar__links">Diets</a>
                        </li>
                        <li className="navbar__btn">
                            <a href="/" className="button">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>


            <div className="main">
                <div className="main__container">
                    <div className="main__content">
                        <h1>NEXT GENERATION GYM</h1>
                        <h2>TECHNOLOGY</h2>
                        <p>See what makes us different.</p>
                        <button className="main___btn"><a href="/">Get Started</a></button>
                    </div>
                    <div className="main__img--container">
                        <img src="images/undraw_fitness_tracker_3033.png" alt="pic" id="main__img" />
                    </div>
                </div>
            </div>


            <div className="service">
                <h1>See what the hype is about</h1>
                <div className="services__container">
                    <div className="services__card">
                        <h2>Experience Fitness</h2>
                        <p>Best Technology Gym</p>
                        <button>Get Started</button>
                    </div>
                    <div className="services__card">
                        <h2>Are You Ready</h2>
                        <p>Take The Challenge</p>
                        <button>Get Started</button>
                    </div>
                </div>
            </div>


            <div className="footer__container">
                <div className="footer__links">
                    <div className="footer__link--wrapper">
                        <div className="footer__link--items">
                            <h2>About Us</h2>
                            <a href="/">How it works</a>
                            <a href="/">Testimonials</a>
                            <a href="/">Careers</a>
                            <a href="/">Investments</a>
                            <a href="/">Terms of service</a>
                        </div>
                        <div className="footer__link--items">
                            <h2>Contact Us</h2>
                            <a href="/">Contact</a>
                            <a href="/">Support</a>
                            <a href="/">Destinations</a>
                            <a href="/">Sponsorship</a>
                        </div>
                    </div>
                    <div className="footer__link--wrapper">
                        <div className="footer__link--items">
                            <h2>Videos</h2>
                            <a href="/">Submit Video</a>
                            <a href="/">Ambassadors</a>
                            <a href="/">Agency</a>
                            <a href="/">Influencer</a>

                        </div>
                        <div className="footer__link--items">
                            <h2>Social Media</h2>
                            <a href="/">Instagram</a>
                            <a href="/">Facebook</a>
                            <a href="/">Youtube</a>
                            <a href="/">Tweeter</a>
                        </div>
                    </div>
                </div>
                <div className="social__media">
                    <div className="social__media--wrap">
                        <div className="footer__logo">
                            <a href="/" id="footer__logo"><i className="fa-solid fa-dumbbell"></i>GYMApp</a>
                        </div>
                        <p className="website__rights">GYMApp 2023. All rights reserved</p>
                        <div className="social__icons">
                            <a href="/" className="social__icon--link" target="_blank">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="/" className="social__icon--link" target="_blank">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="/" className="social__icon--link" target="_blank">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                            <a href="/" className="social__icon--link" target="_blank">
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
