import axios from "axios";
// import mercadopago from "mercadopago";
const apiUrl = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			services: [],
			vehicleType: [],
			mercadopago: {},
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			userLogin: async (email, password) => {
				const resp = await getActions().apiFetch("/api/login", "POST", { email, password })
				console.log({ email, password })
				if (resp.code >= 400) {
					return resp
				}
				setStore({ accessToken: resp.data.accessToken })
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},
			userCreate: async ( first_name, last_name, city, country, zip_code, address_one, address_two, phone, email, password) => {
				const resp = await getActions().apiFetch("/api/register", "POST", { first_name, last_name, city, country, zip_code, address_one, address_two, phone, email, password })
				console.log({ first_name, last_name, email, password })
				if (resp.code >= 400) {
					return resp
				}
				setStore({ accessToken: resp.data.accessToken })
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},
			loadToken() {
				let token = localStorage.getItem("accessToken")
				setStore({ accessToken: token })
			},
			loadTestData: async (name, description, price, vehicle_type) =>{
				const resp = await getActions().apiFetch("/api/testdata", "POST", {name, description, price, vehicle_type})
				if (resp.code >= 400) {
					return resp
				}
			},
			fetchServices: async () => {
				try {
				  const resp = await getActions().apiFetch("/api/services", "GET");
				  if (resp.code >= 400) {
					return resp;
				  }
				  setStore({ services: resp.data.services });
				  return resp;
				} catch (error) {
				  console.log("Error fetching services", error);
				}
			  },
			  fetchVehicleTypes: async () => {
				try {
				  const resp = await getActions().apiFetchProtected("/api/book", "GET");
				  if (resp.code >= 400) {
					return resp;
				  }
				  setStore({ vehicle_types: resp.data.vehicle_types });
				  console.log("Carga exitosa")
				  return resp;
				} catch (error) {
				  console.log("Error fetching vehicle types", error);
				}
			  },
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
			},
			apiFetch: async (endpoint, method = "GET", body = {}) => {
				let resp = await fetch(apiUrl + endpoint, method == "GET" ? undefined :{
				// let resp = await fetch(apiUrl + endpoint, {
					method,
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
						// "Authorization" : "Bearer "+localStorage.getItem("accessToken") 
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data: data }
			},
			apiFetchProtected: async (endpoint, method = "GET", body = {}) => {
				let params = {
					headers: {
						"Authorization": `Bearer ${getStore().accessToken}`
					}
				}
				if (method !== "GET") {
					params.method = method
					params.body = JSON.stringify(body)
					params.headers["Content-Type"] = "application/json"
				}
				console.log(params)
				console.log(getStore().accessToken)
				let resp = await fetch(apiUrl + endpoint, params)
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data }
			},
			requestPasswordRecovery: async (email)=>{
				const resp = await getActions().apiFetch("/api/recoverypassword", "POST", { email })
				return resp
				
			},
			changePasswordRecovery: async (passwordToken, password)=>{
				let resp = await fetch(apiUrl + "/api/changepassword",{
					// let resp = await fetch(apiUrl + endpoint, {
						method:"POST",
						body: JSON.stringify(password),
						headers: {
							"Content-Type": "application/json",
							"Authorization" : "Bearer "+passwordToken
						}
					})
					if (!resp.ok) {
						console.error(`${resp.status}: ${resp.statusText}`)
						return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
					}
					let data = await resp.json()
					return { code: resp.status, data: data }
			},

			pagoMercadopago: async ()=>{
				try{
					const response=await axios.post(apiUrl + "/api/preference",{
						// aca va la info que se quiere enviar

					});
					setStore({
						mercadopago: response.data
					})

				} catch (error){
					console.log(error)
				}
			},

			// fetchServices: async(name, description, price) =>{
			// 	let baseUrl = apiUrl+"/api/services"

			// 	try{
			// 		let response = await fetch(baseUrl)
			// 		if (!response.ok) return response.status
			// 		let data = await response.json()
			// 		let obj = {}
			// 		obj[name] = {}
			// 	}
			// },


			addServices: (element) => {
				const service = getStore().services;
				if (service.includes(element) == false) {
					const newServices = service.concat(element);
					setStore({ services: newServices })
					console.log(getStore().services)
				}

			},

			deleteServices: (services) => {
				const listservices = getStore().services;
				const newservices = listservices.filter((element) => element !== services)
				setStore({services: newservices})
			}
		},
	};
};

	export default getState;
