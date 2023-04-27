import React, { useState, useEffect } from "react";
import { getUserPrivate } from "../services";
import { useNavigate } from "react-router-dom";

export const Profile = props => {

  const navigate = useNavigate()


  const [data, setData] = useState({})

  async function getProfile () {
    let token = localStorage.getItem('token')
    if(token){
    const dataFromFetch = await getUserPrivate()
    setData(dataFromFetch)
    return dataFromFetch}
    navigate("/login")
  }
 
  useEffect(() => {
    const fetchData = async () => {getProfile()} ;
    fetchData();} ,[]);

  return (
    <React.Fragment>

<div className="container text-center my-2" id="profile-worker">
      <div className="row">
        <div className="col-lg-3">
          <img id="imagenContacto" src="data:image/png;base64,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" />
        </div>
        <div className="col-lg-7">
          <p id="nombre-contacto"><strong>{data.name} {data.last_name}</strong></p>
          <div className="iconos my-1"> {data.user_name}</div>
          <div className="iconos my-1"> {data.email}</div>
          <div className="iconos my-1"> {data.data_create}</div>
        </div>
        <div className="col-lg-2 d-flex">
        <i className="fa-solid fa-pen-clip fa-xl mt-3 mx-4"  title="Editar Contacto"></i>
         
        </div>

      </div>
    </div>

    </React.Fragment>

  );



};