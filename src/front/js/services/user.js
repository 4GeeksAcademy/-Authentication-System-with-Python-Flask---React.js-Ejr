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

export const loginUser = async (user) => {
  try {
    const response = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data) //PROVISIONAL PARA VER QUE RETORNA EL TOKEN EN EL LOGIN--- EN TERMINAL HTTP REQUEST 200
    localStorage.setItem("token", data.token);  // localStorage es para guardar el dato de token lo encontramos en la consola en aplication -localstorage
    return true
  } catch (error) {
    console.log("Error al iniciar sesión!", error);
    return false
  }
};

export const getUserPrivate = (token) => {
  try {
     // obtengo del localStorage mi item que lo hemos llamado como token -- linea 35 
     fetch(`${URL}/user/profile`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,   // para poder acceder a partes privadas tengo que pasar en headers este formato el token es una interpolacion ya que ira cambiando segun el user
        ...HEADERS,  // + tmb los headers generales se añaden 
      }
    })
    .then((response)=> response.json())
    .then((data)=> console.log(data))
   
  
  } catch (error) {
    console.log("Acceso denegado!", error);
  }
};




