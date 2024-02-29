import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Jumbotron from "../../img/jumbotron.png";
import "../../styles/museums.css";

export const Museums = () => {
    const { store, actions } = useContext(Context);
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle the state to show/hide the popup
    };

    return (
        <div className="text-center mt-5">
            <div className="">
                <img src={Jumbotron} alt="Museum Jumbotron" onClick={togglePopup} style={{ cursor: 'pointer' }} />
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <button onClick={togglePopup}>Close</button>
                        <h3>HISTORY OF THE MET</h3>
                        <p>The Metropolitan Museum of Art's earliest roots date back to 1866 in Paris, France, when a group of Americans agreed to create a "national institution and gallery of art" to bring art and art education to the American people...</p>
                    </div>
                </div>
            )}
        </div>
    );
};
