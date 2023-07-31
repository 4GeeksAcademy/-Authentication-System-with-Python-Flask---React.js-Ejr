import React from 'react'
import { Link } from 'react-router-dom'
import SignUpUser from '../component/SignUpUser.jsx'
import SignUpBusiness from '../component/SignUpBusiness'
import ForgotPassword from './ForgotPassword.jsx'

const SignupGeneralView = () => {
    return (
        <div className='container'>
            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">¿Eres viajero?</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">¿Eres empresa?</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">¿Olvidaste tu contraseña?</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><SignUpUser /></div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><SignUpBusiness /></div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><ForgotPassword /></div>
            </div>




        </div>
    )
}

export default SignupGeneralView