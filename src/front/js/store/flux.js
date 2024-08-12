import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			auth: false,
			error: {},
			mercadoPago: {},
		},
		actions: {
			// loginFetch: async () => {
			// 	try {
			// 	  let response = await axios.get(`${process.env.BACKEND_URL}/api/login`);
			// 	 console.log(response)
			// 	  return response.data;
			// 	} catch (error) {
			// 	  console.error('Error:', error);
			// 	  throw error; 
			// 	}



			login: async (email, password) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					if (response.status === 201) {
						let data = await response.json()
						setStore({ auth: data.logged })
						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })

						return false
					}

					let data = await response.json()
					localStorage.setItem("token", data.access_token)
					setStore({ auth: data.logged })

					return true
				} catch (error) {
					console.log(error);
					return false
				}
			},

			logout: () => {
				// console.log("funciona");
				localStorage.removeItem("token");
				setStore({ auth: false })
				return true

			},

			validToken: async () => {
				let token = localStorage.getItem("token");
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/valid_token`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},

					})
					let data = await response.json()
					console.log(data); // me muestra data en consola

				}
				catch (error) {
					console.log(error);
					return false
				}
			},
			register: async (name, email, password, address, phone) => {
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"name": name,
							"email": email,
							"password": password,
							"address": address,
							"phone": phone,
							"is_active": true,
							"id_role": 1
						})
					})

					if (response.status === 201) {
						let data = await response.json()

						// localStorage.setItem("token", data.access_token)
						setStore({ auth: data.logged })

						return true
					}
					if (response.status === 404) {
						let data = await response.json()
						setStore({ error: data.msj })

						return false
					}
				} catch (error) {
					console.log(error);
					return false
				}
			},

			pagoMercadoPago: async (total) => {
				try {
					const response = await axios.post(back + "/api/preference", {
						total: total,  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
					});
					console.log(response.data);
					setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) {
					console.log(error);
				}
			},

		}

	}
};


export default getState;
