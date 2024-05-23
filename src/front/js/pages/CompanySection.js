import React from 'react';
import { Link } from "react-router-dom";
import regalo from '/src/front/img/regalo.webp';
import golden from '/src/front/img/golden.webp';

const CompanySection = () => {
    return (
        <div className="container-fluid-company pb-5 px-0">
            <div className="row mx-0">
                <div className="col-12 col-md-4 left-column px-0">
                    <h2 className="how-it-works pt-5 ps-5">Are you a Company?</h2>
                    <p className="how-text ps-5">Discover our section for business.</p>
                    <div className="div-button ps-5 pt-2">
                        <Link to="/register" state={{ from: 'company' }}>
                            <button role="button" className="golden-button">
                                <span className="golden-text">START NOW</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-8 right-column-how px-0">
                    <div className="image-description pt-5 mb-3">
                        <Link to="/hide"><img src={golden} className="imagen-how" alt="Description of image 1" /></Link>
                        <p className="text-how pt-4">1. Hide golden tickets for users to find and redeem in your stores for promotional products.</p>
                    </div>
                    <div className="image-description pt-5">
                        <Link to="/rankings" state={{ view: 'Companies' }}><img src={regalo} className="imagen-how" alt="Description of image 2" /></Link>
                        <p className="text-how-2 pt-4">2. Earn points and climb the rankings to become our users' favorite company. Start now!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanySection;
