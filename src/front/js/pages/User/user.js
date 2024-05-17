import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendly from "../../component/User/calendar.jsx";

import { Context } from "../../store/appContext";
import Exercises from "../../component/User/exercises.jsx";
import SearchExercises from "../../component/User/searchExercises.jsx";
import UserRoutine from "../../component/User/showRutine.jsx";

export const User = () => {
    const { store, actions } = useContext(Context);
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');

    return (
        <div>
            <UserRoutine />
            <Calendly />
            <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
            <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
        </div>
    );
};