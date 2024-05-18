const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: '',
      user: '',
      error: '',
      currentRole: '',
      spinner: false
    },
    actions: {
      
      createUser: async (newUser, userRole) => {
        const store = getStore();
        getActions().updateMsgError('');
        getActions().spinner(true);
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
            const errorData = await respCreateUser.json();
            setStore({ ...store, error: errorData.Error })
            throw new Error(errorData.Error || "Error al crear el usuario");
          }
          const dataCreateUser = await respCreateUser.json();
          
        } catch (err) {
          
          
        } finally {
          getActions().spinner(false);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore();
        getActions().updateMsgError('');
        getActions().spinner(true);
        try {
          const respLoginIn = await fetch(
            process.env.BACKEND_URL + `/api/login/` + userRole,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userToLogin),
            }
          );

          if (!respLoginIn.ok) {
            const errorData = await respLoginIn.json()
            setStore({ ...store, error: errorData.Error })
            throw new Error(errorData.Error || "Error al iniciar sesión");
          }

          const dataLoginIn = await respLoginIn.json();
          localStorage.setItem("jwt-token", dataLoginIn.access_token)
          localStorage.setItem("currentRole", userRole)
          setStore({ ...store, currentRole: userRole});
          await getActions().getUser()

        } catch (err) {
          
        } finally {
          getActions().spinner(false)
        }
      },

      getUser: async (userRol) => {
        const store = getStore();
        getActions().updateMsgError('')
        getActions().spinner(true);
        try {
          const token = localStorage.getItem("jwt-token")
          if (!token) throw new Error("No token found")

          const respGetUsers = await fetch(
            process.env.BACKEND_URL + `/api/view/` + (store.currentRole || userRol),
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!respGetUsers.ok) {
            const errorData = await respGetUsers.json()
            setStore({ ...store, error: errorData.Error })
            throw new Error(errorData.Error || "Error al obtener los datos del usuario")
          }

          const dataGetUser = await respGetUsers.json()
          console.log(dataGetUser)
          setStore({ ...store, user: dataGetUser})
          
        } catch (err) {
          
        } finally {
          getActions().spinner(false);
        }
      },

      checkUserSession: async () => {
        const store = getStore();
        try {
          const token = localStorage.getItem("jwt-token");
          const userRole = localStorage.getItem("currentRole");
          if (token && userRole) {
            setStore({ currentRole: userRole });
            await getActions().getUser();
          }

          
        } catch (err) {
          setStore({ ...store, error: "Error checking user session" });
          console.error("Error checking user session: ", err);
        }
      },

      updateMsgError: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, error: changesMsg }); 
      },

      spinner: async (changesSpinner) => {
        const store = getStore();
        setStore({ ...store, spinner: changesSpinner }); 
      },

      /* getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      }, */

    },
  };
};

export default getState;
