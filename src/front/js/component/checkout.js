import React, { useContext, useState, useEffect  } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/profile.css";
import { Context } from "../store/appContext";

export const Checkout = () => {
    const {store, actions} = useContext(Context)

    function imgError(e) {
        e.target.src = "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

    return (

    )
}

export default Checkout;