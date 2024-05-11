import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../store/appContext";
import MainView from "../../component/Landing/mainView.jsx";

import "../../../styles/Landing-styles/landing.css"

export const Landing = () => {
    const { store, actions } = useContext(Context);

    return (


        <MainView />


    );
};