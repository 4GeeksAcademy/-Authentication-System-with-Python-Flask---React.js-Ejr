import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import backgroundImage from '/src/front/img/backgroundImage.png';
import esconde from '/src/front/img/esconde.webp';
import encuentra from '/src/front/img/encuentra.webp';
import rankings from '/src/front/img/rankings.webp';
import join from '/src/front/img/join.webp';
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
                    <Link to="/formulario-tesoro">
                        <button className="btn btn-custom btn-hide-treasure mt-3">Hide your treasure</button>
                    </Link>
                    <Link to="/lista-tesoros">
                        <button className="btn btn-custom btn-find-treasures mt-3 ms-4">Find treasures</button>
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
                <div className="row mx-0 text-center">
                    <div className="col">
                        <p className="text-links">Do you want to know how the Scoring and Status work?<Link to="/puntuacion" className="score-status ms-1">Score & Status</Link></p>
                    </div>
                </div>
            </div>

            {/* Sección Empresas */}
            <div className="container-fluid-company pb-5 px-0 pe-5">
                <div className="row mx-0">
                    <div className="col-3 left-column px-0">
                        <h2 className="how-it-works pt-5 ps-5">Are you a Company?</h2>
                        <p className="how-text ps-5">Discover our section for business.</p>
                    </div>
                    <div className="col-9 right-column px-0">
                        <div className="image-description pt-5">
                            <Link to="/formulario-tesoro"><img src={golden} className="imagen-how" alt="Descripción de la imagen 1" /></Link>
                            <p className="text-how pt-4">1. Hide golden tickets for users to find and redeem in your stores for promotional products.</p>
                        </div>
                        <div className="image-description pt-5">
                            <Link to="/rankings"><img src={regalo} className="imagen-how" alt="Descripción de la imagen 2" /></Link>
                            <p className="text-how-2 pt-4">2. Earn points and climb the rankings to become our users' favorite company. Start now! <Link to="/registro">Create you account</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección Crea tu cuenta y comienza */}
            <div className="container-fluid-join pb-5 px-0">
                <div className="row mx-0">
                    <div className="col-3 left-column px-0 pe-5">
                        <h2 className="how-it-works pt-5 ps-5">Join the Adventure</h2>
                        <p className="how-text ps-5">Sign up today and start your own treasure hunting journey.</p>
                    </div>
                    <div className="col-9 d-flex">
                        <div className="image-description pt-5 pe-3 ps-5">
                            <Link to="/registro"><img src={join} className="imagen-how ms-5" alt="Join the Adventure" /></Link>
                        </div>
                        <div className="text-description pt-2 pe-5">
                            <p className="mt-5 ms-3 text-login-join">
                                Already have an account? <a href="/login">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
