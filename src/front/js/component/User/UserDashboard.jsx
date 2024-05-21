  
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext.js';
import { CoursesContainer } from '../Courses/CoursesContainer.jsx';
import Courses from '../../pages/Courses/Courses.jsx';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { UserProfile } from './UserProfile.jsx';
import { UserPayment } from './UserPayment.jsx';
import { Certificate } from '../Manager/Certificate.jsx';

export const UserDashboard = () => {
    const { store, actions } = useContext(Context);
    
    const [buttonSelected, setButtonSelected] = useState(null)

    const handleMyCourses =()=>{
        setButtonSelected(<Courses />)
    }
    
    const handleMyProfile =()=>{
        setButtonSelected(<UserProfile />)
    }

    const handleMyPayments=()=>{
        setButtonSelected(<UserPayment />)
    }

    const handleCertificate=()=>{
        setButtonSelected(<Certificate/>)
    }

    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    return (
        <div className="d-flex row" style={{ height: '200vh' }}>
            <div className="col-3 text-center">
                <p>Dashboard</p>
                <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                    <FaCircleArrowLeft />
                    <h1>Welcome!</h1>
                    <h5>User</h5>
                </div>
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>
                    My courses
                </button>
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>
                    Profile
                </button>
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyPayments}>
                    My Payments
                </button>
                <button className="btn btn-outline-primary my-2 w-75" onClick={handleCertificate}>
                    Certificate
                </button>
            </div>
            <div className="col-9">
                {buttonSelected}
            </div>
        </div>
    );
};
