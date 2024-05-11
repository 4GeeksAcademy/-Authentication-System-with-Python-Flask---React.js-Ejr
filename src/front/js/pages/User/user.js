import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendly from "../../component/User/calendar.jsx";

import { Context } from "../../store/appContext";

export const User = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <Calendly />
        </div>
    );
};