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
                <div className="wich-vehicle-container">
                    <div className="text-center wich-title  py-5  my-5">
                        <h1 style={{color: 'white'}}><strong>¿Qué deseas vender?</strong></h1>
                    </div>
                    <div className="choose-vehicle row d-flex justify-content-around mx-1 mx-auto py-4">
                            <Link className="btn btn-vehicle mb-5" to="/upload-car"><FontAwesomeIcon icon={faCar} size="2xl" /></Link>

                            <Link className="btn btn-vehicle mb-5" to="/upload-motorcycle"><FontAwesomeIcon icon={faMotorcycle} size="2xl"/></Link>

                    </div>

                    
                </div>

            </div>
        </div>
        
        
        
        </>
    )
}