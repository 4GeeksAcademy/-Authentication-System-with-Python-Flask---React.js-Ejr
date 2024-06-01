import React, { useContext, useState } from 'react';
import { Context } from "../../store/appContext.js";
import { AddNewUser } from './AddNewUser.jsx';
import { AddUser } from '../AddUser.jsx';

import { FaUserGraduate } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";

export const WelcomeManager = () => {
    const { store, actions } = useContext(Context);
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    };

    return (
        <div className="container-fluid" style={{ position: "relative", textAlign: "center", height: "100vh", padding: 0, margin: 0 }}>
            
            <div>
                <img src="https://blogimages.softwaresuggest.com/blog/wp-content/uploads/2021/03/10192552/Top-8-Project-Management-Blogs-Every-Manager-Must-Follow.png" class="img-fluid opacity-50" alt="Manager" style={{ height: "50vh", width: "100%", objectFit: "cover" }} />
            </div>
            <div className='text-black fw-bolder rounded-pill' style={{ position: "absolute", top: "20%", width: "100%", color: "white" }}>

                <h1 className='fs-1 fw-bolder'>Welcome, Manager!</h1>

                <h5>It's setup time...</h5>
            </div>
            <div className="container-fluid">
                <div className='row d-flex justify-content-center'>
                    <div className="col-5 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">
                        {/* Title*/}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <BsFillPersonLinesFill />
                            </div>
                            <div>
                                <h3>Students Information</h3>
                            </div>
                        </div>

                        <div className="row w-100">
                            <div className="col-12">
                                <div
                                    className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                    style={{
                                        backgroundColor: '#AAAAAA'
                                    }}
                                >
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflowX: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Name
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Last Name
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Email
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Number Document
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Phone
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Username
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Gender
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {store.user.access_to_user.length === 0
                            ? "No hay user cargados"
                            : store.user.access_to_user.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div
                                            className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                            style={{
                                                backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8'
                                            }}
                                        >
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflowX: 'auto' }}>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.name}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.lastName}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.email}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.numberDocument}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.phone}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.username}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.gender}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="col-6 border rounded-4 my-3 mx-3 px-2 py-2 d-flex flex-column align-items-center">

                        {/* Title*/}
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='p-3 mx-3 border rounded-circle d-flex justify-content-center align-items-center'>
                                <FaUserGraduate />
                            </div>
                            <div>
                                <h3>Teachers Information</h3>
                            </div>
                        </div>

                        <div className="row w-100">
                            <div className="col-12">
                                <div
                                    className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                    style={{
                                        backgroundColor: '#AAAAAA'
                                    }}
                                >
                                    <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflowX: 'auto' }}>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            #
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Name
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Last Name
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Email
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Number Document
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Phone
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Username
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Gender
                                        </a>
                                        <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                            Certificate Teacher
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {store.user.access_to_teacher.length === 0
                            ? "No hay teacher cargados"
                            : store.user.access_to_teacher.map((item) => (
                                <div className="row w-100" key={item.id}>
                                    <div className="col-12">
                                        <div
                                            className="rounded-2 d-flex justify-content-between align-items-center my-2 py-2 ps-2 pe-0 position-relative w-100"
                                            style={{
                                                backgroundColor: item.id % 2 === 0 ? '#F0F0F0' : '#C8C8C8'
                                            }}
                                        >
                                            <div className="rounded-2 d-flex justify-content-between w-100" style={{ overflowX: 'auto' }} >
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.id}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.name}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.lastName}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '50%' }}>
                                                    {item.email}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.numberDocument}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.phone}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.username}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.gender}
                                                </a>
                                                <a className="text-decoration-none text-dark m-3" style={{ cursor: 'pointer', width: '10%' }}>
                                                    {item.certificateTeacher}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
            </div>
        </div>
    );
};
