import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			token: sessionStorage.getItem("token") || "",
			role: sessionStorage.getItem("role") || null,
			user_id: sessionStorage.getItem("user_id") || null,
			exerciseOptions: {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
					'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
				},
			},
			youtubeOptions: {
				method: 'GET',
				headers: {
					'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
					'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
				},
			},
		},
		actions: {
			logOut: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("role");
				sessionStorage.removeItem("user_id");
				setStore({ token: "", role: null, user_id: null });
			},
			login: async (loginData) => {
				const response = await fetch(`${process.env.BACKEND_URL}/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(loginData),
				});
				if (response.ok) {
					const data = await response.json();
					const decoded = jwtDecode(data.access_token);
					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("role", decoded.role);
					sessionStorage.setItem("user_id", decoded.sub);
					setStore({ token: data.access_token, role: decoded.role, user_id: decoded.sub });
				} else {
					alert("Wrong user or password");
				}
			},
			signUp: async (email, password) => {
				const response = await fetch(`${process.env.BACKEND_URL}/signup`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				});
				if (response.ok) {
					const data = await response.json();
					sessionStorage.setItem("token", data.access_token);
				} else {
					alert("Error al registrarse");
				}
			},
			postUserData: async (formData) => {
				const store = getStore();
				const response = await fetch(`${process.env.BACKEND_URL}/user_data`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${store.token}`,
					},
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					const decoded = jwtDecode(store.token);
					setStore({ user_id: decoded.sub, role: decoded.role });
				} else {
					console.error('Error al enviar los datos');
				}
			},
			fetchDataExercice: async (url, options) => {
				const response = await fetch(url, options);
				const data = await response.json();
				return data;
			},
		},
	};
};

export default getState;