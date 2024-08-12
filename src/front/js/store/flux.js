import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			email: [],
			password: [],
			psicologos: []
		},
		actions: {
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
};

export default getState;
