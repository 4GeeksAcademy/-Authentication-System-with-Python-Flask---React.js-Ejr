// import React, { useState, useEffect, useContext } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Context } from '../store/appContext'
// import { CoursesContainer } from '../component/CoursesContainer.jsx'
// import { FaCircleArrowLeft } from "react-icons/fa6";


// export const UserDashboard = () => {

//     const { store, actions } = useContext(Context)
//     const navigate = useNavigate()
//     function handleHome() {
//         navigate('/')
//     }
//     const navigateCourses = useNavigate()
//     function handleMyCourses(){
//         navigateCourses('/User/courses')
//     }

//     const navigateProfile = useNavigate()
//     function handleMyProfile(){
//         navigateProfile('/User/profile')
//     }

//     const navigatePayment = useNavigate()
//     function handleMyPayments(){
//         navigatePayment('/User/payments')
//     }

//     return (
//     <div className='d-flex row 'style={{ height: '100vh' }}>
//         <div className='col-3 text-center'> 
//             <p>Dashboard</p>
//             <div className='fs-4' onClick={handleHome}
//                            style={{ cursor: "pointer" }}><FaCircleArrowLeft /></div>                 
//             <button className='btn btn-secondary my-2 w-75' onClick={handleMyCourses}>My courses</button>
//             <button className='btn btn-secondary my-2 w-75' onClick={handleMyProfile}>Profile</button>
//             <button className='btn btn-secondary my-2 w-75'onClick={handleMyPayments}>My Payments</button>
//         </div>
//         <div className='col-9'>
//             <CoursesContainer /> {/* esto deberá ser cambiado por publicidad o algo simi */}
//         </div>
//     </div>
// )
//};    
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { CoursesContainer } from '../component/CoursesContainer.jsx';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { UserProfile } from './UserProfile.jsx';
import { UserPayment } from './UserPayment.jsx';

export const UserDashboard = () => {
    const { store, actions } = useContext(Context);
    
    const [buttonSelected, setButtonSelected] = useState(null)

    const handleMyCourses =()=>{
        setButtonSelected(<CoursesContainer />)
    }
    
    const handleMyProfile =()=>{
        setButtonSelected(<UserProfile />)
    }

    const handleMyPayments=()=>{
        setButtonSelected(<UserPayment />)
    }
    const navigate = useNavigate();

    function handleHome() {
        navigate('/');
    }

    return (
        <div className="d-flex row" style={{ height: '100vh' }}>
            <div className="col-3 text-center">
                <p>Dashboard</p>
                <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                    <FaCircleArrowLeft />
                </div>
                <button className="btn btn-secondary my-2 w-75" onClick={handleMyCourses}>
                    My courses
                </button>
                <button className="btn btn-secondary my-2 w-75" onClick={handleMyProfile}>
                    Profile
                </button>
                <button className="btn btn-secondary my-2 w-75" onClick={handleMyPayments}>
                    My Payments
                </button>
            </div>
            <div className="col-9">
                {buttonSelected}
            </div>
        </div>
    );
};
