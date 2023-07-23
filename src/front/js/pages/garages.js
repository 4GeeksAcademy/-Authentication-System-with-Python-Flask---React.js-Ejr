import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import "/workspaces/Watacar_v2/src/front/styles/garages.css";
import { Placeholder_garages } from "./placeholder_garages";

export const Garages = () => {
    const { actions, store } = useContext(Context);
    defineElement(lottie.loadAnimation);

    useEffect(() => {
        actions.getGarages();
    }, []);

    return (
        <div>
            {store.garages ? (
                store.garages.map((garage, index) => (
                    <div className="m-5 textGarage" key={index}>
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={garage.img_id} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title textGarage">{garage.name}</h5>
                                <p className="card-text textGarage">{garage.description}</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-center textAddress">{garage.address}</li>
                                <li className="list-group-item text-center">
                                    <ul><li className="text-center webLi mb-2">Sitio Web</li></ul>
                                    <a href={garage.web}>
                                        <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/gqzfzudq.json"
                                            trigger="hover"
                                            colors="primary:#1663c7,secondary:#0a2e5c"
                                            style={{ width: "50px", height: "50px", fontSize: "30px" }}
                                        ></lord-icon>
                                    </a>
                                </li>
                            </ul>
                            <div className="card-body d-flex justify-content-around">
                                <Link to={garage.mail} className="btn">
                                    <i className="fa-regular fa-envelope" style={{ fontSize: "30px", color: "#1c4d82" }} />
                                </Link>
                                <a href={`tel:${garage.phone}`} className="btn">
                                    <i className="fa-solid fa-phone" style={{ fontSize: "30px", color: "#1c4d82" }} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <Placeholder_garages />
            )}
        </div>
    );
};
