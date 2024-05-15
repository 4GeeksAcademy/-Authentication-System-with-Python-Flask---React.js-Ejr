import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || "",
			exerciseOptions: {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
					'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
				}
			},
			youtubeOptions: {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
				}
			},
		},
		actions: {
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
				}
			},
			fetchDataExercice: async (url, options) => {
				const response = await fetch(url, options);
				const data = await response.json();
				return data;
			},
		}
	};
};

export default getState;
