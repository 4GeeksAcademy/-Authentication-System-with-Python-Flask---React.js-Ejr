import React from "react";
import logo from "../../img/logo/logo-marca.png"
import { MatchGame } from "../component/match_game/game_match.jsx";
import "../../styles/genre_selection.css"

export const SearchMatch = () => {
    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
            <div className="container text-center my-auto mt-5">
                <div className="row">
                    <h2 className="mb-5 fw-bold">Match</h2>
                    <div className="col-md-10 mb-2">
                        <form class="d-flex" role="search">
                            <input type="email" className="form-control bg-dark text-white rounded-3 p-2 border-0" style={{ fontSize: "14px" }} placeholder="Game"/>
                        </form>
                    </div>
                    <div className="col-md-2 mb-2 d-flex">
                        <button className="text-white btn-search w-100">search</button>
                    </div>
                </div>
                <div className="container-fluid d-flex ps-0 center-mobile">
                    <div className="row">
                        <div className="col-auto d-flex align-items-center mt-1">
                            <div className="me-2">
                                Platform:
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-dark btn-sm dropdown-toggle w-75" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select
                                </button>
                                    <ul class="dropdown-menu dropdown-menu-dark px-1">
                                        <li>PlayStation</li>
                                        <li>Xbox</li>
                                        <li>Nintendo Switch</li>
                                        <li>Steam</li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-auto d-flex align-items-center mt-1">
                            <div className="me-2">
                                Type-Game:
                            </div>
                            <div class="btn-group">
                                <button class="btn btn-dark btn-sm dropdown-toggle w-75" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select
                                </button>
                                    <ul class="dropdown-menu dropdown-menu-dark px-1">
                                        
                                        <li>Action</li>
                                        <li>Adventure</li>
                                        <li>RPG</li>
                                        <li>Strategy</li>
                                        <li>Sports</li>
                                        <li>Shooter</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="container">
                        <MatchGame/>
                    </div>
            </div>
        </div>
    )
}