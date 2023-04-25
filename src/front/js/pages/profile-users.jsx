import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, getUserPrivate } from "../services";

export const Profile = props => {
    
    const params = useParams
    const navigate = useNavigate()

    useEffect ( () => {
      let token = localStorage.getItem('token')
        if (token) {
          let userData =  getUserPrivate(token)
            console.log(userData)
        }
        },[])

    return (
        <React.Fragment>

           <h3> HOLA ESTO ES UN AREA PRIVADA </h3>

        </React.Fragment>

    );



};