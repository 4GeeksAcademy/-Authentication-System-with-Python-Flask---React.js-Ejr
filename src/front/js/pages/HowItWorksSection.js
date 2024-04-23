import React from 'react';
import { Link } from "react-router-dom";
import esconde from '/src/front/img/esconde.webp';
import encuentra from '/src/front/img/encuentra.webp';
import rankings from '/src/front/img/rankings.webp';

const HowItWorksSection = () => {
    return (
        <div className="container-fluid-how px-0">
            <div className="row mx-0 pe-4">
                <div className="col-sm-12 col-md-6 col-lg-4 left-column px-0">
                    <h2 className="how-it-works pt-5 ps-5">How It Works</h2>
                    <p className="how-text ps-5">Discover how you can participate in this exciting treasure hunt.</p>
                    <div className="div-button ps-5 pt-2">
                        <Link to="/register" state={{ from: 'user' }}>
                            <button role="button" className="golden-button">
                                <span className="golden-text">START NOW</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-8 right-column px-0">
                    <div className="image-description col-sm-12 col-lg-4 pt-5">
                        <Link to="/hide"><img src={esconde} className="imagen-how" alt="Image description 1" /></Link>
                        <p className="text-how pt-4">1. Hide your treasure so that other users can find it. Earn points for it!</p>
                    </div>
                    <div className="image-description col-sm-12 col-lg-4 pt-5">
                        <Link to="/treasures"><img src={encuentra} className="imagen-how" alt="Image description 2" /></Link>
                        <p className="text-how-2 pt-4">2. Find the treasures hidden around your city and earn points for it!</p>
                    </div>
                    <div className="image-description col-sm-12 col-lg-4 pt-5">
                        <Link to="/rankings"><img src={rankings} className="imagen-how" alt="Image description 3" /></Link>
                        <p className="text-how pt-4">3. Climb up the rankings! Each treasure you hide or find will award you 10 points. Earn your first 100 points to advance to the next Status!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;

