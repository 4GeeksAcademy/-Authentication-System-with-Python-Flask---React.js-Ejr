import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext"

export const UserNavbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    function handleHomeView() {
        localStorage.removeItem('jwt-token')
        navigate('/SignOut')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                <div className="col d-flex justify-content-end">
                        {
                            (store.user == '')
                                ? <p className="text-center">Loading...</p>
                                : store.user[`access_to_${store.currentRole}`].map((item, index) => (
                                    <span className='mx-2' key={index}>
                                        <span>Welcome,
                                            <strong> {item.name.toUpperCase()}</strong>
                                            <strong> {item.lastName.toUpperCase()}</strong>
                                        </span>
                                    </span>
                                ))
                        }
                    </div>
                    <button className="btn btn-outline-danger m-1 mx-2" onClick={handleHomeView}>
                        Sign Out
                    </button>
                    <div className='border border-black rounded-pill px-3 py-1'>
                        {store.currentRole}
                    </div>
                </div>
            </nav>
        </div>
    )
}
