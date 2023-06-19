import axios from "axios";
import jwt_decode from "jwt-decode";
// import mercadopago from "mercadopago";
const apiUrl = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			new_service: [],
			services: [],
			vehicleType: [],
			mercadopago: {},
			user_services: [],
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

			// addFavorites: async (name, price, date) => {
			// 	const resp = await getActions().apiFetchProtected("/api/shoppingCar", "POST", { name:name, price:price, date:date })
			// 	if (resp.code >= 400) {
			// 		return resp
			// 	}

			// 	setStore({ new_service : resp.data});
			// 	return resp
			// },
			addFavorites: async (name, price, date) => {
				const resp = await getActions().apiFetchProtected("/api/shoppingCar", "POST", { name: name, price: price, date: date });
				if (resp.code >= 400) {
					return resp;
				}

				const { new_service } = getStore();
				const updatedNewService = [...new_service, resp.data];
				setStore({ new_service: updatedNewService });

				return resp;
			},
			deleteFavorites: async (id) => {
				const { user_services } = getStore();
				const newFavorites = [...user_services]
				let favoriteIndex = newFavorites.findIndex(favorite => favorite.id == id)
				newFavorites.splice(favoriteIndex, 1)
				setStore({ user_services: newFavorites })
				const resp = await getActions().apiFetchProtected(`/api/deleteShoppingCar/${id}`, "DELETE", {newFavorites})
				if (resp.code >= 400) {
					return resp;
				}
			},
			fetchShoppingCart: async () => {
				try {
					const resp = await getActions().apiFetchProtected("/api/getShoppingCar", "GET");
					console.log("API Response:", resp.data);
					if (resp.code >= 400) {
						return resp;
					}
					setStore({ user_services: resp.data.user_services });
					return resp;
				} catch (error) {
					console.log("Error fetching user services", error);
				}
			},
			// deleteFavorites: (id) => {
			// 	const listservices = getStore().services;
			// 	const newservices = listservices.filter((element) => element !== services)
			// 	setStore({ services: newservices })
			// }
			userLogin: async (email, password) => {
				const resp = await getActions().apiFetch("/api/login", "POST", { email, password })
				console.log({ email, password })
				if (resp.code >= 400) {
					return resp
				}
				setStore({
					accessToken: resp.data.accessToken,
					refreshToken: resp.data.refreshToken
				})
				localStorage.setItem("accessToken", resp.data.accessToken)
				localStorage.setItem("refreshToken", resp.data.refreshToken)
				return resp
			},
			userLogout: async () => {
				const resp = await getActions().apiFetchProtected("/api/logout", "POST")
				if (resp.code >= 400) {
					return resp
				}
				setStore({
					accessToken: null,
					refreshToken: null
				})
				localStorage.removeItem("accessToken")
				localStorage.removeItem("refreshToken")
				return resp

			},
			userCreate: async (first_name, last_name, city, country, zip_code, address_one, address_two, phone, email, password) => {
				const resp = await getActions().apiFetch("/api/register", "POST", { first_name, last_name, city, country, zip_code, address_one, address_two, phone, email, password })
				console.log({ first_name, last_name, email, password })
				if (resp.code >= 400) {
					return resp
				}
				setStore({ accessToken: resp.data.accessToken })
				localStorage.setItem("accessToken", resp.data.accessToken)
				return resp
			},
			loadToken: async () => {
				let accessToken = localStorage.getItem("accessToken")
				let refreshToken = localStorage.getItem("refreshToken")

				if (!accessToken) {
					if (refreshToken) {
						var refreshDecoded = jwt_decode(refreshToken)
						let refreshExpired = new Date(refreshDecoded.exp * 1000) < new Date()
						if (refreshExpired) {
							localStorage.removeItem("accessToken")
							localStorage.removeItem("refreshToken")
							return
						}
					}
				}
				setStore({
					accessToken: accessToken,
					refreshToken: refreshToken
				})
				// Puedo verificar la vigencia del token antes de cargarlo al store
				let expired = true
				try {
					var decoded = jwt_decode(accessToken)
					expired = new Date(decoded.exp * 1000) < new Date()
				} catch {

				}
				console.log({ expired })
				if (expired) {
					await getActions().refreshToken()
					localStorage.removeItem("accessToken")

				}

			},
			refreshToken: async () => {
				let resp = await fetch(apiUrl + "/api/refresh", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + getStore().refreshToken
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				setStore({
					accessToken: data.accessToken,
					refreshToken: data.refreshToken
				})
				localStorage.setItem("accessToken", data.accessToken)
				localStorage.setItem("refreshToken", data.refreshToken)
			},
			loadTestData: async (name, description, price, vehicle_type) => {
				const resp = await getActions().apiFetch("/api/testdata", "POST", { name, description, price, vehicle_type })
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
				let resp = await fetch(apiUrl + endpoint, method == "GET" ? undefined : {
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
				let data = await resp.json()
				if (!resp.ok) {
					// Verificar si el token ha expirado
					if (data.msg == "Token has expired") {
						// Aquí se solicita un nuevo token de acceso
						await getActions().refreshToken()
						params.headers.Authorization = `Bearer ${getStore().accessToken}`
						// Se repite la peticion con el token nuevo
						resp = await fetch(apiUrl + endpoint, params)
						data = await resp.json()
						if (!resp.ok) {
							console.error(`${resp.status}: ${resp.statusText}`)
							return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
						}
					}
					else {
						console.error(`${resp.status}: ${resp.statusText}`)
						return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
					}
					// Si el token expira se debe usar el refresh token para obtener un nuevo access token
					return { code: resp.status, data }
				}

				return { code: resp.status, data }
			},
			requestPasswordRecovery: async (email) => {
				const resp = await getActions().apiFetch("/api/recoverypassword", "POST", { email })
				return resp

			},
			changePasswordRecovery: async (passwordToken, password) => {
				let resp = await fetch(apiUrl + "/api/changepassword", {
					// let resp = await fetch(apiUrl + endpoint, {
					method: "POST",
					body: JSON.stringify(password),
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + passwordToken
					}
				})
				if (!resp.ok) {
					console.error(`${resp.status}: ${resp.statusText}`)
					return { code: resp.status, error: `${resp.status}: ${resp.statusText}` }
				}
				let data = await resp.json()
				return { code: resp.status, data: data }
			},
			pagoMercadopago: async () => {
				try {
					const response = await axios.post(apiUrl + "/api/preference", {
						// aca va la info que se quiere enviar

					});
					setStore({
						mercadopago: response.data
					})

				} catch (error) {
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


			// addServices: (element) => {
			// 	const service = getStore().services;
			// 	if (service.includes(element) == false) {
			// 		const newServices = service.concat(element);
			// 		setStore({ services: newServices })
			// 		console.log(getStore().services)
			// 	}

			// },


		},
	};
};

export default getState;
