const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      userInfo: {},
      messages: [],
      userProperties: [],
      userPropertiesImages: [],
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
        { "País Vasco": ["Vizcaya", "Guipuzcoa", "Alaba"] },
      ],
      /*----------------------------------  FIN DE LOS LISTADOS (CASI) ESTATICOS PARA OPCTIONS DE LOS SELECT --------------------------------*/

      /*---------------------------- INICIO DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ------------------------------*/
      body_request: {},
      body_response: "buscando coincidencias...",

      /*---------------------------- FIN DE LA DATA SIMULADA DE API PARA PRUEBAS ANTES DE IMPLEMENTAR FETCH ---------------------------*/

      /*--------------------------------------- INICIO DE LAS VARIABLES DE FILTROS ------------------------------------------------------*/
      operacion: "todas", // este dato va si o si en el fetch get
      comunidad: "todas",
      provincia: "todas",
      preciomin: 0,
      preciomax: 999999999,
      vista: "listado",
      vivienda_piso: false,
      vivienda_chalet: false,
      vivienda_villa: false,
      caracteristica_pet: false,
      caracteristica_garage: false,
      caracteristica_piscina: false,
      caracteristica_terraza: false,
      habitaciones: "cualquiera",
      baños: "cualquiera",
      periodo_alquiler: "por meses",
      /*------------------------------ inicio de VARIABLES ADICIONALES DE PUBLICACION -----------------------------------------------------*/

      selectedImages: [],
      receivedUrls: [],
      pago: false,
      tipo_vivienda: "",
      longitude: 0,
      latitude: 0,
      municipio: "",
      direccion: "",
      descripcion: "",
      precio: "",
      premium: false,
      inmueblesBodyRequest: {},
      charging: false,
      response_publicar: "",

      /*------------------------------ fin de VARIABLES ADICIONALES DE PUBLICACION -----------------------------------------------------*/
    },
    //
    actions: {
      getMessages: async () => {
        const opts = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/getmessages",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }
          const data = await resp.json();
          if (data == "The user does not have any messages") {
            setStore({ messages: null });
            localStorage.setItem("messages", JSON.stringify(null));
            return true;
          }
          // const result = [...data];
          // if (result.length > 10) {
          //   for (let i = 0; i < result.length; i += 10) {
          //     const page = arr.slice(i, i + 10);                 Para el NICE TO HAVE (pagination)
          //     result.push(page);
          //   }
          // }
          setStore({ messages: data });
          localStorage.setItem("messages", JSON.stringify(data));
          return true;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      getUserProperties: async () => {
        const opts = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        try {
          // fetching data from the backend
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/getlistings",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong");
          }
          const data = await resp.json();
          // const result = [...data];
          // if (result.length > 10) {
          //   for (let i = 0; i < result.length; i += 10) {
          //     const page = arr.slice(i, i + 10);                 Para el NICE TO HAVE (pagination)
          //     result.push(page);
          //   }
          // }

          const aux1 = data["inmuebles"];
          const aux2 = data["imagenes"];
          const aux3 = getActions().joinBodies(aux1, aux2);
          setStore({ userProperties: aux3 });
          localStorage.setItem("userProperties", JSON.stringify(aux3));
          return true;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      login: async (username, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Error signing up");
          }
          const data = await resp.json();
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          setStore({ token: data.access_token, userInfo: data.user });
          console.log(data.user);
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      signup: async (username, password, full_name, email) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: full_name,
            email: email,
            username: username,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            opts
          );
          if (resp !== 200) {
            throw new Error("Error signin up");
          }
          const data = await resp.json();
          return true;
        } catch (error) {
          console.error(`${error.name} : ${error.message}`);
        }
      },
      getTokenFromStorage: () => {
        const token = localStorage.getItem("token");
        if (token && token !== "" && token !== undefined)
          setStore({ token: token });
        console.log("getting token from local storage");
      },
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("messages");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userProperties");
        setStore({ token: null });
        console.log("logging out");
      },
      updateUser: async (full_name, email, password) => {
        const opts = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: full_name,
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/update",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong updating the user");
          }
          const data = await resp.json();
          if (data.message == "Updated user succesfully") {
            const updatedUser = data.user_info;
            localStorage.setItem("user_info", JSON.stringify(updatedUser));
            setStore({ userInfo: data.user_info });
          }
          return data;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      deleteUser: async () => {
        const opts = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/delete",
            opts
          );
          if (resp.status !== 200) {
            throw new Error("Something went wrong updating the user");
          }
          const data = await resp.json();
          if (data == "user deleted") {
            getActions().logout();
          }
          return true;
        } catch (e) {
          console.log(`${e.name}: ${e.message}`);
        }
      },
      //sincroniza la informacion de usuario entre localStorage y store
      syncUserInfo: () => {
        const userInfo = JSON.parse(localStorage.getItem("user_info"));
        setStore({ userInfo: userInfo });
      },
      //
      createRequest: () => {
        const store = getStore();
        let aux = {};
        aux["operacion"] = store.operacion;
        aux["comunidad"] = store.comunidad;
        aux["provincia"] = store.provincia;
        // store.preciomin >= store.preciomax
        //   ? (aux["preciomin"] = 0)
        aux["preciomin"] = store.preciomin;
        // store.preciomax <= store.preciomin
        //   ? (aux["preciomax"] = 999999999)
        aux["preciomax"] = store.preciomax;
        aux["vivienda_piso"] = store.vivienda_piso;
        aux["vivienda_chalet"] = store.vivienda_chalet;
        aux["vivienda_villa"] = store.vivienda_villa;
        aux["caracteristica_pet"] = store.caracteristica_pet;
        aux["caracteristica_garage"] = store.caracteristica_garage;
        aux["caracteristica_piscina"] = store.caracteristica_piscina;
        aux["caracteristica_terraza"] = store.caracteristica_terraza;
        aux["habitaciones"] = store.habitaciones;
        aux["baños"] = store.baños;
        setStore({ body_request: aux });
      },

      clearResponse: () => {
        const store = getStore();
        setStore({ body_response: "buscando coincidencias..." });
      },

      /*------------------------------- INICIO DE LAS FUNCIONES DE EVENTOS PARA LOS FILTROS --------------------------------------------*/

      // selectores que estan en Home y Aside (dashboard):

      updateOperacion: (e) => {
        // funcion onChange de Select
        setStore({ operacion: e.target.value });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        getActions().fillLocalStorage();
      },

      updatePublicarOperacion: (e) => {
        // funcion onChange de Select
        setStore({ operacion: e.target.value });
        localStorage.setItem("pub_operacion", e.target.value);
      },

      updateComunidad: (e) => {
        // funcion onChange de Select
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
        getActions().fillLocalStorage();
      },

      updatePublicarComunidad: (e) => {
        // funcion onChange de Select
        const store = getStore();
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ comunidad: e.target.value });
        localStorage.setItem("pub_comunidad", e.target.value);
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
        // funcion onChange de Select
        setStore({ provincia: e.target.value });
        getActions().fillLocalStorage();
      },

      updatePublicarProvincia: (e) => {
        // funcion onChange de Select
        setStore({ provincia: e.target.value });
        localStorage.setItem("pub_provincia", e.target.value);
      },

      updatePublicarMunicipio: (e) => {
        let muni = e.target.value;
        let capital = muni.charAt(0).toUpperCase();
        let resto = muni.slice(1).toLowerCase();
        let municipio = capital + resto;
        localStorage.setItem("pub_municipio", municipio);
        setStore({ municipio: municipio });
      },

      updatePublicarDireccion: () => {
        setStore({ direccion: localStorage.getItem("pub_direccion") });
      },

      // updatePublicarDireccion: (e) => {  deprecada porque ahorqa se usa el adressinput
      //   let direccion = e.target.value;
      //   let capital = direccion.charAt(0).toUpperCase();
      //   let resto = direccion.slice(1).toLowerCase();
      //   localStorage.setItem("pub_direccion", capital + resto);
      //   setStore({ direccion: capital + resto });
      // },

      updatePublicarDescripcion: (e) => {
        let descripcion = e.target.value;
        let capital = descripcion.charAt(0).toUpperCase();
        let resto = descripcion.slice(1).toLowerCase();
        localStorage.setItem("pub_descripcion", capital + resto);
        setStore({ descripcion: capital + resto });
      },

      updatePreciomin: (e) => {
        // funcion onChange de Select
        const store = getStore();
        if (e.target.value == "Mín") {
          setStore({ preciomin: Number(0) });
        } else if (Number(e.target.value) >= Number(store.preciomax)) {
          setStore({ preciomin: Number(e.target.value) });
          setStore({ preciomax: Number(999999999) });
        } else {
          setStore({ preciomin: Number(e.target.value) });
        }
        getActions().fillLocalStorage();
      },
      updatePreciomax: (e) => {
        // funcion onChange de Select
        const store = getStore();
        if (e.target.value == "Máx") {
          setStore({ preciomax: Number(999999999) });
        } else if (Number(e.target.value) <= Number(store.preciomin)) {
          setStore({ preciomax: Number(e.target.value) });
          setStore({ preciomin: Number(0) });
        } else {
          setStore({ preciomax: Number(e.target.value) });
        }
        getActions().fillLocalStorage();
      },

      updatePublicarPrecio: (e) => {
        if (e.target.value <= 0) {
          swal("debe ingresar un monto válido");
        } else {
          localStorage.setItem("pub_precio", e.target.value);
          setStore({ precio: e.target.value });
        }
      },

      // selectores que solo estan en Aside:

      // funcion de checkbox
      updateViviendaPiso: () => {
        const store = getStore();
        if (store.vivienda_piso == true) {
          setStore({ vivienda_piso: false });
        } else {
          setStore({ vivienda_piso: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox
      updateViviendaChalet: () => {
        const store = getStore();
        if (store.vivienda_chalet == true) {
          setStore({ vivienda_chalet: false });
        } else {
          setStore({ vivienda_chalet: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox
      updateViviendaVilla: () => {
        const store = getStore();
        if (store.vivienda_villa == true) {
          setStore({ vivienda_villa: false });
        } else {
          setStore({ vivienda_villa: true });
        }
        getActions().fillLocalStorage();
      },

      updatePublicarTipoVivienda: (e) => {
        setStore({ tipo_vivienda: e.target.value });
        localStorage.setItem("pub_vivienda", e.target.value);
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaPet: () => {
        const store = getStore();
        if (store.caracteristica_pet == true) {
          setStore({ caracteristica_pet: false });
        } else {
          setStore({ caracteristica_pet: true });
        }
        getActions().fillLocalStorage();
      },

      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaGarage: () => {
        const store = getStore();
        if (store.caracteristica_garage == true) {
          setStore({ caracteristica_garage: false });
        } else {
          setStore({ caracteristica_garage: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaPiscina: () => {
        if (store.caracteristica_piscina == true) {
          setStore({ caracteristica_piscina: false });
        } else {
          setStore({ caracteristica_piscina: true });
        }
        getActions().fillLocalStorage();
      },
      // funcion de checkbox (IMPORTANTE: una caracteristica en valor True NO excluirá a las otras caracteristicas en el filtrado en API)
      updateCaracteristicaTerraza: () => {
        if (store.caracteristica_terraza == true) {
          setStore({ caracteristica_terraza: false });
        } else {
          setStore({ caracteristica_terraza: true });
        }
        getActions().fillLocalStorage();
      },
      ///
      updatePublicarCaracteristicaPet: () => {
        const store = getStore();
        if (store.caracteristica_pet == true) {
          setStore({ caracteristica_pet: false });
          localStorage.setItem("pub_pet", false);
        } else {
          setStore({ caracteristica_pet: true });
          localStorage.setItem("pub_pet", true);
        }
      },
      updatePublicarCaracteristicaGarage: () => {
        const store = getStore();
        if (store.caracteristica_garage == true) {
          setStore({ caracteristica_garage: false });
          localStorage.setItem("pub_garage", false);
        } else {
          setStore({ caracteristica_garage: true });
          localStorage.setItem("pub_garage", true);
        }
      },
      updatePublicarCaracteristicaPiscina: () => {
        const store = getStore();
        if (store.caracteristica_piscina == true) {
          setStore({ caracteristica_piscina: false });
          localStorage.setItem("pub_piscina", false);
        } else {
          setStore({ caracteristica_piscina: true });
          localStorage.setItem("pub_piscina", true);
        }
      },
      updatePublicarCaracteristicaTerraza: () => {
        const store = getStore();
        if (store.caracteristica_terraza == true) {
          setStore({ caracteristica_terraza: false });
          localStorage.setItem("pub_terraza", false);
        } else {
          setStore({ caracteristica_terraza: true });
          localStorage.setItem("pub_terraza", true);
        }
      },

      // funcion de checkbox  (IMPORTANTE: una option excluirá a las otras options en el filtrado en API)
      updateHabitacion: (e) => {
        setStore({ habitaciones: e.target.value });
        getActions().fillLocalStorage();
      },
      // funcion de checkbox  (IMPORTANTE: una option excluirá a las otras options en el filtrado en API)
      updateBaño: (e) => {
        setStore({ baños: e.target.value });
        getActions().fillLocalStorage();
      },

      updatePublicarHabitaciones: (e) => {
        if (e.target.value <= 0) {
          swal("debe ingresar un monto válido");
        } else {
          setStore({ habitaciones: e.target.value });
          localStorage.setItem("pub_habitaciones", e.target.value);
        }
      },

      updatePublicarBaños: (e) => {
        if (e.target.value <= 0) {
          swal("debe ingresar un monto válido");
        } else {
          setStore({ baños: e.target.value });
          localStorage.setItem("pub_baños", e.target.value);
        }
      },

      /*--------------------------------------------- FIN DE LAS FUNCIONES DE LOS FILTROS --------------------------------------------*/

      /*----------------------------------- INICIO DE LAS FUNCIONES DE PESTAÑA EN EL TABLERO DE RESULTADOS ---------------------------*/
      updateOperacionAlquiler: () => {
        // funcion especial para los pills del dashboard
        setStore({ operacion: "alquiler" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
      },
      updateOperacionCompra: () => {
        // funcion especial para los pills del dashboard
        setStore({ operacion: "compra" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
      },
      updateVistaListado: () => {
        // funcion especial para los pills del dashboard
        setStore({ vista: "listado" });
      },
      updateVistaMapa: () => {
        // funcion especial para los pills del dashboard
        setStore({ vista: "mapa" });
      },
      /*------------------------------------ FIN DE LAS FUNCIONES DE PESTAÑA EN EL TABLERO DE RESULTADOS -------------------------------*/

      /*------------------------------------- INICIO DE LAS FUNCIONES DE ENTREGA Y RECUPERACION DE DATA ------------------------------ */

      fillLocalStorage: () => {
        const store = getStore();
        // funcion vuelca datos del store en LocalStorage al pasar a otra página. Se debe usar al actualizar cada filtro
        localStorage.setItem("operacion", store.operacion);
        localStorage.setItem("comunidad", store.comunidad);
        localStorage.setItem("provincia", store.provincia);
        localStorage.setItem("preciomin", store.preciomin);
        localStorage.setItem("preciomax", store.preciomax);
        localStorage.setItem("vista", "listado");
        localStorage.setItem("vivienda_piso", store.vivienda_piso);
        localStorage.setItem("vivienda_chalet", store.vivienda_chalet);
        localStorage.setItem("vivienda_villa", store.vivienda_villa);
        localStorage.setItem("caracteristica_pet", store.caracteristica_pet);
        localStorage.setItem(
          "caracteristica_garage",
          store.caracteristica_garage
        );
        localStorage.setItem(
          "caracteristica_piscina",
          store.caracteristica_piscina
        );
        localStorage.setItem(
          "caracteristica_terraza",
          store.caracteristica_terraza
        );
        localStorage.setItem("habitaciones", store.habitaciones);
        localStorage.setItem("baños", store.baños);
        localStorage.setItem("periodo_alquiler", store.periodo_alquiler);
      },
      syncLocalStorageToStore: () => {
        // funcion recupera datos de LocalStorage y los guarda en el store nuevamente al cargar la página
        setStore({ operacion: localStorage.getItem("operacion") });
        setStore({ comunidad: localStorage.getItem("comunidad") });
        setStore({ provincia: localStorage.getItem("provincia") });
        setStore({ preciomin: localStorage.getItem("preciomin") });
        setStore({ preciomax: localStorage.getItem("preciomax") });
        setStore({ vista: localStorage.getItem("vista") });
        setStore({ vivienda_piso: localStorage.getItem("vivienda_piso") });
        setStore({ vivienda_chalet: localStorage.getItem("vivienda_chalet") });
        setStore({ vivienda_villa: localStorage.getItem("vivienda_villa") });
        setStore({
          caracteristica_pet: localStorage.getItem("caracteristica_pet"),
        });
        setStore({
          caracteristica_garage: localStorage.getItem("caracteristica_garage"),
        });
        setStore({
          caracteristica_piscina: localStorage.getItem(
            "caracteristica_piscina"
          ),
        });
        setStore({
          caracteristica_terraza: localStorage.getItem(
            "caracteristica_terraza"
          ),
        });
        setStore({ habitaciones: localStorage.getItem("habitaciones") });
        setStore({ baños: localStorage.getItem("baños") });
        setStore({
          periodo_alquiler: localStorage.getItem("periodo_alquiler"),
        });
      },
      resetStoreVariables: () => {
        // esta funcion resetea los filtros al volver al home desde el nav o al refrescar el home
        const store = getStore();
        setStore({ body_request: {} });
        setStore({ body_response: "buscando coincidencias..." });
        setStore({ operacion: "todas" });
        setStore({ comunidad: "todas" });
        setStore({ provincia: "todas" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        setStore({ vista: "listado" });
        setStore({ vivienda_piso: false });
        setStore({ vivienda_chalet: false });
        setStore({ vivienda_villa: false });
        setStore({ caracteristica_pet: false });
        setStore({ caracteristica_garage: false });
        setStore({ caracteristica_piscina: false });
        setStore({ caracteristica_terraza: false });
        setStore({ habitaciones: "cualquiera" });
        setStore({ baños: "cualquiera" });
        setStore({ periodo_alquiler: "por meses" });
        setStore({ selectedImages: [] });
        setStore({ receivedUrls: [] });
        setStore({ pago: false });
        setStore({ tipo_vivienda: "" });
        setStore({ longitude: 0 });
        setStore({ latitude: 0 });
        setStore({ municipio: "" });
        setStore({ direccion: "" });
        setStore({ descripcion: "" });
        setStore({ precio: "" });
        setStore({ premium: false });
        setStore({ inmueblesBodyRequest: {} });
        setStore({ response_publicar: "" });
      },

      /*------------------------------------- FIN DE LAS FUNCIONES DE ENTREGA Y RECUPERACION DE DATA ------------------------------ */

      /*----------------------------------------- INICIO DE LAS FUNCIONES FETCH API -------------------------------------------------*/
      joinBodies: (arreglo1, arreglo2) => {
        const store = getStore();
        const arr1 = arreglo1;
        const arr2 = arreglo2;
        arr1.forEach((item) => (item["fotos"] = []));

        for (let i of arr1) {
          for (let j of arr2) {
            if (j["inmueble_id"] == i["id"]) {
              i["fotos"].push(j["imagen_url"]);
            }
          }
        }
        return arr1;
      },

      getProperties: async () => {
        const store = getStore();
        const request = store.body_request;
        let opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        };
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/properties",
            opts
          );
          if (resp.status != 200) {
            throw new Error("The fetch has failed");
          }
          const data = await resp.json();
          const aux1 = data["inmuebles"];
          const aux2 = data["imagenes"];
          const aux3 = getActions().joinBodies(aux1, aux2);
          setStore({ body_response: aux3 });
          console.log("this came from the backend", aux3);
        } catch (error) {
          console.log("The fetch has failed: ", error);
        }
      },
      storeLongitude: (longitude) => {
        setStore({ longitude: longitude });
      },
      storeLatitude: (latitude) => {
        setStore({ latitude: latitude });
      },
      bulletMonth: (e) => {
        setStore({ periodo_alquiler: "por meses" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        getActions().fillLocalStorage();
      },
      bulletDay: (e) => {
        setStore({ periodo_alquiler: "por días" });
        setStore({ preciomin: 0 });
        setStore({ preciomax: 999999999 });
        getActions().fillLocalStorage();
      },

      uploadImagesToStore: (e) => {
        const store = getStore();
        setStore({ selectedImages: e.target.files });
        console.log(store.selectedImages);
      },

      uploadImagesToCloudinary: async () => {
        const store = getStore();
        const config = {
          cloudName: "dsobw5vfl",
          resource_type: "image",
          upload_preset: "imagenes",
        };
        const apiUrl = `https://api.cloudinary.com/v1_1/${config.cloudName}/${config.resource_type}/upload`;

        for (let i in store.selectedImages) {
          const formData = new FormData();
          formData.append("file", store.selectedImages[i]);
          formData.append("upload_preset", config.upload_preset);
          try {
            const response = await fetch(apiUrl, {
              method: "POST",
              body: formData,
            });
            if (response.status != 200) {
              throw new Error("The fetch has failed");
            }
            const jsonResponse = await response.json();
            setStore({
              receivedUrls: [...store.receivedUrls, jsonResponse.url],
            });
            localStorage.setItem(
              "pub_urls",
              JSON.stringify(store.receivedUrls)
            );
            console.log(store.receivedUrls);
          } catch (error) {
            console.log("The fetch has failed: ", error);
          }
        }
      },

      clearSelectedImages: () => {
        setStore({ selectedImages: [] });
      },

      clearLocalStorageNoUser: () => {
        const itemsLocalStorage = [
          "caracteristica_terraza",
          "preciomin",
          "caracteristica_garage",
          "provincia",
          "preciomax",
          "vivienda_villa",
          "caracteristica_pet",
          "periodo_alquiler",
          "comunidad",
          "vivienda_piso",
          "vivienda_chalet",
          "baños",
          "vista",
          "caracteristica_piscina",
          "habitaciones",
          "operacion",
          "pub_operacion",
          "pub_comunidad",
          "pub_provincia",
          "pub_municipio",
          "pub_direccion",
          "pub_descripcion",
          "pub_precio",
          "pub_vivienda",
          "pub_pet",
          "pub_garage",
          "pub_piscina",
          "pub_terraza",
          "pub_habitaciones",
          "pub_baños",
          "resp_element",
          "pub_longitude",
          "pub_latitude",
          "pub_urls",
        ];
        for (let x of itemsLocalStorage) {
          localStorage.removeItem(x);
        }
      },

      createInmueblesBodyRequest: () => {
        const store = getStore();
        if (
          localStorage.getItem("pub_direccion") == undefined ||
          localStorage.getItem("pub_operacion") == undefined ||
          localStorage.getItem("pub_comunidad") == undefined ||
          localStorage.getItem("pub_provincia") == undefined ||
          localStorage.getItem("pub_municipio") == undefined ||
          localStorage.getItem("pub_descripcion") == undefined ||
          localStorage.getItem("pub_precio") == undefined ||
          localStorage.getItem("pub_vivienda") == undefined ||
          localStorage.getItem("pub_habitaciones") == undefined ||
          localStorage.getItem("pub_baños") == undefined
        ) {
          swal("Faltan datos");
          setStore({ charging: false });
        } else {
          let fuentesRequest = [
            "pub_operacion",
            "pub_comunidad",
            "pub_provincia",
            "pub_municipio",
            "pub_direccion",
            "pub_longitude",
            "pub_latitude",
            "pub_descripcion",
            "pub_precio",
            "pub_vivienda",
            "pub_pet",
            "pub_garage",
            "pub_piscina",
            "pub_terraza",
            "pub_habitaciones",
            "pub_baños",
            "pub_premium",
          ];
          let aux = {};
          let user_info = JSON.parse(localStorage.getItem("user_info"));
          let user_id = user_info.id;
          aux["user_id"] = user_id;
          for (let x of fuentesRequest) {
            aux[x] = localStorage.getItem(x);
          }
          aux["fotos"] = store.receivedUrls;
          setStore({ inmueblesBodyRequest: aux });
          console.log(
            "este es el request para publicar el inmueble: " +
              JSON.stringify(store.inmueblesBodyRequest)
          );
        }
      },
      switchOnCharging: () => {
        setStore({ charging: true });
      },
      switchOffCharging: () => {
        setStore({ charging: false });
      },
      updateResponsePublicar: (dato) => {
        setStore({ response_publicar: dato });
      },

      // clearPubFromLocalStorage: () => {  DEPRECADO por clearLocalStorageNoUser
      //   let itemsLocalStorage = [
      //     "pub_operacion",
      //     "pub_comunidad",
      //     "pub_provincia",
      //     "pub_municipio",
      //     "pub_direccion",
      //     "pub_descripcion",
      //     "pub_precio",
      //     "pub_tipo_vivienda",
      //     "pub_habitaciones",
      //     "pub_baños",
      //     "pub_pet",
      //     "pub_piscina",
      //     "pub_terraza",
      //     "pub_garage",
      //     "pub_fotos",
      //     "pub_latitud",
      //     "pub_longitud",
      //     "pub_pago",
      //   ];
      //   for (let x of itemsLocalStorage) {
      //     localStorage.removeItem(x);
      //   }
      // },
    },
  };
};

export default getState;
