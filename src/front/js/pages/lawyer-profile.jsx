import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import UserInfo from "../component/UserInfo.jsx";


export const LawyerProfile = () => {
  const params = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [lawyer, setLawyer] = useState({});
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lawyerId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)

        const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

        if (!lawyerId) { //si no hemos usado la ruta con id, estamos entrando por TOKEN
          const lawyerData = await getUserPrivate(token); //se llama a la función que obtiene los datos de usuario a partir del token y los guardamos en una const
          setUser(lawyerData); //seteamos el useState de USER
          setLawyer(lawyerData.lawyer); //seteamos el useState de COMPANY
          setLogin(true); //seteamos el useState LOGIN a TRUE, para poder editar todos los campos del formulario
        } else { //si hemos usado la ruta con ID
          //primero obtenemos los datos de la empresa que se pintan en pantalla
          const info = await userById(lawyerId); //llamamos a la función que obtiene un USER filtrando por su ID
          setUser(info.data); //seteamos el useState de USER
          setLawyer(info.data.lawyer); //seteamos el useState de COMPANY
          setLogin(false); //seteamos el useState de LOGIN a FALSE, porque no vamos a poder editar los campos del formulario
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return     <>
  <UserInfo user={user} profile={lawyer} showEditButton={login} isLawyer={true}  />
</>
};
