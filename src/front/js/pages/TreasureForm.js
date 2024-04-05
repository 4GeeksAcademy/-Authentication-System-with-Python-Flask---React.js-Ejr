import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext"

const TreasureForm = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate]);

    return (
        <div className="text-center treasure-form-page">
            <form>
                <h1 className="title-hide pb-4">Hide treasure</h1>
                <div className="hide-input-group pb-4">
                    <label htmlFor="name-treasure">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="treasure-name"
                        placeholder="Enter name of treasure"
                        value="{name}"
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        className="treasure-location"
                        placeholder="Enter location"
                        value="{location}"
                    />
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">City</label>
                    <div className="treasure-city">
                        <input
                            type="text"
                            id="city"
                            className="treasure-image"
                            placeholder="Enter city"
                            value="{city}"
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="pistas">Pistas</label>
                    <div className="treasure-pistas">
                        <input
                            type="text"
                            id="pistas"
                            className="treasure-image"
                            placeholder="Enter your pistas"
                            value="{pistas}"
                        />
                    </div>
                </div>
                <div className="hide-input-group pb-4">
                    <label htmlFor="image">Image</label>
                    <div className="password-input-container">
                        <input
                            type="text"
                            id="image"
                            className="treasure-image"
                            placeholder="Enter your image"
                            value="{image}"
                        />
                    </div>
                </div>
                <div className="button-hide">
                    <button type="submit" className="btn btn-warning">Hide</button>
                </div>
            </form>
        </div>
    )
}

export default TreasureForm
