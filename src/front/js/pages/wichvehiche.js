import React from "react";
import { Link } from "react-router-dom";
import "/workspaces/Watacar_v2/src/front/styles/uploadproduct.css"
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIconName, faMotorcycle } from "@fortawesome/free-solid-svg-icons"; 


export const WichVehicle = () => {


    return (
        <>
        <div className="wich-vehicle-bg">
            <div className="container">
                <div className="wich-vehicle-container ">
                    <div className="text-center wich-title">
                        <h2 style={{color: 'white'}}><strong>¿Qué deseas vender?</strong></h2>
                    </div>
                    <div className="choose-vehicle row d-flex justify-content-center">
                            <a className="btn btn-vehicle me-5" href="/upload-car"><FontAwesomeIcon icon={faCar} size="2xl" /></a>

                            <a className="btn btn-vehicle ms-5" href="/upload-motorcycle"><FontAwesomeIcon icon={faMotorcycle} size="2xl"/></a>

                    </div>

                    
                </div>

            </div>
        </div>
        
        
        
        </>
    )
}