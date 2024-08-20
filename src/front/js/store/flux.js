const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			itineraryData: [
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				},
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				},
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				},
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				},
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				},
				{
					title: 'Título de itinerario',
					img: 'https://www.spain.info/.content/imagenes/cabeceras-grandes/andalucia/vistas-cordoba-s158982617.jpg',
					desc: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) hacer un libro de textos especimen.',
					score: '4/5'
				}
			],
			token: '',
		},
			actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/register',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body: JSON.stringify(formData)
					});
					const data = await resp.json();

					if (!resp.ok) {
						const errorMsg = data.msg
						throw new Error(errorMsg);
					}
					setStore({token: data.access_token});
					localStorage.setItem('token', data.access_token)
					return { success: true }
				} catch (error) {
					console.error('Error creating user:', error.message);
       				return { success: false, msg: error.message };
				}
			},
			login: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/login',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body: JSON.stringify(formData)
					});
					const data = await resp.json();

					if (!resp.ok) {
						const errorMsg = data.msg
						throw  new Error(errorMsg);
					}
					setStore({token: data.access_token});
					localStorage.setItem('token', data.access_token)
					return { success: true }
				} catch (error) {
					console.error('Error login user:', error.message);
       				return { success: false, msg: error.message };
				}
			}
		}
	};
};

export default getState;