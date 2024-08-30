const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jobOffers: [],
			selectedJobOffer: null,
			token: null,
			user: null,
			proyectos: []
		},
		actions: {
			loadAllJobOffers: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/ofertas`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ jobOffers: data.ofertas });
					} else {
						console.error("Error al cargar ofertas");
					}
				} catch (error) {
					console.error("Error en la solicitud de ofertas:", error);
				}
			},

			loadJobOfferById: async (id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/oferta/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ selectedJobOffer: data.oferta });
					} else {
						console.error("Error al cargar la oferta");
					}
				} catch (error) {
					console.error("Error en la solicitud de oferta:", error);
				}
			},
			createJobOffer: async (offerData) => {
				console.log(offerData);

				try {
					const token = localStorage.getItem('token');
					const resp = await fetch(`${process.env.BACKEND_URL}/api/crearOferta`, {
						method: 'POST',
						headers: {
							"Content-Type": 'application/json',
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify(offerData)
					});

					if (resp.ok) {
						const data = await resp.json();
						const store = getStore();
						setStore({ jobOffers: [...store.jobOffers, data.oferta] });
						return data;
					} else {
						const errorData = await resp.json();
						console.error("Error al crear la oferta:", errorData.msg);
						return errorData;
					}
				} catch (error) {
					console.error("Error al conectarse con el backend:", error);
				}
			},

			applyToJobOffer: async (oferta_id) =>{
				const store = getStore();
				const token = store.token;

				if(!token){
					return {msg: "Usuario no autenticado: registrate o inicia sesión", type: 'error'}
				}

				try{
					const resp = await fetch(`${process.env.BACKEND_URL}/api/postulados`, {
						method: 'POST',
						headers:{
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({oferta_id})
					});

					if(resp.ok){
						const data = await resp.json();
						console.log('inscripcion exitosa', data);
						return {msg: "Inscripcion realizada con exito.", type: "success"};
					} else {
						const errorData = await resp.json();
						console.log("Error al inscribirse: ", errorData.msg);
						return  {msg: errorData.msg, type: 'warning'};
						
					}
				} catch (error){
					console.log("Error en la solitud de inscripcion.");
					return {msg: "Error en la solicitud de inscripcion.", type: "error"}
					
				}
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/register", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData),
					})
					const data = await resp.json()
					setStore(data)
					localStorage.setItem('token', data.token)
					return data

				} catch (error) {
					console.log('error:' + error)
				}
			},
			resetStore: () => {
				setStore({ msg: "", success: "" })
			},
			logOut: () => {
				localStorage.removeItem("token")
				setStore({ msg: "", token: "", success: "", user: "", empleador: "", programador: "" })
				return true
			},
			editUser: async (formData, texto, token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/user/edit${texto}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(formData),
					})
					const data = await resp.json()
					setStore(data)
					localStorage.setItem('token', data.token)
					return data

				} catch (error) {
					console.log('error:' + error)
				}
			},
			logOut: () => {
				localStorage.removeItem("token")
				setStore({ msg: "", token: "", success: "", user: "", empleador: "", programador: "" })
				return true
			},
			login: async (credentials) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(credentials)
					});

					if (resp.ok) {
						const data = await resp.json();
						localStorage.setItem('token', data.token);
						setStore({ token: data.token, user: data.user });
						return data;
					} else {

						return false;
					}
				} catch (error) {
					console.error("Error al conectarse con el backend:", error);
				}
			},

			loadUserFromToken: () => {
				const token = localStorage.getItem('token');
				if (token) {
					setStore({ token: token });
				}
			},
			addProjects: async (formData, token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user/programador/addProjects", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(formData),
					})
					const data = await resp.json()
					setStore(
						{proyectos: [...getStore().proyectos, data.proyectos]})
					return data

				} catch (error) {
					console.log('error:' + error)
				}
			}

		}
	};
};

export default getState;
