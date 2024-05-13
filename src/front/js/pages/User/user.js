import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendly from "../../component/User/calendar.jsx";

import { Context } from "../../store/appContext";
import Exercises from "../../component/User/exercises.jsx";

export const User = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <Calendly />
            <Exercises />
        </div>
    );
};