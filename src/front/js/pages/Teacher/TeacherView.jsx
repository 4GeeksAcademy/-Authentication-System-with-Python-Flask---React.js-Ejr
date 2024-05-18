import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD:src/front/js/pages/TeacherView.jsx
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { TeacherDashboard } from "../component/TeacherDashboard.jsx"
import { TeacherNavbar } from "../component/TeacherNavbar.jsx"
=======
import { Context } from "../../store/appContext.js";
import "../../../styles/home.css";
import { TeacherDashboard } from "../../component/Teacher/TeacherDashboard.jsx"
import { TeacherNavbar } from "../../component/Teacher/TeacherNavbar.jsx";
import { TeacherCourses } from "../../component/Teacher/TeacherCourses.jsx"
>>>>>>> edfe974494f657009fbf8cc947b2e416715b53f6:src/front/js/pages/Teacher/TeacherView.jsx



export const TeacherView = () => {
    const { store, actions } = useContext(Context)
    const [user] = useState('teacher')

    useEffect(()=>{
        actions.getUser(user)
    },[user])

    return (
        <div>
            <TeacherNavbar />
            <TeacherDashboard />
        </div>

    )
}