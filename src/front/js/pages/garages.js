import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { NavLink, Link } from "react-router-dom";
import { Profile_navbar } from "../component/profile_navbar";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';



export const Garages = () => {
    const { actions, store } = useContext(Context);
    defineElement(lottie.loadAnimation);
    useEffect(() => {
        actions.getGarages();
    }, []);

    return (
        <>
        
            {store.garages.map((garage, index) => (
                <div className="m-5">
                <div className="card" key={index} style={{ width: "18rem" }}>
                    <img src={garage.img_id} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{garage.name}</h5>
                        <p className="card-text">{garage.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">{garage.address}</li>
                        <li className="list-group-item text-center">
                            <Link to={garage.web}>
                            <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                                <lord-icon
                                    src="https://cdn.lordicon.com/gqzfzudq.json"
                                    trigger="hover"
                                    colors="primary:#1663c7,secondary:#0a2e5c"
                                    style={{"width": "30px", "height": "30px"}}>
                                </lord-icon>
                            </Link>
                        </li>
                       
                    </ul>
                    <div className="card-body text-center">
                        <Link to={garage.mail} className="btn ">
                            <i class="fa-solid fa-envelope" style={{"color": "#1c4d82"}}/>
                        </Link>
                        <a href={`tel:${garage.phone}`} className="btn">
                            <i class="fa-solid fa-phone" style={{"color": "#1c4d82"}}/>
                        </a>
                    </div>
                </div>
                </div>
            ))}
        </>
    );
};
