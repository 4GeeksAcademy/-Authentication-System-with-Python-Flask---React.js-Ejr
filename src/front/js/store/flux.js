import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			auth:false
		},
		actions: {

			login: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
			
					if (response.status !== 200) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Credenciales incorrectas" };
					}
						const data = await response.json();
						localStorage.setItem("token", data.access_token);
						setStore({ auth: true });
						
						return { success: true };  // Si el login es exitoso, devolvemos success: true

				} catch (error) {
					console.error('Error during login:', error);
					return { success: false, message: "Error de conexión al servidor" };
				}
			},
			

			  logout: () => {
				setStore({ auth: false});
				localStorage.removeItem("token");
			},
			signup: async (email, password) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
			
					if (response.status !== 200) {
						const errorData = await response.json();
						return { success: false, message: errorData.msg || "Error en el registro" };
					}
			
					const data = await response.json();
					console.log("Registro exitoso:", data.msg);
					return { success: true };
					
				} catch (error) {
					console.error("Error during signup:", error);
					return { success: false, message: "Error de conexión al servidor" };
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