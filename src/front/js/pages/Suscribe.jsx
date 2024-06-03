import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/components.css';

export const Suscribe = () => {
    const courses = [
        { title: "Por 15 dias", price: "$15" },
        { title: "Susbribete a todo los Course", price: "$35" },
        { title: "Con certificado", price: "$40" },
    ];

    return (
        <div className="container-fluid d-flex justify-content-center" styles={{ height: "100vh" }}>
            {courses.map((course, index) => (
                <div key={index} className='card border-0 cardEdit shadow rounded-5 text-white bg-dark col-xxl-3 col-xl-3 col-lg-4 col-md-5 col-sm-12 me-3' style={{ width: "20rem", height: "50vh" }}>
                    <div className="card-body rounded-4 p-3 d-flex flex-column justify-content-center align-items-center" style={{
                        backgroundColor: (index % 2 === 0) ? "#165D95" : "#3A6F99"
                    }}>

                        <div>
                            <h3 className="card-title fw-bolder fs-5 text-white">{course.title}</h3>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <p className="border rounded-pill fs-3 py-1 px-1 me-3 d-inline-flex text-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>{course.price}</p>
                        </div>

                        <div className="py-2 px-2 border fs-6 rounded-pill d-inline-flex justify-content-center align-items-center btnFav">
                            <strong>subscribe</strong>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
