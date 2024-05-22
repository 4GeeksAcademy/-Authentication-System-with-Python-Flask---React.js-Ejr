import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Certificate } from '../User/Certificate.jsx';

import { ManagerCourses } from '../Manager/ManagerCourses.jsx';
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';
import { Payments } from './Payments.jsx';
import { Teachers } from './Teachers.jsx';
import { ActiveUsers } from './ActiveUsers.jsx';
import { GeneralFiles } from '../Manager/GeneralFiles.jsx';
import { PostCourseM } from './PostCourseM.jsx';


export const ManagerDashboard = () => {
    const { store, actions } = useContext(Context)
    const [buttonSelected, setButtonSelected] = useState(null)

    const handleCreateCourse = () => {
        setButtonSelected(<PostCourseM />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<ManagerCourses />)
        actions.getCourse()
    }

    const handleMyProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handlePayments = () => {
        setButtonSelected(<Payments />)
    }

    const handleTeachers = () => {
        setButtonSelected(<Teachers />)
        actions.getUser()
    }

    const handleUsers = () => {
        setButtonSelected(<ActiveUsers />)
        actions.getUser()
    }

    const HandleFiles = () => {
        setButtonSelected(<GeneralFiles />)
    }

    const handlePDF = () => {
        setButtonSelected(<Certificate />)
    }

    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }
    return (
        <div className="row" style={{ height: '200vh' }}>
            <div className="col-3 text-center">
                <p>Dashboard</p>
                <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                    <FaCircleArrowLeft />
                    <h1>Welcome!</h1>
                    <h5>Manager</h5>
                </div>
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleCreateCourse}>Create Courses</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>View Courses</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>Profile</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handlePayments}>Payments </button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleTeachers}>Teachers</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleUsers}>Users</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={HandleFiles}>Files</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handlePDF}>Certificate</button>
            </div>
            <div className="col-9">
                {buttonSelected}
            </div>
        </div>
    )
}

