import React from "react";
import logo from "../../img/logo/logo-marca.png"

export const AgeVerification = () => {
    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="container text-center my-auto">
            <div className="row justify-content-center align-items-center">
                <h2 className="mb-5 fw-bold" style={{color:"#8C67F6"}}>GDPR</h2>
                <div className="col-md-6 mb-3">
                    <p className="fs-5">
                    I confirm that I am <b>at least 13 years old</b> and consent to the processing of my data in accordance with the GDPR for the purpose of finding and matching with other players to enjoy gaming together.
                    </p>
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