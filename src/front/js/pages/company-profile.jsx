import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {userById, getUserPrivate} from "../services";
import UserInfo from "../component/UserInfo.jsx";


export const CompanyProfile = () => {
  const params = useParams();
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = params.id; //parámetro que puede llegar o no desde la URL (ver layout.js)

        const token = localStorage.getItem("token"); //el token del usuario que está logado, si es que hay alguien logado

        if (!companyId) { //si no hemos usado la ruta con id, estamos entrando por TOKEN
          const companyData = await getUserPrivate(token); //se llama a la función que obtiene los datos de usuario a partir del token y los guardamos en una const
          setUser(companyData); //seteamos el useState de USER
          setCompany(companyData.company); //seteamos el useState de COMPANY
          setLogin(true); //seteamos el useState LOGIN a TRUE, para poder editar todos los campos del formulario
        } else { //si hemos usado la ruta con ID
          //primero obtenemos los datos de la empresa que se pintan en pantalla
          const info = await userById(companyId); //llamamos a la función que obtiene un USER filtrando por su ID
          setUser(info.data); //seteamos el useState de USER
          setCompany(info.data.company); //seteamos el useState de COMPANY
          setLogin(false); //seteamos el useState de LOGIN a FALSE, porque no vamos a poder editar los campos del formulario
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return     <>
  <UserInfo user={user} company={company} showEditButton={login} />
</>
};
