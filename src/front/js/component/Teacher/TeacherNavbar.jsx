import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TeacherNavbar = () => {
    const navigate = useNavigate()
    function handleHomeView() {
        localStorage.removeItem('jwt-token')
        console.log(localStorage.removeItem('jwt-token'))
        navigate('/SignOut')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>
                    <button onClick={handleHomeView} className="btn btn-outline-danger m-1">Sign Out</button>
                </div>
            </nav>
        </div>
    )
}
