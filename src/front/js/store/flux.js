const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      /*-------------------------------  INICIO DE LOS LISTADOS (CASI) ESTATICOS PARA OPCTIONS DE LOS SELECT --------------------------------*/
      listaprovincias: [],
      listacomunidades: [
        {
          Andalucía: [
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
        { Aragón: ["Huesca", "Teruel", "Zaragoza"] },
        { Asturias: ["Oviedo"] },
        { Baleares: ["Palma de Mallorca"] },
        {
          Canarias: ["Santa Cruz de Tenerife", "Las Palmas de Gran Canaria"],
        },
        { Cantabria: ["Santander"] },
        {
          "Castilla-La Mancha": [
            "Albacete",
            "Ciudad Real",
            "Cuenca",
            "Guadalajara",
            "Toledo",
          ],
        },
        {
          "Castilla y León": [
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
        { Cataluña: ["Barcelona", "Gerona", "Lérida", "Tarragona"] },
        {
          "Comunidad Valenciana": [
            "Alicante",
            "Castellón de la Plana",
            "Valencia",
          ],
        },
        { Extremadura: ["Badajoz", "Cáceres"] },
        { Galicia: ["La Coruña", "Lugo", "Orense", "Pontevedra"] },
        { "La Rioja": ["Logroño"] },
        { Madrid: ["Madrid"] },
        { Murcia: ["Murcia"] },
        { Navarra: ["Pamplona"] },
        { "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"] },
      ],
      /*----------------------------------  FIN DE LOS LISTADOS (CASI) ESTATICOS PARA OPCTIONS DE LOS SELECT --------------------------------*/

      /*---------------------------- INICIO DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ------------------------------*/
      demoProperties: [
        {
          id: 1,
          operacion: "alquiler",
          precio: 1300,
          comunidad: "Madrid",
          provincia: "Madrid",
          municipio: "Madrid",
          direccion: "Calle las Malvas",
          numcalle: 4,
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
          direccion: "Calle los geranios",
          numcalle: 12,
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
          direccion: "Calle los abedules",
          numcalle: 2,
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
        {
          id: 4,
          operacion: "alquiler",
          precio: 4500,
          comunidad: "Extremadura",
          provincia: "Badajoz",
          municipio: "Esmeraldina",
          direccion: "Calle los gansos",
          numcalle: 23,
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
        {
          id: 5,
          operacion: "alquiler",
          precio: 900,
          comunidad: "Extremadura",
          provincia: "Badajoz",
          municipio: "Las Heras",
          direccion: "Calle los faisanes",
          numcalle: 52,
          latitud: null,
          longitud: null,
          img: "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png",
        },
      ],
      /*---------------------------- FIN DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ---------------------------*/

      /*--------------------------------------- INICIO DE LAS VARIABLES DEL STORE (HOOKS)----------------------------------------------*/
      operacion: "todas",
      comunidad: "todas",
      provincia: "todas",
      preciomin: 0,
      preciomax: 999999999,
      vista: "listado",
      /*------------------------------------------ FIN DE LAS VARIABLES DEL STORE -----------------------------------------------------*/
    },
    //
    actions: {
      //
      /*------------------------------- INICIO DE LAS FUNCIONES DE EVENTOS PARA LOS FILTROS --------------------------------------------*/
      updateOperacion: (e) => {
        // funcion de input controlado de evento
        const store = getStore();
        setStore({ operacion: e.target.value });
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      updateComunidad: (e) => {
        // funcion de input controlado de evento
        const store = getStore();
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ comunidad: e.target.value });

        let comunidad = store.comunidad;
        let provincias = [];
        for (let x of store.listacomunidades) {
          if (x[comunidad]) {
            provincias = x[comunidad];
          }
        }
        setStore({ listaprovincias: provincias });
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      updateProvincia: (e) => {
        // funcion de input controlado de evento
        const store = getStore();
        setStore({ provincia: e.target.value });
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      updatePreciomin: (e) => {
        // funcion de input controlado de evento
        const store = getStore();
        if (e.target.value == "Mín") {
          setStore({ preciomin: 0 });
        } else {
          setStore({ preciomin: e.target.value });
        }
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      updatePreciomax: (e) => {
        // funcion de input controlado de evento
        const store = getStore();
        if (e.target.value == "Sin límite" || e.target.value == "Máx") {
          setStore({ preciomax: 999999999 });
        } else {
          setStore({ preciomax: e.target.value });
        }
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      /*--------------------------------------------- FIN DE LAS FUNCIONES DE LOS FILTROS --------------------------------------------*/

      /*----------------------------------- INICIO DE LAS FUNCIONES DEL TABLERO DE RESULTADOS -------------------------------------*/
      updateOperacionAlquiler: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ operacion: "alquiler" });
      },
      updateOperacionCompra: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ operacion: "compra" });
      },
      updateVistaListado: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ vista: "listado" });
      },
      updateVistaMapa: () => {
        // funcion especial para los pills del dashboard
        const store = getStore();
        setStore({ vista: "mapa" });
      },
      /*------------------------------------ FIN DE LAS FUNCIONES DEL TABLERO DE RESULTADOS -----------------------------------------*/

      /*------------------------------------- FUNCIONES DE ENTREGA Y RECUPERACION DE DATA------------------------------------------- */

      fillLocalStorage: () => {
        const store = getStore();
        // funcion vuelca datos del store en LocalStorage al pasar a otra página. Se debe usar al actualizar cada filtro
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
      },
      syncLocalStorageToStore: () => {
        // funcion recupera datos de LocalStorage y los guarda en el store nuevamente al cargar nueva página
        const store = getStore();
        setStore({ operacion: localStorage.getItem("operacion") });
        setStore({ comunidad: localStorage.getItem("comunidad") });
        setStore({ provincia: localStorage.getItem("provincia") });
        setStore({ preciomin: localStorage.getItem("preciomin") });
        setStore({ preciomax: localStorage.getItem("preciomax") });
        setStore({ vista: localStorage.getItem("vista") });
      },
      backHome: () => {
        // esta funcion resetea los filtros al volver al home desde el nav o al refrescar el home
        const store = getStore();
        localStorage.clear();
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ operacion: "todas" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        setStore({ vista: "listado" });
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
