const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: "",
      user: "",
      error: "",
      msg: "",
      currentRole: "",
      spinner: false,
    },
    actions: {
      createUser: async (newUser, userRole) => {
        const store = getStore();
        getActions().updateMsgError("")
        getActions().updateMsg("")
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
          )

          if (!respCreateUser.ok) {
            const errorData = await respCreateUser.json();
            console.log(errorData)
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Error al crear el usuario");
          }
          const dataCreateUser = await respCreateUser.json()
          setStore({...store, msg: dataCreateUser.message})
        } catch (err) {
          console.log(err)
        } finally {
          getActions().spinner(false);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore();
        localStorage.setItem("userToLogin", JSON.stringify(userToLogin))
        getActions().updateMsgError("")
        getActions().updateMsg("")
        getActions().spinner(true)
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
            throw new Error(errorData.Error || "Error al iniciar sesión")
          }

          const dataLoginIn = await respLoginIn.json()
          localStorage.setItem("jwt-token", dataLoginIn.access_token)
          localStorage.setItem("currentRole", userRole)
          setStore({ ...store, currentRole: userRole })
          setStore({...store, msg: dataLoginIn.message})
          await getActions().getUser();
        } catch (err) {
          console.error(err)
        } finally {
          getActions().spinner(false);
        }
      },

      getUser: async (userRol) => {
        const store = getStore()
        getActions().updateMsgError("")
        getActions().updateMsg("")
        getActions().spinner(true)

        try {
          const token = localStorage.getItem("jwt-token")
          if (!token) throw new Error("No token found")

          const respGetUsers = await fetch(
            process.env.BACKEND_URL +
              `/api/view/` +
              (store.currentRole || userRol),
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
            throw new Error(
              errorData.Error || "Error al obtener los datos del usuario"
            );
          }

          const dataGetUser = await respGetUsers.json()
          setStore({ ...store, user: dataGetUser })
          setStore({...store, msg: dataGetUser.message})
        } catch (err) {
        } finally {
          getActions().spinner(false);
        }
      },

      checkUserSession: async () => {
        const store = getStore();
        try {
          const token = localStorage.getItem("jwt-token")
          const userRole = localStorage.getItem("currentRole")
          const userToLogin = JSON.parse(localStorage.getItem("userToLogin"))
          if (token && userRole && userToLogin) {
            setStore({ currentRole: userRole })
            await getActions().getUser(userRole)
          }
        } catch (err) {
          setStore({ ...store, error: "Error checking user session" })
          console.error("Error checking user session: ", err)
        }
      },

      resetPassword: async (email, userPassword) => {
        const store = getStore()
        getActions().updateMsgError("")
        getActions().updateMsg("")
        getActions().spinner(true)

        console.log(email, userPassword)
        try{
          console.log(process.env.BACKEND_URL + `/api/forgot-password/` + userPassword)
          const respResetPassword = await fetch(
            process.env.BACKEND_URL + `/api/forgot-password/` + userPassword,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(email),
            }
          )
          
          
          if(!respResetPassword.ok){
            const errorData = await respResetPassword.json()
            setStore({...store, error: errorData.Error})
            throw new Error(errorData.Error || "Error in Reset")
          }

          const dataResetPassword = await respResetPassword.json()
          localStorage.setItem("jwt-token-reset", dataResetPassword.access_token)
          setStore({...store, msg: dataResetPassword.message})
        }
        catch(err){

        }finally{
          getActions().spinner(false)
        }
      },

      resetPasswordNewChange: async (password, userRol) => {
        const store = getStore()
        getActions().updateMsgError("")
        getActions().updateMsg("")
        getActions().spinner(true)

        try{
          console.log(process.env.BACKEND_URL + `/api/forgot-password/` + tokenPassword)
          const tokenPassword = localStorage.getItem("jwt-token-reset")
          if (!tokenPassword) throw new Error("No token found")

          const respResetPassword = await fetch(
            process.env.BACKEND_URL + `/api/reset-password/` + userRol + "/" + tokenPassword,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(password),
            }
          )
          
          
          if(!respResetPassword.ok){
            const errorData = await respResetPassword.json()
            setStore({...store, error: errorData.Error})
            throw new Error(errorData.Error || "Error in Reset")
          }

          const dataResetPassword = await respResetPassword.json();
          setStore({...store, msg: dataResetPassword.message})
        }
        catch(err){

        }finally{
          getActions().spinner(false)
        }
      },

      updateMsgError: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, error: changesMsg });
      },

      updateMsg: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, msg: changesMsg });
      },


      spinner: (changesSpinner) => {
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
