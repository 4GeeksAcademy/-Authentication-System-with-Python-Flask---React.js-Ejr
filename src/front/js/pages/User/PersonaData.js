import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../../store/appContext";

const PersonaData = () => {
  const [userData, setUserData] = useState(null);
  const {store, actions} = useContext(Context);

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://cautious-chainsaw-v66wpg947457fp77g-3001.app.github.dev/user_data/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': store.token 
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
  }, []);

  return (
    <div>
      {userData && (
        <>
          <p>Nombre y Apellidos: {userData.user_name}</p>
          <p>Edad: {userData.age}</p>
          <p>Peso: {userData.user_weight}</p>
          <p>Enfermedades: {userData.user_illness}</p>
          <p>Altura: {userData.user_height}</p>
          <p>Objetivos: {userData.user_objetives}</p>
        </>
      )}
    </div>
  );
};

export default PersonaData;
