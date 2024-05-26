import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../component/Navbar.jsx";
import { CoursesContainer } from "../component/Courses/CoursesContainer.jsx";
import { TeacherCourses } from "../component/Teacher/TeacherCourses.jsx";



export const Home = () => {
    const { store, actions } = useContext(Context);


    return (
        <div>
            <Navbar />
            
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://content.cuerpomente.com/medio/2023/10/17/atlas_20b57cee_231017144606_1200x630.jpg" className="d-block w-100" alt="Atlas" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://miro.medium.com/v2/resize:fit:1400/0*tzFGcWiy64pwb7NU.png" className="d-block w-100" alt="Lenguajes de programación" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://firebase.google.com/static/images/products/realtime-database/database-3.png?hl=es-419" className="d-block w-100" alt="Bases de datos" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <CoursesContainer />
        </div>
    );
}
