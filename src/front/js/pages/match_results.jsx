import React from "react";
import logo from "../../img/logo/logo-marca.png"
import { GameSelected } from "../component/match_results/game_selected.jsx";
import { MatchPeople } from "../component/match_results/match_people.jsx";
import "../../styles/genre_selection.css"

export const MatchResults = () => {
    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: 'contain'}} />
            <div className="container text-center my-auto mt-5">
                <div className="row">
                    <h2 className="mb-5 fw-bold">Match Results</h2>
                    <div className="col-md-4 mb-2 d-flex justify-content-center">
                        <GameSelected />
                    </div>
                    <div className="col-md-8 mb-2 d-flex px-0">
                        <div className="bg-dark border-0 rounded p-2 m-2 w-100 text-start">
                            <div className="container px-0">
                                <div className="row">
                                    <h4 className="">Results:</h4>
                                </div>
                                    <MatchPeople/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}