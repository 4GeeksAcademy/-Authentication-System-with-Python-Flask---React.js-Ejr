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
import { TeacherProfile } from './TeacherProfile.jsx';

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

    const handleProfile = () => {
        setButtonSelected(<TeacherProfile />)
    }

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

    const handlePostCourse = () => {
        setButtonSelected(<PostCourse />)
    }

    const handleQuizzes = () => {
        setButtonSelected(<QuizzForm />)
    }


    return (
        <div className="row">
        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">CLICK</button>

        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="text-center">
                    <p>Dashboard</p>
                    <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                        <FaCircleArrowLeft />
                        <h1>Welcome!</h1>
                        <h5>Manager</h5>
                    </div>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleProfile}>Profile</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>My courses</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyStudents}>My students</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyFiles}>My files</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyPayment}>Payment history</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleSettings}>Settings</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handlePDF}>Certificate</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handlePostCourse}>Post course</button>
                    <button className="btn btn-outline-primary my-2 w-75" onClick={handleQuizzes}>Quizz</button>
                </div>
            </div>
        </div>

        <div className="col border border-secondary d-flex justify-content-center align-items-center">
            {buttonSelected ? (
                <div className="col-9">
                    {buttonSelected}
                </div>
            ) : (
                <div>
                    <h1>Contenido de Bienvenida</h1>
                </div>
            )}
        </div>
    </div>
    );
};