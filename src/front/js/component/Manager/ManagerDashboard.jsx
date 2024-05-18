import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaCircleArrowLeft } from 'react-icons/fa6';
<<<<<<< HEAD:src/front/js/component/ManagerDashboard.jsx
import { ManagerCourses } from './ManagerCourses.jsx';
import { ManagerProfile } from './ManagerProfile.jsx';
import { Payments } from './Payments.jsx';
import  Teachers  from './Teachers.jsx';
import { ActiveUsers } from './ActiveUsers.jsx';
import { GeneralFiles } from './GeneralFiles.jsx';
import { Certificate } from './Certificate.jsx';
=======
import { ManagerCourses } from '../Manager/ManagerCourses.jsx';
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';
import { Payments } from '../Payments.jsx';
import  {Teachers}  from '../Teacher/Teachers.jsx';
import { ActiveUsers } from '../User/ActiveUsers.jsx';
import { GeneralFiles } from '../Manager/GeneralFiles.jsx';
>>>>>>> edfe974494f657009fbf8cc947b2e416715b53f6:src/front/js/component/Manager/ManagerDashboard.jsx

export const ManagerDashboard = () => {

    const [buttonSelected, setButtonSelected] = useState(null)

    const handleMyCourses=()=>{
        setButtonSelected(<ManagerCourses />)
    }

    const handleMyProfile =()=>{
        setButtonSelected(<ManagerProfile />)
    }

    const handlePayments =()=>{
        setButtonSelected(<Payments />)
    }

    const handleTeachers=()=>{
        setButtonSelected(<Teachers />)
    }

    const handleUsers =()=>{
        setButtonSelected(<ActiveUsers/>)
    }
    
    const HandleFiles=()=>{
        setButtonSelected(<GeneralFiles />)
    }

    const handlePDF=()=>{
        setButtonSelected(<Certificate />)
    }

    const navigate = useNavigate()
    function handleHome(){
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
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>Courses</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>Profile</button>
                
                <button className="btn btn-outline-primary my-2 w-75" onClick={handlePayments}>Payments </button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleTeachers}>Teachers</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleUsers}>Users</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={HandleFiles}>Files</button>

                <button className='btn btn-outline-primary my-2 w-75'onClick={handlePDF}>Certificate</button>
            </div>
            <div className="col-9">
                {buttonSelected}
            </div>
        </div>
  )
}

