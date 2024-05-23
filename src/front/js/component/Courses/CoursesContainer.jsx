import React, { useState, useContext } from "react";
import { Context } from '../../store/appContext'
import '../../../styles/components.css';
import { useNavigate } from "react-router-dom";




export const CoursesContainer = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleViewCourses = () => {
        navigate(<Course />)
    }

    function handleAddTrolley() {
        actions.addCourseToTrolley()
    }


    return (
        <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
            {store.course && store.course.access_to_courses && store.course.access_to_courses.length === 0 ? "No hay Cursos Cargados" :
                store.course && store.course.access_to_courses && store.course.access_to_courses.map((item, index) => {
                    return (
                        <div key={index}>
                            {
                                (store.spinner)
                                    ? <div className="d-flex justify-content-center">
                                        <div>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="text-center">Loading...</p></div>
                                    </div>
                                    : <div className="card mx-2 shadow" style={{ width: "18rem", height: "auto", paddingTop: "20px", paddingBottom: "20px" }}>
                                        <div className="card-img-top">
                                            <div className="course-thumbnail">
                                                <img
                                                    src="https://i.blogs.es/1d8a5b/python1/1024_2000.jpg"
                                                    className="img-fluid"
                                                    alt="python-course"
                                                    style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">{item.categorytitle}</p>
                                            <p className="card-text"><strong>$</strong>{item.price}</p>
                                            <p>Modulos: {item.modulesLength}</p>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="btn btn-primary" onClick={handleViewCourses}>
                                                    View Course
                                                </button>
                                                <button type="button" className="btn btn-success" onClick={handleAddTrolley}>
                                                    Buy Course
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                    );
                })}
        </div>
    );
};