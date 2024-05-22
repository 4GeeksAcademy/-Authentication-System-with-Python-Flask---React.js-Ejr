import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";


const trainerView = () => {


  const url = "https://symmetrical-capybara-pjj75jpv75jqc797w-3001.app.github.dev/trainer/<int:trainer_id>/<int:user_id>"

  async function fetchUsers() {
    try {
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const users = await response.json();
      console.log(users);

      return users;
    } catch (error) {
      console.error('Error al obtener los datos de los usuarios:', error);
    }
  }
  fetchUsers();

  return (
    <div className="userCard">
      <h1>User</h1>
      

    </div>
  );

}

export default trainerView
