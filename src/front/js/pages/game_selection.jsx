import React from "react";
import logo from "../../img/logo/logo-marca.png"
import {CardGame} from "../component/game_selection/card_game.jsx"
export const GameSelection = () => {
    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="container text-center my-auto mt-5">
            <div className="row justify-content-center align-items-center">
                <h2 className="mb-5 fw-bold">Choose a prefered game</h2>
                <div className="col-md-6 mb-3">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>
                </div>
                <div className="container">
                    <CardGame/>
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
    )
}