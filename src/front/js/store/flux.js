const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      favorites: [], // agrega al carrito las comidas
      comida: [], //trae los detalles de las platos
      comidas: [], // trae los nombre de los platos
      vgt: [], // trae los detalles de los platos vegetarianos
      vgts: [], // trae los nombre de los platos vegetarianos
      dulce: [], // trae los detalles de los dulces
      dulces: [], // trae los nombre de los dulces
      vip: [],
      vipdata: [],
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
      Register: (name, email, password,direccion,telefono) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          name: name,
          email: email,
          password: password,
          telefono: telefono,
          direccion: direccion,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/registro",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },

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

        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/token",
          requestOptions
        )
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
      // trae el nombre de la comida
      getComida: (id) => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/platos"+id
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ comida: result.result });
          })
          .catch((error) => console.log("DANGER", error));
      },
      //funcion traer datos de la comida
      getComidas: () => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/platos"
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ comidas: result.platos });
          })
          .catch((error) => console.log("DANGER", error));
      },
      // Vegt
      getVegetariano: (id) => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/veget" +
 id
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ vgt: result.result });
          })
          .catch((error) => console.log("DANGER", error));
      },
      //funcion traer datos de la comida
      getVegetarianos: () => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/veget"
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ vgts: result.veget });
          })
          .catch((error) => console.log("DANGER", error));
      },
      // dulce
      getDulce: (id) => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/dulce" +
            id
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ dulce: result.result });
          })
          .catch((error) => console.log("DANGER", error));
      },
      //funcion traer datos de la comida
      getDulces: () => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/dulce"
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ dulces: result.dulce });
          })
          .catch((error) => console.log("DANGER", error));
      },
      getVip: (id) => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/vip" +
            id
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ vip: result.result });
          })
          .catch((error) => console.log("DANGER", error));
      },
      //funcion traer datos de la comida
      getVipdata: () => {
        fetch(
          "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/vip"
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ vipdata: result.vip });
          })
          .catch((error) => console.log("DANGER", error));
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
          const resp = await fetch(
            "https://3001-alexanderwe-proyectofin-pi4w1iusi7c.ws-us67.gitpod.io/api/hello"
          );
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
