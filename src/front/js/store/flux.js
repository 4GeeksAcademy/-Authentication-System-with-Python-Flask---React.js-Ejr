import { Await } from 'react-router-dom';
import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			meets: [],
			correo: [],
			clave: [],
			logged: false,
			psicologos: [],
			dataUser: null,
			imagenURL: "",
			especialidades: [],
			profesionalesPorEspecialidad: [],
		},
		actions: {
			editarPerfil: async (nombre, apellido, descripcion, telefono, codigoArea, fechaNacimiento) => {
				const store = getStore()
				console.log(nombre, apellido, descripcion, telefono, codigoArea, fechaNacimiento)
				if (store.dataUser) {
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							correo: store.dataUser.correo,
							nombre_usuario: nombre,
							apellido: apellido,
							descripcion: descripcion,
							telefono: telefono,
							codigoArea: codigoArea,
							fechaNacimiento: fechaNacimiento
						}),
					}
					try {
						const response = await fetch(process.env.BACKEND_URL + '/editar-perfil', options)
						console.log(response.status)
						if (response.ok) {
							const data = await response.json()
							console.log(response.status, data)

							setStore({dataUser: {
								...store.dataUser,
								 nombre_usuario: nombre ? nombre : store.dataUser.nombre_usuario,
								apellido: apellido ? apellido : store.dataUser.apellido,
								descripcion: descripcion ? descripcion : store.dataUser.descripcion,
								telefono: telefono ? telefono : store.dataUser.telefono,
								codigo_de_area: codigoArea ? codigoArea : store.dataUser.codigo_de_area
								}})
								
							if(store.dataUser.is_psicologo){
								console.log(store.psicologos)
								setStore({psicologos: store.psicologos.map((psicologo) => {
									if(psicologo.correo === store.dataUser.correo){
										return {...psicologo, descripcion: descripcion ? descripcion : store.dataUser.descripcion, nombre_usuario: nombre ? nombre : store.dataUser.nombre_usuario, apellido: apellido ? apellido : store.dataUser.apellido} 
									}else{
										return psicologo
									}
								})})
							}

							return true
						}
					} catch (error) {
						console.log('error al intentar editar la info del perfil', error)
					}
				}

			},
			getMeetsPsicologo: async (namePsicologo) => {

				// Token de autenticación para la API de Calendly. //INHABILITADO
				const tokenHablemosUy = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0NzkyMTY0LCJqdGkiOiI5ZDZkODRiZS1mMmE3LTQ1OGYtYjRlZS01MWE2ZGEwZWU5MWYiLCJ1c2VyX3V1aWQiOiJkMjc2ZjFlNy02M2RkLTQ0NDgtOTNhNi0zYjU5OThlZTRjN2EifQ.Eda1NgoxzOG4wnl7IhgNI2F_YqZJx38ia5P6HbzcSgZ6z20X6zLGXRLN2byLNdQafAIzy1AFoKGxiWfxgbT-yA';

				// URI para obtener los eventos programados de un usuario específico en Calendly.
				const uriHablemosUy = `https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/d276f1e7-63dd-4448-93a6-3b5998ee4c7a`;

				// Opciones para la solicitud fetch, incluyendo el token de autenticación.
				const options = {
					method: 'GET',
					headers: {
						'authorization': `Bearer ${tokenHablemosUy}`,
						'Content-Type': 'application/json',
						'Cookie': '__cf_bm=0Uu7hj4iKHMUuwnsYor9EgYgXGZuC5VQi8ph5YCvmpM-1724699373-1.0.1.1-ue.hdg4vvzzQQ3N6Id4jXeeSmhdqIYiNGV1HyYelSnOapsbqAkzhRO1QKvrVI4Soi7qcQH8BzCUGW3xt6UiNTQ; _cfuvid=DSODavyjq73MoDFVQNcuqNO6QkgbVrOeCc3MMM2eViw-1724683755231-0.0.1.1-604800000'
					}
				};

				try {
					// Realiza una solicitud a la API de Calendly para obtener los eventos programados.
					const response = await fetch(uriHablemosUy, options);
					const data = await response.json();

					// Filtra los eventos para obtener solo aquellos que coinciden con el nombre del psicólogo y que no estén cancelados.
					const events = data.collection.filter((event) => event.name === namePsicologo && event.status !== 'canceled');

					const dataMeetsPsicologos = []; // Array para almacenar los datos de los eventos con los pacientes.

					// Itera sobre cada evento filtrado.
					for (const element of events) {

						// Obtiene la parte de la URL después de '/scheduled_events/'.
						const url = element.uri;
						const uriEvent = url.split('/scheduled_events/')[1];
						
			
						// Define y ejecuta una función asincrónica inmediatamente para obtener los pacientes del evento.
						await (async () => {
							try {
								// Realiza una solicitud para obtener los detalles de los pacientes asociados al evento.
								const res = await fetch(`https://api.calendly.com/scheduled_events/${uriEvent}/invitees`, options);
								const inviteesData = await res.json();
							
								// Crea un nuevo objeto de evento que incluye el nombre del paciente y lo agrega al array.
								const meet = { ...element, name: inviteesData.collection[0].name };
								dataMeetsPsicologos.push(meet);
							} catch (error) {
								console.error('Error consiguiendo los pacientes:', error); // Maneja errores durante la solicitud de pacientes.
							}
						})();
					}

					// Actualiza el store con los datos de los eventos y pacientes obtenidos.
					setStore({ meets: dataMeetsPsicologos });

				} catch (error) {
					console.error('Error consiguiendo las meets de los psicologos:', error); // Maneja errores durante la solicitud de eventos.
				}
			},
			getMeetsUser: async (emailUser) => {
				// Token de autenticación para la API de Calendly.
				const tokenHablemosUy = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0NzkyMTY0LCJqdGkiOiI5ZDZkODRiZS1mMmE3LTQ1OGYtYjRlZS01MWE2ZGEwZWU5MWYiLCJ1c2VyX3V1aWQiOiJkMjc2ZjFlNy02M2RkLTQ0NDgtOTNhNi0zYjU5OThlZTRjN2EifQ.Eda1NgoxzOG4wnl7IhgNI2F_YqZJx38ia5P6HbzcSgZ6z20X6zLGXRLN2byLNdQafAIzy1AFoKGxiWfxgbT-yA';

				// URI para obtener los eventos programados en Calendly, filtrando por el email del usuario invitado.
				const uriHablemosUy = `https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/d276f1e7-63dd-4448-93a6-3b5998ee4c7a&invitee_email=${emailUser}`;

				// Opciones para la solicitud fetch, incluyendo el token de autenticación.
				const options = {
					method: 'GET',
					headers: {
						'authorization': `Bearer ${tokenHablemosUy}`,
						'Content-Type': 'application/json',
						'Cookie': '__cf_bm=0Uu7hj4iKHMUuwnsYor9EgYgXGZuC5VQi8ph5YCvmpM-1724699373-1.0.1.1-ue.hdg4vvzzQQ3N6Id4jXeeSmhdqIYiNGV1HyYelSnOapsbqAkzhRO1QKvrVI4Soi7qcQH8BzCUGW3xt6UiNTQ; _cfuvid=DSODavyjq73MoDFVQNcuqNO6QkgbVrOeCc3MMM2eViw-1724683755231-0.0.1.1-604800000'
					}
				};

				try {
					// Realiza una solicitud a la API de Calendly para obtener los eventos del usuario específico por su email.
					const response = await fetch(uriHablemosUy, options);
					const data = await response.json();

					// Actualiza el store con los datos de los eventos del usuario.
					setStore({ meets: data.collection });

				} catch (error) {
					console.error('Error consiguiendo las meets del usuario:', error); // Maneja errores durante la solicitud de eventos.
				}
			},

			solicitudProfesional: async (formData) => {
				const options = {
					method: 'POST',
					body: formData,
				}
				try {
					const response = await fetch(process.env.BACKEND_URL + '/solicitud-profesional', options)
					if(response.ok){
						return true
					}
				}
				catch (e) {
					console.log(e)
				}
			},
			//Obtengo el token de usuario para la sesión
			iniciarSesion: async (correo, clave) => {
				const actions = getActions();
			//	await actions.verificarToken();  // Verifica el token antes de proceder
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						correo: correo,
						clave: clave
					})
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/login', options);
					const data = await response.json();
					if (response.status === 200) {
						// Guardar el token en Local Storage y actualizar el estado global
						localStorage.setItem('token', data.access_token);
						localStorage.setItem('refresh_token', data.refresh_token); // Guarda el refresh token
						setStore({ dataUser: data.user });
						setStore({ logged: true });

						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 405) {
						throw new Error('Method Not Allowed: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.error('Error al iniciar sesión: ', error);
					//localStorage.removeItem('token');  // Elimina el token en caso de error
					//localStorage.removeItem('refresh_token');  // Elimina el refresh token en caso de error
					setStore({ logged: false }); // Asegura que el estado global se actualice
					return false;
				}
			},

			//Fetch con ruta protegida para datos del perfil de usuario
			getPerfilUsuario: async (id) => {
				let token = localStorage.getItem('token');
				const requestOptions = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
				// try {
					const response = await fetch(process.env.BACKEND_URL + '/perfil/usuario/'+id, requestOptions);
					const data = await response.json();
					console.log(data);
					console.log(response);
					
					

					if (response.ok) {
						


						return data;
					
					} else {
						throw new Error('Datos de usuario no disponibles o usuario no logueado.');
					}

				// } catch (error) {
					
				// 	return false;
				// }
			},

			//Validación de token para contexto global
			validToken: async () => {
				const token = localStorage.getItem('token');
				if (!token) {
					setStore({ logged: false });
					return false;
				}

				const options = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					}
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/valid-token', options);
					const data = await response.json();

					if (response.status === 200) {
						setStore({ logged: true });
						setStore({ dataUser: data.user });
						return true;
					}// else if (response.status === 404) {
					// 	setStore({ logged: false });
					// 	localStorage.removeItem('token'); // Limpia el token
					// 	return false;
					// } else {
					// 	setStore({ logged: false });
					// 	localStorage.removeItem('token');
					// 	console.error('Error:', data.msg || response.statusText);
					// 	return false;
					// }
					return false
				} catch (error) {
					setStore({ logged: false });
					localStorage.removeItem('token');
					return false;
				}
			},

			//Traemos psicologos de la base de datos
			getPsicologos: async () => {
				const store = getStore()


				try {
					const response = await fetch(process.env.BACKEND_URL + '/psicologos');
					const data = await response.json();
					if (response.status === 200) {
						// Actualiza solo la propiedad psicologos en el store
						setStore({
							...store,
							psicologos: data
						});
					}
				} catch (error) {
					console.error("Error fetching psicologos:", error);
				}
			},

			//Cierre de sesión
			cerrarSesion: () => {
				const store = getStore();
				// Eliminamos el token del Local Storage
				localStorage.removeItem('token');
				// Actualizar el estado global
				setStore({ currentUser: null });
				setStore({ logged: false });
			},

			//Función para refrescar el token
			refreshToken: async () => {
				const refresh_token = localStorage.getItem('refresh_token')
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${refresh_token}`,
					},
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/refresh-token', options);
					const data = await response.json();
					if (response.status === 200) {
						localStorage.setItem('token', data.access_token);
					} else {
						throw new Error('Error al refrescar el token');
					}
				} catch (error) {
					console.error('Error al refrescar el token: ', error);
					actions.logout(); // Si el refresh falla, cierra la sesión
				}
			},

			// Función para verificar cuando el token está a punto de expirar
			verificarToken: async () => {
				const token = localStorage.getItem('token');
				if (!token) return false;

				const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del JWT
				const expTime = tokenData.exp * 1000; // Tiempo de expiración en milisegundos
				const now = Date.now();

				if (expTime - now < 2 * 60 * 1000) { // Si faltan menos de 2 minutos
					await actions.refreshToken();
				}
			},

			// Manejo de recuperación de contraseña, token de recuperación y mail
			solicitarRecuperacion: async (correo) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ correo: correo })
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/reset_password', options);
					const data = await response.json();

					if (response.status === 200) {
						return { success: true, message: "Correo de recuperación enviado." };
					} else {
						return { success: false, message: data.msg || response.statusText };
					}
				} catch (error) {
					console.error('Error al solicitar recuperación de contraseña: ', error);
					return { success: false, message: 'Ocurrió un error al solicitar la recuperación de contraseña.' };
				}
			},

			//Enviamos la NUEVA contraseña usando el token de recuperación
			restablecerClave: async (token, clave) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ clave: clave })
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/reset_password/${token}`, options);
					const data = await response.json();

					if (response.status === 200) {
						return { success: true, message: "Contraseña actualizada con éxito." };
					} else {
						return { success: false, message: data.msg || response.statusText };
					}
				} catch (error) {
					console.error('Error al restablecer la contraseña: ', error);
					return { success: false, message: 'Ocurrió un error al restablecer la contraseña.' };
				}
			},

			//Verificamos el token recibido desde la URL del link de verificación del correo
			verifyToken: async (token) => {
				const options = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				};

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/verify_email/${token}`, options);
					const data = await response.json();

					if (response.status === 200) {
						return { success: true, message: "Token verificado con éxito." };
					} else {
						return { success: false, message: data.msg || response.statusText };
					}
				} catch (error) {
					console.error('Error al verificar el token: ', error);
					return { success: false, message: 'Ocurrió un error al verificar el token.' };
				}
			},

			/* Hasta ésta línea de código estará trabajando Pablo */
			register: async (nombre, apellido, fecha_de_nacimiento, codigo_de_area, telefono, foto, correo, clave) => {
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						nombre_usuario: nombre,
						apellido: apellido,
						fecha_de_nacimiento: fecha_de_nacimiento,
						codigo_de_area: codigo_de_area,
						telefono: telefono,
						foto: foto,
						correo: correo,
						clave: clave,
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/user', options);
					const data = await response.json();

					if (response.status === 201) {
						return { success: true, data };
					} else if (response.status === 400) {
						return { success: false, error: 'Bad Request: ' + data.msg };
					} else if (response.status === 500) {
						return { success: false, error: 'Internal Server Error: ' + data.msg };
					} else {
						return { success: false, error: data.msg || response.statusText };
					}
				} catch (error) {
					console.log('en el catch', error)
					Swal.fire({
						title: 'Error!',
						text: 'La dirección de correo electrónico ya existe',
						icon: 'error',
						confirmButtonText: 'Cool'
					});
					return false;
				}
			},

			//cloudinary (IMAGENES)
			uploadImage: async (data, cloud_name) => {
				const actions = getActions()
				const inputFile = new FormData()
				inputFile.append("file", data)

				inputFile.append('upload_preset', 'hablemosuy');

				const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
					method: 'POST',
					body: inputFile
				});

				const fileData = await response.json();
				if (fileData.secure_url) {
					const result = await actions.saveProfileImg(fileData.secure_url)
					if (result) {
						return result
					}
					return false
				}
			},
			saveProfileImg: async (url) => {

				const store = getStore()
				const updateResponse = await fetch(process.env.BACKEND_URL + `/usuario/foto`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ foto: url, correo: store.dataUser.correo })
				});

				if (!updateResponse.ok) {
					throw new Error('Error al actualizar la foto de perfil en la base de datos');
				}
				setStore({ dataUser: { ...store.dataUser, foto: url } })
				return url
			},
			fetchEspecialidades: async () => {

				let token = localStorage.getItem("token")

				try {
					const response = await fetch(process.env.BACKEND_URL + `/especialidades`, {
						headers: {
							'Authorization': `Bearer ${token}`,  // Envía el token JWT en el encabezado
						},
					});
					const data = await response.json();
					if (response.ok) {

						setStore({ especialidades: data });
					} else {
						console.error('Error al cargar las especialidades', response.statusText);
					}

				} catch (error) {
					console.error('Error:', error);
				}
			},
			saveEspecialidad : async (id) => {
				let token = localStorage.getItem("token")
				const store=getStore()
				const actions=getActions()
				
				
				// for (let index = 0; index < especialidadesSeleccionadas.length; index++) {
				// 	if (store.profesionalesPorEspecialidad.some(item=>item.id == especialidadesSeleccionadas[index])) {
				// 		especialidadesSeleccionadas.splice(index,1)
				// 	}
					
				// }
				try {
					const response = await fetch(process.env.BACKEND_URL + '/save-especialidad', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify({
							
							especialidad_id: id, // Lista de nombres de especialidades
						}),
					});

					if (response.ok) {
						 const data = await response.json();
						actions.getPsicologos()
						return data
						//await actions.obtenerEspecialidadesPorProfesional(); // Recargar las especialidades después de guardar
					} else {
						const errorData = await response.json();
						console.error('Error al guardar especialidades:', errorData);
					}
				} catch (error) {
					console.error('Error:', error);
				}
			},

			obtenerEspecialidadesPorProfesional: async () => {
				const token = localStorage.getItem("token");
				const url = `${process.env.BACKEND_URL}/especialidades-por-profesional`;

				try {
					const response = await fetch(url, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					});

                    if (response.ok) {
                        const data = await response.json();
                       
                        // Guardar los datos obtenidos en el store
                        setStore({ profesionalesPorEspecialidad: data });
                    } else {
                        const errorData = await response.json();
                        console.error('Error al obtener especialidades:', errorData);
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud:', error);
                }
            },
			eliminarEspecialidadPorProfesional: async (especialidadId) => {
				const store=getStore()
				const token = localStorage.getItem("token");
				const url = `${process.env.BACKEND_URL}/especialidades-por-profesional?especialidad_id=${especialidadId}`;
				const actions=getActions()
								
				try {
					const response = await fetch(url, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					});

					if (response.ok) {
						const data = await response.json();
						actions.getPsicologos()
						// Opcional: Actualizar el estado de especialidades después de la eliminación
						// setStore({
						// 	...store,
						// 	profesionalesPorEspecialidad: store.profesionalesPorEspecialidad.filter(
						// 		especialidad => especialidad.id !== especialidadId
						// 	)
						// });
						return true
					} else {
						const errorData = await response.json();
						console.error('Error al eliminar la especialidad:', errorData);
					}
				} catch (error) {
					console.error('Error al realizar la solicitud de eliminación:', error.message || error);
				}
			},
		}
	};
}

export default getState;
