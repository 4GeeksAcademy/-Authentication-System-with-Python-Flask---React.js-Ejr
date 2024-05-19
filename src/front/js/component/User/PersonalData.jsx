import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";
import "../../../styles/User-styles/user.css";
import { useNavigate, useParams } from 'react-router-dom';


const PersonalData = () => {
  const [userData, setUserData] = useState(true);
  const { store, actions } = useContext(Context);
  const { user_id } = useParams();
  const  navigate  = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://cautious-chainsaw-v66wpg947457fp77g-3001.app.github.dev/user_data/${store.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + store.token
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }
          return response.json();
        })
        .then(userData => {
          setUserData(userData);
        })
        .catch(error => {
          console.error(error);
        });
    };

    fetchData();
  }, [store.id]);

 
  // HACER EL PATCH PARA ACTUALIZAR DATOS


  
  const handleEditForm = () => {
    navigate("/user/edit_form") 
  }

  return (
    <div>
      <div className='personalData'>
        <p className='datosForm'>Nombre y Apellidos: {userData.user_name}</p>
        <p className='datosForm'>Peso: {userData.user_weight}</p>
        <p className='datosForm'>Enfermedades: {userData.user_illness}</p>
        <p className='datosForm'>Altura: {userData.user_height}</p>
        <p className='datosForm'>Objetivos: {userData.user_objetives}</p>
        <button onClick={handleEditForm}>Editar Información</button>
      </div>
      
    </div>
  );
};

export default PersonalData;
