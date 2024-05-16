import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'
import { CoursesContainer } from '../component/CoursesContainer.jsx'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { UserNavbar } from '../component/UserNavbar.jsx';
import { UserDashboard } from '../component/UserDashboard.jsx';


export const UserView = () => {
    
    return (
        <>
            <UserNavbar />
            <UserDashboard />
        </>
    )
}