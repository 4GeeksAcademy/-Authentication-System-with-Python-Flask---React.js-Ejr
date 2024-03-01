import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Jumbotron from "../../img/jumbotron.png";
import "../../styles/museums.css";

export const Museums = () => {
    const { store, actions } = useContext(Context);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    return (
        <div className="content-container"> {/* This container will wrap your content and push the footer down */}
            <div className="text-center mt-5">
                <div className="image-frame-container">
                    <div className="image-frame">
                        <img src={Jumbotron} alt="Museum Jumbotron" onClick={togglePopup} />
                    </div>
                </div>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-inner">
                            <h3>The Metropolitan Museum of Art</h3>
                            <h5>New York, New York</h5>
                            <h4>History of the MET</h4>
                            <p>The Metropolitan Museum of Art's earliest roots date back to 1866 in Paris, France...</p>
                            <button onClick={togglePopup}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

