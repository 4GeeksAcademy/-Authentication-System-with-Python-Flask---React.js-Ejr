const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {

      // INICIO DE SESIÓN
      email: "",
      password: "",
      currentUser: null,   

      // VALIDACIÓN INICIO SESSIÓN
      isLoggedIn: sessionStorage.getItem("currentUser") ? true : false,
      currentUser: JSON.parse(sessionStorage.getItem("currentUser")),

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
      
      registro: true,
    },

    actions: {

      // INICIO DE SESON
      setEmail: (newEmail) => {
        
        setStore({ ...getStore(), email: newEmail });
      },
      
      setPassword: (newPassword) => {
        
        setStore({ ...getStore(), password: newPassword });
      },
      
      setCurrentUser: (newCurrentUser) => {
        
        setStore({ ...getStore(), currentUser: newCurrentUser });
      },
      

      entrada: async (credenciales) => {
        try {
          const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            body: JSON.stringify(credenciales),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json();
          console.log(data);
    
          if (data.fail) {
    
            console.log("error")
            
          } else{
            console.log("exitoso");
            store.setCurrentUser(data);
            actions.setEmail("");
            actions.setPassword("");
    
    
          }
        } catch (error) {
          
    
        }
      },

      


      
      
      handleLogin: async (navigate) => {
        try {
          const { url, local } = getStore();
          const { email, password } = local;

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
            setStore({ isLoggedIn: true, currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/profile");
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
          console.log("Inicio de sesión iniciado"); // verificando inicio de sesión
          let info = { email, password };
          console.log("Datos de inicio de sesión:", info); // verificando inicio de sesión
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
            setStore({ isLoggedIn: true, currentUser: data });
            sessionStorage.setItem("currentUser", JSON.stringify(data));
            navigate("/profile");
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
        // Limpia el currentUser de sessionStorage y actualiza isLoggedIn en el store
        if (sessionStorage.getItem("currentUser")) {
          sessionStorage.removeItem("currentUser");
          setStore({
            isLoggedIn: false,
            currentUser: null,
          });
        }
      },
      //---------< OBTENER LIBROS >------------------------------->>
      
      //---------< OBTENER USUARIOS >------------------------------->>
      
      //---------< PUBLICAR LIBROS >------------------------------->>
      
      //---------< ELIMINAR LIBROS >------------------------------->>
    
      //---------< CAMBIO DE NAVBAR >------------------------------->>
      vistaRegistro: () => {
        setStore({ registro: false })
        console.log(getStore().registro)
      },
      vistaRegistro2: () => {
        setStore({ registro: true })
        console.log(getStore().registro)
      }

    },
  };
};


export default getState;
