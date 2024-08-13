import Swal from 'sweetalert2'
import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			correo: [],
			clave: [],
			logged: false,
			psicologos: []
		},
		actions: {

			//Obtengo el token de usuario para la sesión
			iniciarSesion: async (correo, clave) => {
				const store = getStore();
				localStorage.setItem('token', null);
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
					const response = await fetch('https://sturdy-space-barnacle-97xvxj7jqw5hpw6v-3001.app.github.dev/api/login', options);
					const data = await response.json();

					if (response.status === 200) {
						localStorage.setItem('token', data.access_token);
						console.log(localStorage.getItem('token'));
						setStore({ currentUser: { correo: correo } });
						setStore({ logged: true });
						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + data.msg);
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + data.msg);
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.log('Fetch error: ', error);
					Swal.fire({
						title: 'Error!',
						text: 'Correo o contraseña incorrectos.',
						icon: 'error',
						confirmButtonText: 'Cool'
					})
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
					const response = await fetch("https://sturdy-space-barnacle-97xvxj7jqw5hpw6v-3001.app.github.dev/api/perfil/usuario", requestOptions);
					const data = await response.json();

					if (!token) {
						Swal.fire({
							title: 'Error!',
							text: 'Token no encontrado. Por favor, inicia sesión nuevamente.',
							icon: 'error',
							confirmButtonText: 'Entendido'
						});
						return false;
					}
					// Comprueba el token si es proporcionado					
					if (data.logged) {
						console.log(localStorage.getItem('token'));
						return true;
					} else if (response.status === 400) {
						throw new Error('Bad Request: ' + (data.msg || 'Solicitud incorrecta'));
					} else if (response.status === 500) {
						throw new Error('Internal Server Error: ' + (data.msg || 'Error en el servidor'));
					} else {
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					Swal.fire({
						title: 'Error!',
						text: error.message || 'Token inválido o inexistente',
						icon: 'error',
						confirmButtonText: 'Entendido'
					});
					return false;
				}
			},

			//Validación de token para contexto global
			validToken: async () => {
				const store = getStore();
				const token = localStorage.getItem('token');
				const options = {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					}
				};
				try {
					const response = await fetch('https://sturdy-space-barnacle-97xvxj7jqw5hpw6v-3001.app.github.dev/api/valid-token', options);
					const data = await response.json();

					if (response.status === 200) {
						console.log('Token válido, usuario logeado');
						setStore({ logged: true });
						return true;
					} else if (response.status === 404) {
						setStore({ logged: false });
						console.log('Token no válido, usuario no logeado');
						throw new Error('Bad Request: ' + data.msg);
					} else {
						setStore({ logged: false });
						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					setStore({ logged: false });
					console.log('Fetch error: ', error);
					console.log('Token no válido, usuario no logeado');

					return false;
				}
			},

			//Traemos psicologos de la base de datos
			getPsicologos: async () => {
				const store = getStore()
				
				try {
                    const response = await fetch('https://expert-succotash-5gq475r9p4pw34x4v-3001.app.github.dev/api/psicologos');
                    const data = await response.json();
            
                    if (response.status === 200) {
                        console.log(data);
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

				console.log('antes del fetch register');
				try {
					const response = await fetch('https://animated-garbanzo-x75jg5677x63p57j-3001.app.github.dev/api/user', options);
					const data = await response.json();

					if (response.status === 200) {
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
						console.log(response);

						throw new Error(data.msg || response.statusText);
					}
				} catch (error) {
					console.log('Fetch error: ', error);
					Swal.fire({
						title: 'Error!',
						text: 'La dirección de correo electrónico ya existe',
						icon: 'error',
						confirmButtonText: 'Cool'
					});
					return false;


				}
			},
		}
	};
}

export default getState;
