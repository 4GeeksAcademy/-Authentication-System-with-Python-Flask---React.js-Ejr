import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			auth: false
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
					const response = await fetch (`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					})
					let data = await response.json()
					localStorage.setItem("token", data.access_token)
					setStore({ auth: data.logged })
					console.log(data);
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
					let response = await fetch('${process.env.BACKEND_URL}/api/valid_token', {
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
			}

		}

	}
};


export default getState;
