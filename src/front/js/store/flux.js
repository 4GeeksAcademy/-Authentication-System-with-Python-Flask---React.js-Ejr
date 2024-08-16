import Swal from 'sweetalert2'
import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			correo: [],
			clave: [],
			logged: false,
			psicologos: [],
			dataUser: null,
			imagenURL:""
		},
		actions: {

			//Obtengo el token de usuario para la sesión
			iniciarSesion: async (correo, clave) => {
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
						setStore({ currentUser: { correo: correo } });
						setStore({ logged: true });
						// Configuramos el temporizador para renovar el token
						setTimeout(() => getActions.refreshToken(), (data.expires_in - 60) * 1000); // Se renueva un minuto antes de expirar

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
					localStorage.removeItem('token');  // Elimina el token en caso de error
					localStorage.removeItem('refresh_token');  // Elimina el refresh token en caso de error
					setStore({ logged: false }); // Asegura que el estado global se actualice
					return false;
				}
			},

			//Fetch con ruta protegida para datos del perfil de usuario
			getPerfilUsuario: async () => {
				let token = localStorage.getItem('token');
				const requestOptions = {
					method: "GET",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + '/perfil/usuario', requestOptions);
					const data = await response.json();
					if (!token) {
						console.error('Token no encontrado. Redirigiendo al inicio de sesión.'), 400;
						return false;
					}


					// Si los datos son válidos y el usuario está logueado
					if (data.logged) {
						setStore({
							dataUser: {
								nombre_usuario: data.nombre_usuario || "Nombre no disponible",
								correo: data.correo || "Correo no disponible",
								foto: data.foto || "https://example.com/default-image.jpg",
								telefono: data.telefono || "Teléfono no disponible",
								descripcion: data.descripcion || "descripcion no disponible"
							}
						});
						return true;
					} else {
						throw new Error('Datos de usuario no disponibles o usuario no logueado.');
					}

				} catch (error) {
					Swal.fire({
						title: 'No puede acceder a ésta sección!',
						text: 'Token inválido o inexistente',
						icon: 'warning',
						confirmButtonText: 'Entendido'
					});
					return false;
				}
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
						return true;
					} else if (response.status === 404) {
						setStore({ logged: false });
						console.log('Token inválido, usuario no logeado');
						localStorage.removeItem('token'); // Limpia el token
						return false;
					} else {
						setStore({ logged: false });
						localStorage.removeItem('token');
						console.error('Error:', data.msg || response.statusText);
						return false;
					}
				} catch (error) {
					setStore({ logged: false });
					localStorage.removeItem('token');
					console.log('Token inválido, usuario no logeado');
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

			/* Cierre de sesión */
			cerrarSesion: () => {
				const store = getStore();
				// Eliminamos el token del Local Storage
				localStorage.removeItem('token');
				// Actualizar el estado global
				setStore({ currentUser: null });
				setStore({ logged: false });
			},

			/* Función para refrescar el token */
			refreshToken: async () => {
				const refresh_token = localStorage.getItem('refresh_token');
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ refresh_token })
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/refresh-token', options);
					const data = await response.json();

					if (response.status === 200) {
						localStorage.setItem('token', data.access_token);
						setTimeout(() => getActions.refreshToken(), (data.expires_in - 60) * 1000); // Renueva un minuto antes de expirar
					} else {
						throw new Error('Error al refrescar el token');
					}
				} catch (error) {
					console.error('Error al refrescar el token: ', error);
					actions.logout(); // Si el refresh falla, cierra la sesión
				}
			},

			/* Hasta ésta línea de código estará trabajando Pablo */
			register: async (nombre, apellido, fecha_de_nacimiento, codigo_de_area, telefono, correo, clave) => {
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
						correo: correo,
						clave: clave,
					})
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + '/user', options);
					const data = await response.json();

					if (response.status === 201) {
						console.log(data);
						Swal.fire({
							text: "El registro del usuario se ha realizado con éxito.",
							icon: "success"
						});
						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {

						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
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
			uploadImage: async (data,cloud_name,preset_name) => {
				console.log(data);
				
			
			//	setLoading(true);
			
				try {
					const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
						method: 'POST',
						body: data
					});
			
					const fileData = await response.json();
					//setProfileImage(fileData.secure_url);  // Actualiza el estado profileImage con la URL de la imagen subida.
					//setLoading(false);
					//console.log(fileData.secure_url);
					setStore({imagenURL:fileData.secure_url})
					
				} catch (error) {
					console.error('Error uploading image:', error);
				//	setLoading(false);
				}
			},
		}
	};
}

export default getState;
