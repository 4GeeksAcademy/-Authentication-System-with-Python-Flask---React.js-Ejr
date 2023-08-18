const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			logged: false,

			movies: [],
			movie: null,
			actor: null,
			director: null, 

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			
			login: async (form) => {
				const apiUrl = `${process.env.BACKEND_URL}api/login`
				console.log(form)
				try {
					const res = await fetch(apiUrl, {

						method: "POST",

						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(form)
					})
					if (res.ok) {

						const data = await res.json()
						localStorage.setItem("token", data?.token)
						setStore({ logged: true })
						console.log(getStore().logged, "logged")
						return true
					} else {
						console.log("login failed", res.status)
					}

				} catch (error) {
					console.error(error)
					return false
				}
			},
			logout: () => {
				localStorage.removeItem("token")
				setStore({ logged: false })

			},
			getMovies: async () => {
				const apiUrl = `${process.env.BACKEND_URL}api/movies`
				try {
					const res = await fetch(apiUrl, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					})
					if (res.ok) {
						const data = await res.json()
						console.log(data)
						setStore({ movies: data })
						console.log(getStore().movies);
						return data;
					} else {
						console.log("Request failed", res.status)
					}
				} catch (error) {
					console.error(error)
					return null;
				}
			},

			getMovieById: async (movieId) => {
				const apiUrl = `${process.env.BACKEND_URL}api/movies/${movieId}`
				try {
					const res = await fetch(apiUrl, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					})
					if (res.ok) {
						const data = await res.json()
						setStore({ movie: data })
						console.log(data);
						return data;
					} else {
						console.log("Request failed", res.status)
					}
				} catch (error) {
					console.error(error)
					return null;
				}
			},

			getActorById: async (actorId) => {
				const apiUrl = `${process.env.BACKEND_URL}api/actors/${actorId}`;
				try {
					const res = await fetch(apiUrl, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					if (res.ok) {
						const data = await res.json();
						setStore({ actor: data });
						console.log(data);
						return data;
					} else {
						console.log("Request failed", res.status);
					}
				} catch (error) {
					console.error(error);
					return null;
				}
			},
			getDirectorById: async (directorId) => {
				const apiUrl = `${process.env.BACKEND_URL}api/directors/${directorId}`;
				try {
					const res = await fetch(apiUrl, {
						method: "GET",
						headers: { "Content-Type": "application/json" }
					});
					if (res.ok) {
						const data = await res.json();
						setStore({ director: data });
						console.log(data);
						return data;
					} else {
						console.log("Request failed", res.status);
					}
				} catch (error) {
					console.error(error);
					return null;
				}
			}

	

		}
	};
};

export default getState;