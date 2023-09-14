const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userInfo: null,
			message: null,
			modalmsje: [
				{
					boton: "Click",
					header: "headerok",
					body: "bodyok",
					footer: "footerok"
				}
			],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			//endpoint es la página
			apiFetchPublic: async(endpoint, method="GET", body=null)=>{
				try{
					var request
					if (method=="GET"){
						request = fetch(process.env.BACKEND_URL + "/api" + endpoint)
					} else {
						//objeto params con lo necesario para la petición que no es get
						const params={
							method,
							headers:{
								"Content-Type":"application/json"
							}
						}
						//si hay body lo agregamos a los params
						if (body) params.body = JSON.stringify(body)
						request = fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					}
					//hacemos la petición
					const resp = await request
					//obtenemos los datos de la petición
					const data = await resp.json()
					console.log("PRUEBA2"+ JSON.stringify(data)+ resp.status)
					return {code: resp.status, data}
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			apiFetchProtected: async(endpoint, method="GET", body=null)=>{
				try{
					//objeto params con lo necesario para la petición que no es get
					//incluido token en encabezado de autorización
					const {accessToken} = getStore()
					if (!accessToken || accessToken==null){
						return "No token"
					}
					const params={
						method,
						headers:{
							"Authorization": "Bearer " + accessToken
						}
					}
					//si hay body lo agregamos a los params
					if (body) {
						params.headers["Content-Type"]= "application/json",
						params.body = JSON.stringify(body)
					}
					//hacemos la petición
					const resp = await fetch(process.env.BACKEND_URL + "/api" + endpoint, params)
					//obtenemos los datos de la petición
					const data = await resp.json()
					console.log("PRUEBA1"+ JSON.stringify(data)+ resp.status)
					return {code: resp.status, data}
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			loadTokens:()=>{
				//traer el token del almacenamiento local
				let token = localStorage.getItem("accessToken")
				setStore({accessToken:token})
			},
			login:async(email, password)=>{
				try{
					const {apiFetchPublic} = getActions()
					//hacemos la petición
					//trae de la API el code(resp.status) y data (mensaje y token)
					//es decir, lo que regresa la función apiFetchPublic()
					const resp = await apiFetchPublic("/login", "POST", {email, password})
					if (resp.code==200){
						//si no hubo error agrego la data de API a mis variables *****
						const {message, token} = resp.data
						//guardamos token en almacenamiento local
						localStorage.setItem("accessToken", token)
						//guardamos el token en el store
						setStore ({accessToken:token})
					} else {
						//borramos el token 
						console.log("borramos el token")
						localStorage.removeItem("accessToken")
					}
					console.log("PRUEBA 4", JSON.stringify(resp))
					
					return resp
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			signup:async(email, password, name)=>{
				try{
					const {apiFetchPublic} = getActions()
					//hacemos la petición
					//trae de la API el code(resp.status) y data (mensaje y token)
					//es decir, lo que regresa la función apiFetchPublic()
					const resp = await apiFetchPublic("/signup", "POST", {email, password, name})
					/*if (resp.code==200){
						//si no hubo error agrego la data de API a mis variables *****
						const {message, token} = resp.data
						//guardamos token en almacenamiento local
						localStorage.setItem("accessToken", token)
						//guardamos el token en el store
						setStore ({accessToken:token})
					} else {
						//borramos el token 
						console.log("borramos el token")
						localStorage.removeItem("accessToken")
					}*/
					console.log("PRUEBA 3", JSON.stringify(resp))
					return resp
				} catch(error){
					console.log("Error al solicitar los datos")
				}
			},
			getUserInfo: async()=>{
				try{
					const {apiFetchProtected} = getActions()
					const resp = await apiFetchProtected("/helloprotected")
					///////////// extra
					console.log("PRUEBA2", resp)
					if (resp.code==200){
						setStore({userInfo:resp.data})
						return "Ok"
					}
					//si el token expiró
					//borramos token del almacenamiento local y del store
					localStorage.removeItem("accessToken")
					if (resp.code==401){
						setStore({accessToken:null})
						alert("Sesión expirada")
					}
					return "Sesión expirada"
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const {apiFetchPublic} = getActions()
					const data = await apiFetchPublic("/hello")
					console.log("DATA: ", data)
					setStore({ message: data.data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			dataModal: (dataMsje) => {
				const store = getStore();
				store.modalmsje.splice(0, 1, dataMsje);
				setStore(store);
			}
		}
	};
};

export default getState;