const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: null,
      error: "",
      currentRole: "",
    },
    actions: {
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

      createUser: async (newUser, userRole) => {
        const store = getStore();
        console.log(newUser)
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
        } catch (error) {
          console.error("Error al crear el usuario:", error);
          alert(error);
        }
      },

      loginIn: async (userToLogin, userRole) => {
        const store = getStore();
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
            throw new Error(
              "Error al iniciar sesión: " + respLoginIn.statusText
            );
          }

          const dataLoginIn = await respLoginIn.json();
          localStorage.setItem("jwt-token", dataLoginIn.access_token);
          localStorage.setItem("currentRole", userRole);

          await getActions().getUser(userRole);
        } catch (error) {
          console.error("Error al iniciar sesión: ", error);
          setStore({ ...store, error: error });
          alert(error);
        }
      },

      getUser: async (userRole) => {
        const store = getStore();

        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");

          const respGetUsers = await fetch(
            process.env.BACKEND_URL + `/api/private/` + userRole,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!respGetUsers.ok) {
            throw new Error(
              "Error al obtener los datos del usuario: " +
                respGetUsers.statusText
            );
          }

          const dataGetUser = await respGetUsers.json();
          setStore({ ...store, user: dataGetUser });
        } catch (error) {
          console.error("Error al obtener los datos del usuario: ", error);
          alert(error);
        }
      },

      checkUserSession: async () => {
        const store = getStore()
        try {
          const token = localStorage.getItem("jwt-token");
          const userRole = localStorage.getItem("currentRole");
          if (token && userRole) {
            setStore({ currentRole: userRole });
            await getActions().getUser(store.currentRole);
          }
        } catch (error) {
          console.error("Error checking user session: ", error);
        }
      },
    },
  };
};

export default getState;
