import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { TeacherDashboard } from "../component/TeacherDashboard.jsx"
import { TeacherNavbar } from "../component/TeacherNavbar.jsx";
import { TeacherCourses } from "../component/TeacherCourses.jsx"



export const TeacherView = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <TeacherNavbar />
            <TeacherDashboard />
        </div>

    )
}