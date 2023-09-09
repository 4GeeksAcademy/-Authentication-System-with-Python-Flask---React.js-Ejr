const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			accessToken: null,
			userInfo: null,
			message: null,
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
					}
					/*if(resp.code!=200){
						if (resp.code == 401){
							console.error("Credenciales inválidas, verifique nombre de usuario y contraseña")
						}else {
							console.error("Login error")
						}
						return resp
					}
					//console.log({resp})
					//si no hubo error agrego la data de API a mis variables *****
					const {message, token} = resp.data
					//guardamos el token en el store
					setStore ({accessToken:token})*/
					//return message
					return resp
				}catch(error){
					console.log("Error al solicitar los datos", error)
				}
			},
			signup:(email, password)=>{

			},
			getUserInfo:()=>{

			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const {apiFetchPublic} = getActions()
					const data = await apiFetchPublic("/hello")
					setStore({ message: data.data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
			}
		}
	};
};

export default getState;
