const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,

      users: [], // Array para almacenar los usuarios creados
      currentUser: null, // Usuario actual
      currentRole: null, // Rol actual
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
        const store = getStore();
        console.log(newUser, userRole);
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
    },
  };
};

export default getState;
