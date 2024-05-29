import React, { useState, useContext } from "react";
import { Context } from '../../store/appContext';
import '../../../styles/components.css';
import { useNavigate } from "react-router-dom";
import Course from "../../pages/Courses/Course.jsx";

export const CoursesContainer = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function handleAddTrolley(titleCourse, courseId, price) {
        actions.addCourseToTrolley(titleCourse, courseId, price);
    }

    console.log(store.modules);

    return (
        <div>
            <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
                {store.course && store.course.access_to_courses && store.course.access_to_courses.length === 0 ? "No hay Cursos Cargados" :
                    store.course && store.course.access_to_courses && store.course.access_to_courses.map((item, index) => {
                        return (
                            <div key={index}>
                                {store.spinner ? (
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="text-center">Loading...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card mx-2 shadow" style={{ width: "18rem", height: "auto", paddingTop: "20px", paddingBottom: "20px" }}>
                                        <div className="card-img-top">
                                            <div className="course-thumbnail">
                                                <img
                                                    src={item.titleUrlMedia}
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
                                                <button type="button" className="btn btn-primary" onClick={() => navigate(`/course/${item.id}`)}>
                                                    View Course
                                                </button>
                                                <button type="button" className="btn btn-success" onClick={() => handleAddTrolley(item.title, item.id, item.price)}>
                                                    Add to trolley
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
            <div className="d-flex overflow-auto justify-content-center p-4 flex-wrap">
                {store.modules && store.modules.Modules ? (
                    store.modules.Modules.length === 0 ? "No hay Modules" :
                        store.modules.Modules.map((item, index) => (
                            <div key={index}>
                                <p>{item.title}</p>
                                <video controls className="img-fluid">
                                    <source src={item.urlVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))
                ) : (
                    "Loading modules..."
                )}
            </div>
        </div>
    );
};
