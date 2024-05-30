
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext.js';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { UserProfile } from './UserProfile.jsx';
import { UserPayment } from './UserPayment.jsx';
import { Certificate } from './Certificate.jsx';
import { CoursesContainer } from '../Courses/CoursesContainer.jsx';


export const UserDashboard = () => {
    const { store, actions } = useContext(Context);

    const [buttonSelected, setButtonSelected] = useState(null)

    const handleMyCourses = () => {
        setButtonSelected(<CoursesContainer />)
        actions.getCourse()
    }

    const handleMyProfile = () => {
        setButtonSelected(<UserProfile />)
    }

    const handleMyPayments = () => {
        setButtonSelected(<UserPayment />)
    }

    const handleCertificate = () => {
        setButtonSelected(<Certificate />)
    }

    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
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
                        
                        {/* <div className='col-12 w-100'>

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

                        </div> */}

                        <div className='col-12 w-100'>
                            <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>
                                My courses
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>
                                Profile
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyPayments}>
                                My Payments
                            </button>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary my-2 w-75" onClick={handleCertificate}>
                                Certificate
                            </button>
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
    )
}
