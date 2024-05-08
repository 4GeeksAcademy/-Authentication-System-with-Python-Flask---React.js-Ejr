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
					console.log("token", data)
					const decoded = jwtDecode(data.access_token);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token, email: decoded.sub, role: decoded.role });					
				}
			},


			
		}
	};
};

export default getState;
