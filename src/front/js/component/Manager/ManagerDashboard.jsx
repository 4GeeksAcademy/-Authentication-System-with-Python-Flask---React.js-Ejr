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
import { CourseCard } from '../Courses/CourseCard.jsx';
import { ModuleCourse } from '../Module/ModuleCourse.jsx'
import { QuizzesCourse } from '../Quizzes/QuizzesCourse.jsx';
import { CreateCategory } from './CreateCategory.jsx';
import { GetQuizzes } from './GetQuizzes.jsx';



export const ManagerDashboard = () => {
    const { store, actions } = useContext(Context)
    const [buttonSelected, setButtonSelected] = useState(null)


    const handleCreateCourse = () => {
        setButtonSelected(<PostCourseM />)
    }

    const handleUpdateCourse = () => {
        setButtonSelected(<CourseCard />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<ManagerCourses />)
        actions.getCourse()
    }
    
    const handleMyModule = () => {
        setButtonSelected(<ModuleCourse />)
        actions.getModules()
    }


    const handleMyQuizzes = () => {
        setButtonSelected(<QuizzesCourse />)
        actions.getCourse()
    }

    const handleGetQuizzes = () => {
        setButtonSelected(<GetQuizzes />)
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

    const handleCreateCategory= () => {
        setButtonSelected(<CreateCategory />)
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
                
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyModule}>Create Modules</button>
                
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyQuizzes}>Create Quizzes</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleGetQuizzes}>View Quizzes</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleUpdateCourse}>Update Courses</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>View Courses</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>Profile</button>

                <button className="btn btn-outline-primary my-2 w-75" onClick={handlePayments}>Payments </button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleTeachers}>Teachers</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleUsers}>Users</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={HandleFiles}>Files</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handlePDF}>Certificate</button>

                <button className='btn btn-outline-primary my-2 w-75' onClick={handleCreateCategory}>Create Category</button>
            </div>
            <div className="col-9">
                {buttonSelected}
            </div>
        </div>
    )
}

