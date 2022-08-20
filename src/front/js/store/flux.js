const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      dogs: [],
      log: "Iniciar sesión",
      isLogedIn: false,
    },
    actions: {
      getInfo: (url, id) => {
        fetch(url + id)
          .then((res) => res.json())
          .then((data) => {
            setStore({ user: data.results });
          })
          .catch();
      },

      getDog: (url, userId) => {
        fetch(url + userId)
          .then((res) => res.json())
          .then((data) => setStore({ dogs: [data.result] }))
          .catch();
      },

      handleLog: () => {
        const store = getStore();
        if (store.log === "Iniciar sesión") {
          setStore({ log: "Cerrar sesión" });
          setStore({ isLogedIn: true });
        }
      },

      handleLogOut: () => {
        const store = getStore();
        if (store.log === "Cerrar sesión") {
          setStore({ log: "Iniciar sesión" });
          setStore({ isLogedIn: false });
        }
      },
    },
  };
};

export default getState;
