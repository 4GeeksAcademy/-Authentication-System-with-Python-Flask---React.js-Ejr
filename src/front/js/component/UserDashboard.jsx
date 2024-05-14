import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'
import { CoursesContainer } from '../component/CoursesContainer.jsx'
import { FaCircleArrowLeft } from "react-icons/fa6";
// import { BarraUser } from './BarraUser.jsx';

export const UserDashboard = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }

    return (
    <div className='d-flex row 'style={{ height: '100vh' }}>
        <div className='col-3 text-center'> 
            <p>Dashboard</p>
            <div className='fs-4' onClick={handleHome}
                           style={{ cursor: "pointer" }}><FaCircleArrowLeft /></div>                 
            <button className='btn btn-secondary my-2 w-75'>My courses</button>
            <button className='btn btn-secondary my-2 w-75'>Profile</button>
            <button className='btn btn-secondary my-2 w-75'>My Payments</button>
        </div>
        <div className='col-9'>
            <CoursesContainer />
        </div>
    </div>
)
    
}
