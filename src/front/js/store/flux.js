const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: (dato) => {
        console.log(dato);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          correo: dato.email,
          contrasena: dato.contraseña,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://3001-ksavir-reactflaskhello-jstspz7we7e.ws-us67.gitpod.io/api/login",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            localStorage.setItem("token", result.token);
            if (result.token) {
              window.location.href = "/pagina-home";
            }
          })
          .catch((error) => console.log("error", error));
      },
      /*Registro*/
      registrocliente: (dato2) => {
        console.log(dato2);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          correo: dato2.mail,
          nombre: dato2.nombre,
          apellido: dato2.apellido,
          contrasena: dato2.contraseña,
          telefono: dato2.telefono,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://3001-ksavir-reactflaskhello-jstspz7we7e.ws-us67.gitpod.io/api/registro",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if(result.Mensaje==='El usuario ha sido registrado exitosamente'){
              window.location.href = "/pagina-home";
            }
          })
          .catch((error) => console.log("error", error));
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
