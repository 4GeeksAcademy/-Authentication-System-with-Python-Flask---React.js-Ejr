import Swal from 'sweetalert2'




const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			logged: false,

			movies: [],
			movie: null,

		},
		actions: {
			// Use getActions to call a function within a fuction
		
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
						Swal.fire({
							text: "Login successfully", 
							icon: "success",
							background: "#333",
							iconColor: "#ECCE33",
							confirmButtonColor: "#ECCE33",
							color: "#ffffff",
							confirmButtonStyle: "#ECCE33",
						})
						return true
					} else {
						console.log("login failed", res.status)
						Swal.fire({
							text: "Please, try again", 
							icon: "error",
							background: "#333",
							confirmButtonColor: "#ECCE33",
							color: "#ffffff",
							confirmButtonStyle: "#ECCE33",
						})
						return false
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

			signup: async (user) => {
				const apiUrl = `${process.env.BACKEND_URL}api/signup`
				console.log(user, apiUrl)
				try {
					const res = await fetch(apiUrl, {
						method:"POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(user)
					})
					if (res.ok) {

						const data = await res.json()
						localStorage.setItem("token", data?.token)
						setStore({ logged: true })
						console.log(getStore().logged, "logged")
						Swal.fire({
							text: "SignIn successfully", 
							icon: "success",
							background: "#333",
							iconColor: "#ECCE33",
							confirmButtonColor: "#ECCE33",
							color: "#ffffff",
							confirmButtonStyle: "#ECCE33",
						})
						return true
					} else {
						console.log("Signup failed", res.status)
						Swal.fire({
							text: "Please, try again", 
							icon: "error",
							background: "#333",
							confirmButtonColor: "#ECCE33",
							color: "#ffffff",
							confirmButtonStyle: "#ECCE33",
						})
					}	return false

				} catch (error) {
					console.error(error)
					return false
				}
			},


			validateToken: async () => {
				let token = localStorage.getItem("token")
				const apiUrl = `${process.env.BACKEND_URL}api/validate`
				console.log(apiUrl,token)
				try {
					const res = await fetch(apiUrl, {
						method: "GET",
						headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
					})
					if (res.ok) {
						const data = await res.json()
						console.log(data)
						setStore({ logged: true })
						return true;
					} else {
						console.log("Request failed", res.status)
						return false
					}
				} catch (error) {
					console.error(error)
					return false;
				}

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
			}


		}
	};
};

export default getState;