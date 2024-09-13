import React from "react";
import "../../styles/platform_selection.css"
import logo from "../../img/logo/logo-marca.png"
import xbox from "../../img/platform_games/xbox.png"
import nintendo from "../../img/platform_games/switch.png"
import steam from "../../img/platform_games/steam.png"
import playstation from "../../img/platform_games/playstation.png"


export const PlatformSelection = () => {
    return (
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="container text-center my-auto">
            <div className="row justify-content-center align-items-center">
                <h2 className="mb-5 fw-bold" >Favorite Platforms</h2>
                <div className="col-md-6 mb-3">
                    <div className="genre-card">
                        <img  src={playstation} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">PlayStation</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="genre-card">
                        <img src={xbox} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Xbox</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="genre-card">
                        <img src={nintendo} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Nintendo Switch</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="genre-card">
                        <img src={steam} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Steam</p>
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