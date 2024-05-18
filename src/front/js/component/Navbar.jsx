import React, { useState, useEffect, useContext} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {
    const { store, actions } = useContext(Context)

    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">Atlas learning</a>
                    <div className="d-flex">
                       
                            {
                              localStorage.getItem('jwt-token')
                                ? <p>estoy aqui</p>
                                : <div>
                                    <Link to='/FormUser'>
                                <button className='btn btn-outline-success m-1' >Sign Up</button>
                            </Link>
                            <Link to='/logIn'>
                                <button className="btn btn-outline-success m-1" >Log In</button>
                            </Link>
                                </div>
                            }
                            
                    

                        <button className='btn btn-outline-success m-1'><i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#13ec49" }}></i></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
