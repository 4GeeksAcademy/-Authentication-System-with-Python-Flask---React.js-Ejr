import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserNavbar = () => {
    const navigate = useNavigate()
    function handleHomeView() {
        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>



                    <button onClick={handleHomeView} className="btn btn-outline-danger m-1">Go back home</button>





                </div>
            </nav>
        </div>
    )
}
