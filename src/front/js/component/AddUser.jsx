import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

import { FaCircleArrowLeft } from "react-icons/fa6";

export const AddUser = () => {
    const { store, actions } = useContext(Context);
    const [selectedRole, setSelectedRole] = useState('')
    const [isUsers, setIsUsers] = useState(true)
    const [certificate, setCertificate] = useState()
    const [counter, setCounter] = useState(5)
    const [redirectPath, setRedirectPath] = useState('')
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        username: '',
        numberDocument: '',
        phone: '',
        age: '',
        gender: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'isPeople') {
            setSelectedRole(value)
            let updatedData = {}
            if (value === 'user') {
                updatedData = { isUser: isUsers }
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isTeacher: undefined,
                    isManager: undefined
                }));
            } else if (value === 'teacher') {
                updatedData = { isTeacher: isUsers }
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isManager: undefined,
                    certificateTeacher: certificate
                }));
            } else if (value === 'manager') {
                updatedData = { isManager: isUsers }
                setUserData(prevState => ({
                    ...prevState,
                    ...updatedData,
                    isUser: undefined,
                    isTeacher: undefined
                }));
            }
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    console.log(userData)

    async function handleSubmit(event) {
        event.preventDefault();
        await actions.createUser(userData, selectedRole)
        setCounter(0)
    }

    function handlerGoToLogIn() {
        navigate('/LogIn')
    }

    function handlerHome() {
        navigate('/')
    }

    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath)
        }
    }, [navigate, redirectPath])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter + 1 === 4) {
                    setRedirectPath('/LogIn')
                    clearInterval(interval)
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval)
    }, [setRedirectPath, selectedRole])


    return (
        <div className=' position-relative'>
            <div className=' d-flex justify-content-center position-absolute top-0 start-50 translate-middle-x'>
                <div className={`text-center w-100 ${(counter >= 1 && counter <= 3) ? "alert alert-success" : "d-none"}`} >
                    {"Sing Up Successfully"}
                </div>

            </div>
            <div className="d-flex justify-content-center align-items-center">
                <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{ cursor: "pointer" }}>
                    <FaCircleArrowLeft />
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                    <h1>Record your Personal Data</h1>
                </div>
            </div>
            <form className="container mx-auto mt-5 row g-3 needs-validation" onSubmit={handleSubmit} noValidate>


                <div className='col-md-4'>
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control" aria-describedby="inputGroupPrepend"
                        name='name'
                        onChange={handleChange}
                        value={userData.name}
                        required />
                </div>

                <div className='col-md-4'>
                    <label className="form-label">Last name</label>
                    <input
                        type="text"
                        className="form-control" aria-describedby="inputGroupPrepend"
                        name='lastName'
                        onChange={handleChange}
                        value={userData.lastName}
                        required />
                </div>

                <div className={`col-md-3 ${(selectedRole === 'teacher' || selectedRole === 'user') ? 'd-block' : 'd-none'}`}>
                    <label className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <input
                            type="text"
                            className="form-control" aria-describedby="inputGroupPrepend"
                            name='username'
                            onChange={handleChange}
                            value={userData.username}
                            required />
                    </div>
                </div>

                <div className='col-md-3'>
                    <label className="form-label">Role</label>
                    <div className="input-group has-validation">
                        <select className="form-select" name='isPeople' onChange={handleChange} value={selectedRole} required>
                            <option disabled value="Choose">Choose</option>
                            <option value='teacher'>Teacher</option>
                            <option value='user'>Student</option>
                            <option value='manager'>Manager</option>
                        </select>
                    </div>
                </div>

                <div className={`col-md-4 ${(selectedRole === 'manager') ? 'd-none' : 'd-block'}`}>
                    <label className="form-label">Number Document</label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationTooltip03"
                        name='numberDocument'
                        onChange={handleChange}
                        value={userData.numberDocument}
                        required />
                </div>

                <div className={`col-md-3 ${(selectedRole === 'manager') ? 'd-none' : 'd-block'}`}>
                    <label className="form-label">Gender</label>
                    <select className="form-select" name='gender' onChange={handleChange} value={userData.gender} required>
                        <option disabled value="">--Choose--</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <div className="invalid-tooltip">Please select a Gender</div>
                </div>
                <div className='col-md-4'>
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name='phone'
                        onChange={handleChange}
                        value={userData.phone}
                        required />
                    <div className="invalid-tooltip">Please provide a valid Phone.</div>
                </div>

                <div className={`col-md-1 ${(selectedRole === 'manager') ? 'd-none' : 'd-block'}`}>
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name='age'
                        onChange={handleChange}
                        value={userData.age}
                        required />
                    <div className="invalid-tooltip">Please provide a valid Age.</div>
                </div>

                <div className={`col-md-4 ${(selectedRole === 'teacher') ? 'd-block' : 'd-none'}`}>
                    <label className="form-label">Do you have a Certificate?</label>
                    <input
                        type="number"
                        className="form-control"
                        name='certificateTeacher'
                        onChange={() => { setCertificate(eve.target.value) }}
                        value={certificate}
                        required />
                    <div className="invalid-tooltip">Please provide a valid certificate.</div>
                </div>


                <div className={`col-md-4 ${(selectedRole === 'user') ? 'd-block' : ''}`}>
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name='email'
                        onChange={handleChange}
                        value={userData.email}
                        required />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className={`col-md-4 ${(selectedRole === 'user') ? 'd-block' : ''}`}>
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name='password'
                        onChange={handleChange}
                        value={userData.password}
                        required />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}>Create User</button>

                <div className='col-md my-3 text-center text-decoration-underline' style={{ cursor: "pointer" }}>
                    <a onClick={handlerGoToLogIn}>You already have an accounts.</a>
                </div>
            </form>
        </div>

    );
};

