import { URL } from ".";


const HEADERS = {
    "Content-Type" : "application/json",
}

// este parametro user(linea 12) es el parametro que pasamos en en form-register-user.jsx como registro del useState 
// body: el cuerpo de la peticion que vamos a enviar, los datos como parametros

export const registerUser = async (user) => {   
  try {
    const response = await fetch(`${URL}/user/worker`,{
        method : "POST",
        headers: HEADERS,
        body: JSON.stringify(user), 
    });
  } catch (error) {
    console.log("Error al registrar el usuario", error);
  }
};