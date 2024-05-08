import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

			token: sessionStorage.getItem("token") || "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			logOut: () => {
				sessionStorage.removeItem("token");
				setStore({ token: "" });
			},
			login: async (loginData) => {
				const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(loginData)
				});
				if (!response.ok) {
					alert("Wrong user or password")
				}
				if (response.ok) {
					const data = await response.json()
					const decoded = jwtDecode(data.access_token);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, email: decoded.sub, role: decoded.role });					
				}
			},
			signUp: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/signup", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(email, password)
				})
				if (!response.ok) {
					alert("Error al registrarse")
				}
				if (response.ok) {
					const data = await response.json()
					const decoded = jwtDecode(data.access_token);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, email: decoded.sub, role: decoded.role });					
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
			}
		}
	};
};

export default getState;
