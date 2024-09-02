const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jobOffers: [],
			selectedJobOffer: null,
			token: null,
			user: null,
			proyectos: [],
			userPostulaciones: [],
			ratings: [],
			favorites: [],
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

			applyToJobOffer: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: registrate o inicia sesión", type: 'error' }
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/postulados`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({ oferta_id })
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log('inscripcion exitosa', data);
						return { msg: "Inscripcion realizada con exito.", type: "success" };
					} else {
						const errorData = await resp.json();
						console.log("Error al inscribirse: ", errorData.msg);
						return { msg: errorData.msg, type: 'warning' };

					}
				} catch (error) {
					console.log("Error en la solitud de inscripcion.");
					return { msg: "Error en la solicitud de inscripcion.", type: "error" }

				}
			},

			unapplyFromJobOffer: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/postulados/${oferta_id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log('Desinscripción exitosa', data);
						return { msg: "Desinscripción realizada con éxito.", type: "success" };
					} else {
						const errorData = await resp.json();
						console.log("Error al desinscribirse: ", errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.log("Error en la solicitud de desinscripción.");
					return { msg: "Error en la solicitud de desinscripción.", type: "error" };
				}
			},
			loadUserPostulaciones: async () => {
				const store = getStore();
				const token = store.token;
				if (!token) return;

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/postulados`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ userPostulaciones: data.postulados });
						console.log('Postulaciones del usuario cargadas:', data.postulados);
					} else {
						const errorData = await response.json();
						console.error('Error al cargar las postulaciones:', errorData.msg);
					}
				} catch (error) {
					console.error('Error al obtener postulaciones:', error);
				}
			},


			getNumeroPostulados: async (oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ofertas/${oferta_id}/postulados`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${getStore().token}`
						},
					});
					if (response.ok) {
						const data = await response.json();
						return data.numero_postulados;
					} else {
						const errorData = await response.json();
						console.error('Error al obtener número de postulaciones:', errorData.msg);
						return null;
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					return null;
				}
			},
			createRating: async (ratingData) => {
				try {
					const token = localStorage.getItem('token');
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify(ratingData),
					});
					console.log(ratingData)
					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}
			
					const data = await response.json();
					console.log("esta es la data",data)
					return data;  // Asegúrate de que esta línea devuelva la respuesta correcta
			
				} catch (error) {
					console.error("Error en la solicitud de creación de calificación:", error);
					return undefined;  // O maneja el error de otra manera
				}
			},

			updateRating: async (id, value) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({ value })
					});

					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}

					const data = await response.json();

					if (data.success) {
						console.log("Calificación actualizada:", data.rating);
						const store = getStore();
						setStore({
							ratings: store.ratings.map(rating =>
								rating.id === id ? data.rating : rating
							)
						});
					} else {
						console.error("Error al actualizar calificación:", data.msg);
					}
				} catch (error) {
					console.error("Error en la solicitud de actualización de calificación:", error);
				}
			},

			deleteRating: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						}
					});

					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}

					const data = await response.json();

					if (data.success) {
						console.log("Calificación eliminada exitosamente");
						const store = getStore();
						setStore({
							ratings: store.ratings.filter(rating => rating.id !== id)
						});
					} else {
						console.error("Error al eliminar calificación:", data.msg);
					}
				} catch (error) {
					console.error("Error en la solicitud de eliminación de calificación:", error);
				}
			},

		
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });

					return data;
				} catch (error) {
					console.log("Error cargando mensaje desde el backend", error);
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
					});
					const data = await resp.json();
					setStore(data);
					localStorage.setItem('token', data.token);
					return data;

				} catch (error) {
					console.log('Error:', error);
				}
			},

			resetStore: () => {
				setStore({ msg: "", success: "" });
			},

			logOut: () => {
				localStorage.removeItem("token");
				setStore({ msg: "", token: "", success: "", user: "", empleador: "", programador: "" });
				return true;
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
					});
					const data = await resp.json();
					setStore(data);
					localStorage.setItem('token', data.token);
					return data;

				} catch (error) {
					console.log('Error:', error);
				}
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
						console.log(data)
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
						{ proyectos: [...getStore().proyectos, data.proyectos] })
					return data

				} catch (error) {
					console.log('Error:', error);
				}
			},
			paymentCompany: (paymentMethod) => {
				const token = localStorage.getItem('token');
				let promise = fetch(process.env.BACKEND_URL + '/api/create-payment', {
					method: 'POST',
					body: JSON.stringify({ payment_method: paymentMethod.id }),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}).then((response) =>
					response.json()
				).then((data) => {
					setStore({ user: data.user, suscripcion: data })
				}).catch((error) => {
					console.log('[error]', error)
				});
			},

			resetPassword: async (token, password1, password2) => {
				if (!password1 || !password2) {
					console.log("Faltan campos");
					return false;
				}

				if (password1.trim() !== password2.trim()) {
					console.log("Las contraseñas no coinciden");
					return false;
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/reset-password`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							password: password1,
						}),
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log("Contraseña cambiada exitosamente", data);
						return true;
					} else {
						const errorData = await resp.json();
						console.log("Error al cambiar contraseña:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error al cambiar contraseña:", error);
					return false;
				}
			},

			addFavorite: async (programador_id, empleador_id, oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favoritos`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							programador_id: programador_id,
							empleador_id: empleador_id,
							oferta_id: oferta_id,
						}),
					});

					if (!response.ok) {
						throw new Error('Error al agregar favorito');
					}

					const data = await response.json();
					setStore({ favorites:[...getStore().favorites, data]});
					return data;

				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},

			removeFavorite: async (programador_id, empleador_id, oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favoritos?programador_id=${programador_id}&empleador_id=${empleador_id}&oferta_id=${oferta_id}`, {
						method: 'DELETE',
					});

					if (!response.ok) {
						throw new Error('Error al eliminar favorito');
					}

					return { success: true, programador_id, empleador_id, oferta_id };

				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},

			getFavorites: async () => {
				const store = getStore();
				const user_id = store.user.id;
				console.log(user_id)
				if (!user_id) {
					console.error('No se pudo obtener el ID del usuario');
					return;
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/favoritos`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ favorites: data }); // Asegúrate de que el 'data' ya es la lista de favoritos
					} else {
						console.error('Error al obtener los favoritos');
					}
				} catch (error) {
					console.error('Error en la solicitud de favoritos:', error);
				}
			},
		}
	};
};

export default getState;