const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      users: [],
      newUser: {
        id: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        rep_password: "",
        region: "",
      },
      url: "http://localhost:3001",
      message: null,
      libros: [],
      librosDonados: [],
      usuarios: [],
      usuariosAdmin: [],
      registro: true,
    },

    actions: {
      //---------< registro de usuario >------------------------------->>

      //---------< funcion para  registro  de usuario >----------------->

      handleChangeRegister: (e) => {
        const { newUser } = getStore();
        e.preventDefault();
        newUser[e.target.name] = e.target.value;
        setStore({ newUser });
        console.log("newUser:", getStore().newUser);
      },

      submitRegister: (e, navigate) => {
        e.preventDefault();

        if (getStore().newUser.password === getStore().newUser.rep_password) {
          getActions().saveUser(navigate);
        } else {
          alert("las contraseñas no coinciden");
        }
      },

      saveUser: async (navigate) => {
        try {
          const { url, newUser } = getStore();
          const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      },
      //----------< Login usuario >---------------------------------------------->


      //---- funcion para  login  de usuario------------------------------------------->
      logUser: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password };
          const response = await fetch(`${url}/api/login`, {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          const data = await response.json();
          console.log(data);

          if (data.token) {
            setStore({ currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/galeria");
          } else {
            setStore({
              alert: {
                text: "Usuario no registrado",
                show: true,
                textbtn: "Registrarme",
              },
            });
          }
        } catch (error) {
          console.log(error);
          console.log("hay un error en el login");
        }
      },

      handleChange: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },

      checkUser: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
          });
        }
      },

      logout: () => {
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: null,
          });
          sessionStorage.removeItem("currentUser");
        }
      },
      //---------< OBTENER LIBROS >------------------------------->>
      getLibros: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          "URL",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ libros: result }))
          .catch((error) => console.log("error", error));
      },

      getLibrosDonados: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          "URL",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ librosDonaods: result }))
          .catch((error) => console.log("error", error));
      },
      //---------< OBTENER USUARIOS >------------------------------->>
      getUsuarios: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          "URL",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ usuarios: result }))
          .catch((error) => console.log("error", error));
      },

      getUsuariosAdmin: () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(
          "URL",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => setStore({ usuarios: result }))
          .catch((error) => console.log("error", error));
      },

      //---------< PUBLICAR LIBROS >------------------------------->>

      postLibro: (nuevoLibro) => {
        console.log(nuevoLibro)
        const actions = getActions();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(nuevoLibro);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("URL", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            actions.getlibros();
            /* console.log(result); */
          })
          .catch((error) => console.log('error', error));
      },

      //---------< ELIMINAR LIBROS >------------------------------->>

      deleteLibros: (index) => {
        const actions = getActions();
        const currentLibro = getStore().libros;
        const selectedLibro = currentLibro[index];

        const requestOptions = {
          method: "DELETE",
          redirect: "follow",
        };

        fetch(
          `URL/${selectedLibro.id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("Book deleted from API:", result);
            actions.getLibros();
          })
          .catch((error) => console.log("Error deleting contact:", error));
      },

      //---------< CAMBIO DE NAVBAR >------------------------------->>
      vistaRegistro: () => {
        setStore({ registro: false })
        console.log(getStore().registro)
      }

    },
  };
};


export default getState;
