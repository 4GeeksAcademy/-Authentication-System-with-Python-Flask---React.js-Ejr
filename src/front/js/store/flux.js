const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jobOffers: [],
			selectedJobOffer: null,
			token: null,
			user: null,
			proyectos: [],
			postulados: [],
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
						console.log('esto es la data', data);
						setStore({ jobOffers: data.ofertas });

						const { jobOffers, user } = getStore();
						const premiumOffers = jobOffers.filter(offer => offer.empleador_id === user?.id);

						console.log(premiumOffers);
						setStore({ premiumOffers });
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
			loadUserPostulaciones: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}

				try {
					// Hacer la solicitud al endpoint
					const response = await fetch(`${process.env.BACKEND_URL}/api/ofertas/${oferta_id}/postulados/detalles`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`, // Enviar el token de autenticación
						},
					});

					if (response.ok) {
						// Procesar la respuesta si la solicitud fue exitosa
						const postulados = await response.json();
						console.log('Postulados:', postulados);
						setStore({ postulados });
						return { postulados, type: "success" };
					} else {
						const errorData = await response.json();
						console.error('Error al obtener postulados:', errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					return { msg: "Error en la solicitud de postulados.", type: "error" };
				}
			},

			getNumeroPostulados: async (oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ofertas/${oferta_id}/postulados`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`
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
			changePostuladoStatus: async (oferta_id, user_id, estado) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/postulados/${user_id}/${oferta_id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ estado }),
					});

					if (response.ok) {
						const postulado = await response.json();
						return { postulado, type: "success" };
					} else {
						const errorData = await response.json();
						console.error('Error al cambiar el estado del postulado:', errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.error('Error en la solicitud de cambio de estado:', error);
					return { msg: "Error en la solicitud de cambio de estado.", type: "error" };
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
					console.log("esta es la data", data)
					return data;  // Asegúrate de que esta línea devuelva la respuesta correcta

				} catch (error) {
					console.error("Error en la solicitud de creación de calificación:", error);
					return;
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
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
						getActions().getFavorites(data.user.id)
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

			requestPasswordReset: async (email) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/requestpasswordreset`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        console.log("Correo de restablecimiento enviado", data);
                        return { success: true, message: data.message };
                    } else {
                        const errorData = await resp.json();
                        console.log("Error al solicitar restablecimiento:", errorData.message);
                        return { success: false, message: errorData.message };
                    }
                } catch (error) {
                    console.error("Error al solicitar restablecimiento de contraseña:", error);
                    return { success: false, message: "Error al conectarse con el servidor." };
                }
            },

            resetPassword: async (token, password) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/resetpassword`, {
                        method: 'POST',
                        headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password }),
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        console.log("Contraseña restablecida exitosamente", data);
                        return { success: true, message: data.message };
                    } else {
                        const errorData = await resp.json();
                        console.log("Error al restablecer contraseña:", errorData.message);
                        return { success: false, message: errorData.message };
                    }
                } catch (error) {
                    console.error("Error al restablecer contraseña:", error);
                    return { success: false, message: "Error al conectarse con el servidor." };
                }
            },
        }
    };
};
			
	


export default getState;