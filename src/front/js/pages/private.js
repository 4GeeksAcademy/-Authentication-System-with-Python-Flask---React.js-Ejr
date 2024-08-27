import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/private.css";

export const Private = () => {
    const navigate = useNavigate();

    const goToHomeAndReload = () => {
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="private-body">
            <div className="private-container">
                <div className="private-container-left">
                    <div className="image-container">
                        <img src="https://cdn.prod.website-files.com/654506076ba62ddb88e187e2/65cf7e29b660bdc3aea4ba26_Untitled-design-14.jpeg" alt="Profile" className="profile-image"/>
                    </div>
                    <h1>Ya estás Logueado</h1>
                </div>
                <div className="private-container-right">
                    <form>
                        <button onClick={goToHomeAndReload}>Ir a Home</button>
                    </form>
                </div>
            </div>
        </div>
    );
}