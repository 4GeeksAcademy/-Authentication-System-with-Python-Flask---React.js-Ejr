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
                        <img src="https://www.finect.com/v4/resources/media/images/1bc0491f2a8746a590b44e05558c2c5b-w1332" alt="Profile" className="profile-image"/>
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