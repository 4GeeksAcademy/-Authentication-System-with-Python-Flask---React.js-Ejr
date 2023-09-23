const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      //VARIABLES PARA GUARDAR EL INICIO DE SESIÓN
      email: "",
      password: "",
      //VARIABLE PARA GUARDAR LOS USUARIOS QUE SE CREAN
      users: [],
      //SE GUARDA EL REGISTRO DE USUARIO
      newUser: {
        id: "",
        name: "",
        lastname: "",
        email: "",
        password: "",
        rep_password: "",
        region: "",
      },
      //URL DE LA API
      url: "http://localhost:3001",

      message: null,
      //USUARIO QUE INICIO SESIÓN
      currentUser: null,
      //VARIABLE PARA PUBLICAR EL NUEVO LIBRO
      newBook: {
        id: "",
        title: "",
        author: "",
        cathegory: "",
        number_of_pages: "",
        description: "",
        type: "",
        price: "",
        photo: "",
      },
      //ESTADO PARA GUARDAR LISTA DE LIBROS
      showBooks: [],
      //ESTADO PARA GUARDAR LISTA DE LIBROS
      imageBook: [],
      //ESTADO PARA GUARDAR DETALLE DE UN LIBRO
      oneBook: [],
      //ESTADOS CAMPOS INSTACIA LIBRO CON FOTOS
      title: [],
      author: [],
      cathegory: [],
      number_of_pages: [],
      description: [],
      price: [],
      photo: null,
      type: [],
    },

    actions: {
      //PUBLICACIÓN DE LIBRO      
      ////FUNC. GUARDAR VALOR INPUT
      handleChangeBook: (e) => {
        const { newBook } = getStore();
        e.preventDefault();
        newBook[e.target.name] = e.target.value;
        setStore({ newBook });
        console.log("newBook:", getStore().newBook);
      },
      ////FUNC. PARA GUARDAR LIBRO
      saveBook: async (navigate) => {
        try {
          const { url, newBook, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : '';
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: JSON.stringify(newBook),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
          const data = await response.json();
          console.log("data", data);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
      ////FUNC. ENVIAR REGISTRO
      submitBook: (e, navigate) => {
        e.preventDefault();
        //agregar verificación de usuario 
        getActions().saveBook(navigate);
      },
      ////FUNC LISTA DE LIBROS  
      getLibros: () => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("http://localhost:3001/api/libroVenta", requestOptions)
          .then(response => response.json())
          .then(data => {
            setStore({ showBooks: data });
            console.log("conseguí los libros");
            console.log("showBooks:", data);
          })
          .catch(error => console.log('error', error));
      },

      ////FUNC DETALLE UN LIBRO
      getOneBook: (id) => {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`http://localhost:3001/api/detalleLibro/${id}`, requestOptions)
          .then(response => response.json())
          .then(data => {


            setStore({ oneBook: data });
            console.log("tengo el libro");
            console.log("oneBook:", data);
          })
          .catch(error => console.log('error', error));
      },



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
      handleSubmitLogin: async (e, navigate) => {
        e.preventDefault();
        try {
          const { url, email, password, currentUser } = getStore();
          let info = { email, password, currentUser };
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

          if (data.access_token) {
            setStore({ currentUser: data });
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

      handleChangeLogin: (e) => {
        setStore({
          [e.target.name]: e.target.value,
        });
      },
      // VERIFICA QUE EXISTA EL USUARIO 
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

      ///POST LIBRO CON FOTOS      
      postBook: async (formData, navigate) => {
        try {
          const { url, currentUser } = getStore();
          const token = currentUser ? currentUser.access_token : '';
          const response = await fetch(`${url}/api/registerBook`, {
            method: "POST",
            body: formData,
            headers: {
              "Authorization": `Bearer ${token}`
            },
          })
            .then(response => response.text())
            .then(result => {
              navigate("/");
              console.log(result)
            })
            .catch(error => alert(error));
        } catch (error) {
          console.log(error);
        }
      },


      ///SUBMIT FORM LIBRO CON FOTO
      submitBookImage: (e, navigate) => {
        try {
          e.preventDefault()
          const { title, author, cathegory, number_of_pages, description, price, photo, type } = getStore();
          const formData = new FormData()
          formData.append('title', title)
          formData.append('author', author)
          formData.append('cathegory', cathegory)
          formData.append('number_of_pages', number_of_pages)
          formData.append('description', description)
          formData.append('price', price)
          formData.append('photo', photo)
          formData.append('type', type)
          getActions().postBook(formData, navigate)

          console.log("SUBMIT")
        } catch (error) {
          console.log(error)

        }
      },

      ///GUARDAR VALOR INPUT IMAGEN LIBRO
      inputBookImage: (file) => {
        setStore({ photo: file });
      },

      ///GUARDAR OTROS CAMPOS DEL INPUT
      inputBookValue: (e) => {
        const { name, value } = e.target;

        setStore({
          ...getStore(),
          [name]: value
        });
      },


    },
  };
};


export default getState;
