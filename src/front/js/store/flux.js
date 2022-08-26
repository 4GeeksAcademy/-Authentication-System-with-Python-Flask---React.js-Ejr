const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      operacion: "",
      comunidad: "",
      provincia: "",
      preciomin: 0,
      preciomax: 999999999,
      // listaoperaciones: ["alquiler", "compra"],
      listaprovincias: [],
      listacomunidades: [
        { todas: ["todas"] },
        {
          Andalucía: [
            "<todas>",
            "Almería",
            "Cádiz",
            "Córdoba",
            "Granada",
            "Huelva",
            "Jaén",
            "Málaga",
            "Sevilla",
          ],
        },
        { Aragón: ["<todas>", "Huesca", "Teruel", "Zaragoza"] },
        { Asturias: ["Oviedo"] },
        { Baleares: ["Palma de Mallorca"] },
        {
          Canarias: [
            "<todas>",
            "Santa Cruz de Tenerife",
            "Las Palmas de Gran Canaria",
          ],
        },
        { Cantabria: ["Santander"] },
        {
          "Castilla-La Mancha": [
            "<todas>",
            "Albacete",
            "Ciudad Real",
            "Cuenca",
            "Guadalajara",
            "Toledo",
          ],
        },
        {
          "Castilla y León": [
            "<todas>",
            "Ávila",
            "Burgos",
            "León",
            "Salamanca",
            "Segovia",
            "Soria",
            "Valladolid",
            "Zamora",
          ],
        },
        { Cataluña: ["<todas>", "Barcelona", "Gerona", "Lérida", "Tarragona"] },
        {
          "Comunidad Valenciana": [
            "<todas>",
            "Alicante",
            "Castellón de la Plana",
            "Valencia",
          ],
        },
        { Extremadura: ["<todas>", "Badajoz", "Cáceres"] },
        { Galicia: ["<todas>", "La Coruña", "Lugo", "Orense", "Pontevedra"] },
        { "La Rioja": ["Logroño"] },
        { Madrid: ["Madrid"] },
        { Murcia: ["Murcia"] },
        { Navarra: ["Pamplona"] },
        { "País Vasco": ["<todas>", "Bilbao", "San Sebastián", "Vitoria"] },
      ],
      demoProperties: [
        {
          id: 1,
          operacion: "alquiler",
          precio: 1300,
          comunidad: "Madrid",
          provincia: "Madrid",
          municipio: "Madrid",
          direccion: "Calle las Malvas, 4",
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
        {
          id: 2,
          operacion: "alquiler",
          precio: 2700,
          comunidad: "Comunidad Valenciana",
          provincia: "Alicante",
          municipio: "Santa Pola",
          direccion: "Calle los geranios, 12",
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
        {
          id: 3,
          operacion: "alquiler",
          precio: 4500,
          comunidad: "Cataluña",
          provincia: "Tarragona",
          municipio: "Esmeralda",
          direccion: "Calle los abedules, 2",
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
      ],
      message: null,
    },
    //
    actions: {
      updateOperacion: (e) => {
        const store = getStore();
        setStore({ operacion: e.target.value });
      },
      updateComunidad: (e) => {
        const store = getStore();
        setStore({ comunidad: "" });
        setStore({ provincia: "" });
        setStore({ comunidad: e.target.value });
        let comunidad = store.comunidad;
        let provincias = [];
        for (let x of store.listacomunidades) {
          if (x[comunidad]) {
            provincias = x[comunidad];
          }
        }
        setStore({ listaprovincias: provincias });
      },
      updateProvincia: (e) => {
        const store = getStore();
        setStore({ provincia: e.target.value });
      },
      updatePrecio: (e) => {
        const store = getStore();
        if (e.target.value == "de 0 a 1000") {
          setStore({ preciomin: 0 });
          setStore({ preciomax: 1000 });
        } else if (e.target.value == "de 1001 a 2500") {
          setStore({ preciomin: 1001 });
          setStore({ preciomax: 2500 });
        } else if (e.target.value == "de 2501 a 5000") {
          setStore({ preciomin: 2501 });
          setStore({ preciomax: 5000 });
        } else if (e.target.value == "de 5001 a más") {
          setStore({ preciomin: 5001 });
          setStore({ preciomax: 999999999 });
        } else if (e.target.value == "todos") {
          setStore({ preciomin: 0 });
          setStore({ preciomax: 999999999 });
        }
      },
      updateFilters: () => {
        const store = getStore();
        setStore({ comunidad: "" });
        setStore({ provincia: "" });
        setStore({ operacion: "" });
      },

      // Use getActions to call a function within a fuction
      // exampleFunction: () => {
      //   getActions().changeColor(0, "green");
      // },

      // getMessage: async () => {
      //   try {
      //     // fetching data from the backend
      //     const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
      //     const data = await resp.json();
      //     setStore({ message: data.message });
      //     // don't forget to return something, that is how the async resolves
      //     return data;
      //   } catch (error) {
      //     console.log("Error loading message from backend", error);
      //   }
      // },
      // changeColor: (index, color) => {
      //   //get the store
      //   const store = getStore();

      //   //we have to loop the entire demo array to look for the respective index
      //   //and change its color
      //   const demo = store.demo.map((elm, i) => {
      //     if (i === index) elm.background = color;
      //     return elm;
      //   });

      //   //reset the global store
      //   setStore({ demo: demo });
      // },
    },
  };
};

export default getState;
