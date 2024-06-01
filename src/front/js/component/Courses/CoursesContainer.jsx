import React, { useState, useContext } from "react";
import { Context } from '../../store/appContext';
import '../../../styles/components.css';
import { useNavigate } from "react-router-dom";
import Course from "../../pages/Courses/Course.jsx";

import { LuHeart } from "react-icons/lu";

export const CoursesContainer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0); // Estado para el índice activo del carrusel

    function handleAddTrolley(titleCourse, courseId, price) {
        actions.addCourseToTrolley(titleCourse, courseId, price);
    }

    console.log(store.modules)

    return (
        <div>
            <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                    {store.course && store.course.access_to_courses && store.course.access_to_courses.length === 0 ? "No hay Cursos Cargados" :
                        store.course && store.course.access_to_courses && store.course.access_to_courses.map((item, index) => {
                            return (
                                <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}> {/* Aquí se establece la clase active según el estado activeIndex */}
                                    <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
                                        <div className="card mx-2 shadow rounded-4 col-12 cardEdit"
                                            onClick={() => navigate(`/course/${item.id}`)}
                                            style={{ maxWidth: '350px', margin: '20px auto' }}>
                                            <div className="card-img-top">
                                                <div className="course-thumbnail">
                                                    <img
                                                        src={item.titleUrlMedia}
                                                        className="img-fluid rounded-top-4"
                                                        alt="python-course"
                                                        style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="card-body rounded-bottom-4" style={{ backgroundColor: (item.id % 2 === 0) ? "#18BEBE" : (item.id % 3 === 0) ? "#3A6F99" : (item.id % 4 === 0) ? "#F6CA1F" : (item.id % 5 === 0) ? "#139895" : "#165D95" }}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h3 className="card-title fw-bolder fs-2 text-white">{item.title}</h3>
                                                    </div>
                                                    <div className="py-2 px-2 border fs-2 rounded-circle d-inline-flex justify-content-center align-items-center text-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                                                        <strong>${item.price}</strong>
                                                    </div>
                                                </div>

                                                <p className="border rounded-pill py-1 px-1 me-3 d-inline-flex text-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>{item.categoryTitle}</p>

                                                <p className="border rounded-pill py-1 px-1 d-inline-flex text-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>Modulos: {item.modulesLength}</p>

                                                <div className="d-flex justify-content-end">

                                                    <button className='py-2 px-2 border fs-2 rounded-circle d-flex justify-content-center align-items-center addEdit text-white' onClick={() => handleAddTrolley(item.title, item.id, item.price)} style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                                                        <LuHeart />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};
