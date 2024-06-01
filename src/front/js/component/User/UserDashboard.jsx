
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext.js';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { UserProfile } from './UserProfile.jsx';
import { UserPayment } from './UserPayment.jsx';
import { Certificate } from './Certificate.jsx';
import { CoursesContainer } from '../Courses/CoursesContainer.jsx';
import { HistoryCourses } from './HistoryCourses.jsx';


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

    const handleHistoryCourses = () => {
        setButtonSelected(<HistoryCourses />)
    }

    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    return (
        <div>

            <div className="row">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">CLICK</button>

                <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="text-center">

                            <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                                <h1>Welcome!</h1>
                                <h5>Student</h5>
                                <FaCircleArrowLeft />
                            </div>

                            <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>
                                My courses
                            </button>

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
                            <div>
                                <button className="btn btn-outline-primary my-2 w-75" onClick={handleHistoryCourses}>
                                    History Courses
                                </button>
                            </div>

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
                                
                            </div>
                    }

                </div>
            </div >
        </div >

    )
}
