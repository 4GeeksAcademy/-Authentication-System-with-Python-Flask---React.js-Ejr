import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import backgroundImage from '/src/front/img/backgroundImage.png';
import esconde from '/src/front/img/esconde.webp';
import encuentra from '/src/front/img/encuentra.webp';
import rankings from '/src/front/img/rankings.webp';
import regalo from '/src/front/img/regalo.webp';
import golden from '/src/front/img/golden.webp';

export const Home = () => {
    return (
        <div className="home-container">
            {/* Sección Principal */}
            <div className="principal-section text-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0' }}>
                <div className="description">
                    <h1 className="description-title mt-5">Welcome to Urban Treasures</h1>
                    <p className="description-text">Join the adventure and discover hidden treasures around you. Hide your own for others to find.</p>
                </div>
                <div className="action-buttons pt-5">
                    <Link to="/lista-tesoros">
                        <button role="button" className="golden-button me-4">
                            <span className="golden-text">FIND TREASURES</span>
                        </button>
                    </Link>
                    <Link to="/formulario-tesoro">
                        <button role="button" className="golden-button">
                            <span className="golden-text">HIDE A TREASURE</span>
                        </button>
                    </Link>
                </div>
                <div className="contenido-relleno">
                </div>
            </div>

            {/* Sección Cómo Funciona */}
            <div className="container-fluid px-0">
                <div className="row mx-0">
                    <div className="col-1 left-column px-0">
                        <h2 className="how-it-works pt-5 ps-5">How It Works</h2>
                        <p className="how-text ps-5">Discover how you can participate in this exciting treasure hunt.</p>
                        <div className="div-button ps-5 pt-2">
                            <Link to="/registro">
                                <button role="button" className="golden-button">
                                    <span className="golden-text">START NOW</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col right-column px-0">
                        <div className="image-description pt-5">
                            <Link to="/formulario-tesoro"><img src={esconde} className="imagen-how" alt="Descripción de la imagen 1" /></Link>
                            <p className="text-how pt-4">1. Hide your treasure so that other users can find it. Earn points for it!</p>
                        </div>
                        <div className="image-description pt-5">
                            <Link to="/lista-tesoros"><img src={encuentra} className="imagen-how" alt="Descripción de la imagen 2" /></Link>
                            <p className="text-how-2 pt-4">2. Find the treasures hidden around your city and earn points for it!</p>
                        </div>
                        <div className="image-description pt-5 pe-5">
                            <Link to="/rankings"><img src={rankings} className="imagen-how" alt="Descripción de la imagen 3" /></Link>
                            <p className="text-how pt-4">3. Climb up the rankings! Each treasure you hide or find will award you 10 points. Earn your first 100 points to advance to the next Status!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección Empresas */}
            <div className="container-fluid-company pb-5 px-0 pe-5">
                <div className="row mx-0">
                    <div className="col-3 left-column px-0">
                        <h2 className="how-it-works pt-5 ps-5">Are you a Company?</h2>
                        <p className="how-text ps-5">Discover our section for business.</p>
                        <div className="div-button ps-5 pt-2">
                            <Link to="/registro">
                                <button role="button" className="golden-button">
                                    <span className="golden-text">START NOW</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-9 right-column px-0">
                        <div className="image-description pt-5">
                            <Link to="/formulario-tesoro"><img src={golden} className="imagen-how" alt="Descripción de la imagen 1" /></Link>
                            <p className="text-how pt-4">1. Hide golden tickets for users to find and redeem in your stores for promotional products.</p>
                        </div>
                        <div className="image-description pt-5">
                            <Link to="/rankings"><img src={regalo} className="imagen-how" alt="Descripción de la imagen 2" /></Link>
                            <p className="text-how-2 pt-4">2. Earn points and climb the rankings to become our users' favorite company. Start now!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
