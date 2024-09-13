import React from "react";
import "../../styles/genre_selection.css"

import logo from "../../img/logo-marca.png"
import sport from "../../img/material-symbols_sports-score.png"
import strategy from "../../img/ph_horse-fill.png"
import rpg from "../../img/solar_shield-bold-duotone.png"
import action from "../../img/ph_sword-bold.png"
import adventure from "../../img/material-symbols-light_map.png"
import shooter from "../../img/Vector.png"
export const GenreSelection = () => {
    return (
    <div className="d-flex flex-column min-vh-100" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
    <div className="container text-center my-auto">
        <div className="row justify-content-center align-items-center">
            <h2 className="mb-5 fw-bold" >Favorite Game Genres</h2>
            <div className="col-md-4 mb-3">
                <div className="genre-card">
                    <img src={action} alt="Acción" style={{width: '24%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Acción</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="genre-card">
                    <img src={adventure} alt="Acción" style={{width: '30%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Adventure</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="genre-card">
                    <img src={rpg} alt="Acción" style={{width: '20%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">RPG</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="genre-card">
                    <img src={strategy} alt="Acción" style={{width: '20%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Strategy</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="genre-card">
                    <img src={sport} alt="Acción" style={{width: '30%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Sports</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className="genre-card selected">
                    <img src={shooter} alt="Acción" style={{width: '23%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Shooter</p>
                </div>
            </div>
        </div>
    </div>
    <footer className="text-center py-3 my-4">
    <div className="d-flex justify-content-center gap-2 flex-wrap">
        <button className="btn btn-prev"><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
        <button className="btn btn-next">Continue</button>
    </div>
</footer>
    </div>
);
}