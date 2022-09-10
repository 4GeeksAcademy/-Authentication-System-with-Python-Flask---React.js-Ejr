const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      favorites: [],
      comida: [],
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
      getBorrar: (id) => {
        const store = getStore();
        const borrar = store.favorites.filter((e, i) => i !== id);
        setStore({ favorites: borrar });
      },

      Login: (email, password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          email: email,
          password: password,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/api/token", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.token) {
              localStorage.setItem("token", data.token);
              window.location.href = "/productos";
            } else {
              alert("datos mal ingresados");
            }
          })
          .catch((error) => console.log("error", error));
      },

      //funcion agregar
      getAddTask: (i) => {
        const store = getStore();
        let guardar = 0;
        store.favorites.map((each) => {
          if (each.i === i) {
            guardar = 1;
          }
        });
        if (guardar == 0) {
          setStore({ favorites: [...store.favorites, { name: i }] });
        }
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
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
