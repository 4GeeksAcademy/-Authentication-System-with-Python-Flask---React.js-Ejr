import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext.js'

import { FaCircleArrowLeft } from "react-icons/fa6";
import { TeacherCourses } from '../Teacher/TeacherCourses.jsx'
import { TeacherStudents } from './TeacherStudents.jsx';
import { TeacherFiles } from './TeacherFiles.jsx';
import { TeacherMyPayment } from './TeacherMyPayment.jsx';
import { TeacherSettings } from './TeacherSettings.jsx';
import { UploadFile } from './UploadFile.jsx';
import { PostCourse } from './PostCourse.jsx';
import { QuizzForm } from './QuizzForm.jsx';

export const TeacherDashboard = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    const [buttonSelected, setButtonSelected] = useState(null)

    const handleMyCourses = () => {
        setButtonSelected(<TeacherCourses />)
    }

    const [user] = useState('user')
    const handleMyStudents = () => {
        setButtonSelected(<TeacherStudents />)
        actions.getUser()
    }

    const handleMyFiles = () => {
        setButtonSelected(<TeacherFiles />)
    }

    const handleMyPayment = () => {
        setButtonSelected(<TeacherMyPayment />)
    }
    const handlePDF = () => {
        setButtonSelected(<UploadFile />)
    }

    const handleSettings = () => {
        setButtonSelected(<TeacherSettings />)
    }

    const handlePostCourse=()=>{
        setButtonSelected(<PostCourse />)
    }

    const handleQuizzes=()=>{
        setButtonSelected(<QuizzForm />)
    }


    return (
        <div>
            <div className='row' >

                <div className='col-3 border border-secondary text-center'>
                    <div className='text-center my-3 d-flex align-items-center justify-content-center'>

                        <div className='fs-4' onClick={handleHome} style={{ cursor: "pointer" }}>
                            <FaCircleArrowLeft />
                        </div>
                        <div>
                            <h3 className='text-center d-inline mx-2'>Welcome!</h3>
                        </div>
                    </div>
                    <div>
                        <div className='border-bottom w-100 mx-1 my-3 pb-3'><h5 className='fw-bolder'>Profile</h5></div>

                        <div className='col-12 w-100'>

                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleMyCourses}>My courses</button>
                        </div>

                        <div className='col-12 w-100'>

                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleMyStudents} >My students</button>
                        </div>

                        <div className='col-12 w-100'>

                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleMyFiles} >My files</button>
                        </div>


                        <div className='col-12 w-100'>

                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleMyPayment}>Payment history</button>

                        </div>

                        <div className='col-12 w-100'>

                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleSettings}>Settings</button>
                            
                        </div>
                        <div>
                            <button className='btn btn-outline-primary my-2 w-75' onClick={handlePDF}>Certificate</button>
                        </div>
                        <div>
                            <button className='btn btn-outline-primary my-2 w-75' onClick={handlePostCourse}>Post course</button>
                        </div>
                        <div>
                            <button className='btn btn-outline-primary my-2 w-75' onClick={handleQuizzes}>Quizz</button>
                        </div>
                    </div>
                </div>


                <div className='col border border-secondary d-flex justify-content-center align-items-center'>
                    {
                        (buttonSelected)
                            ? <div className="col-9">
                                {buttonSelected}
                            </div>
                            : <div>
                                <h1>Contenido de Bienvenida</h1>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};