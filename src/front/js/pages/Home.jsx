import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../component/Navbar.jsx";
import { CoursesContainer } from "../component/Courses/CoursesContainer.jsx";
import { Carousel } from "./Carousel.jsx";
import { PaypalPayment } from "../component/PaypalPayment.jsx";



export const Home = () => {
    const { store, actions } = useContext(Context);


    return (
        <div>
            <Navbar />
            <Carousel />
            
            <div className="border border-black border-pill my-3 p-3">
                <PaypalPayment />
            </div>

            <CoursesContainer />
        </div>
    );
}
