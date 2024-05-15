const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: null,
      currentRole: null
    },
    actions: {
      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      createUser: async (newUser, userRole) => {
        const store = getStore()
        setStore({ currentRole: userRole })
        try {
          const respCreateUser = await fetch(
            process.env.BACKEND_URL + `/api/signup/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (!respCreateUser.ok) {
            throw new Error(
              "Error al crear el usuario: " + respCreateUser.statusText
            );
          }

          const dataCreateUser = await respCreateUser.json();

          console.log("Respuesta del servidor:", dataCreateUser);

        } catch (error) {
          console.error("Error al crear el usuario:", error);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore()
        try {
            const respLoginIn = await fetch(process.env.BACKEND_URL + `/api/login/` + userRole, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userToLogin)
            });
    
            if (!respLoginIn.ok) {
                throw new Error('Error al iniciar sesión: ' + respLoginIn.statusText);
            }
    
            const dataLoginIn = await respLoginIn.json();
            localStorage.setItem("jwt-token", dataLoginIn.access_token)
            console.log(dataLoginIn)
            await getActions().getUser(userRole);
            
    
        } catch (error) {
            console.error('Error al iniciar sesión: ', error)
        }
    },

    getUser: async (userRole) => {
        const store = getStore()
        
        try {
            const token = localStorage.getItem('jwt-token')
            const respGetUsers = await fetch(process.env.BACKEND_URL + `/api/private/` + userRole, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
    
            if (!respGetUsers.ok) {
                throw new Error('Error al obtener los datos del usuario: ' + respGetUsers.statusText);
            }
    
            const dataGetUser = await respGetUsers.json();
            setStore({...store, user: dataGetUser})
            console.log(dataGetUser)
            /* console.log(store.user) */
        } catch (error) {
            console.error('Error al obtener los datos del usuario: ', error);
        }
    }


    },
  };
};

export default getState;
