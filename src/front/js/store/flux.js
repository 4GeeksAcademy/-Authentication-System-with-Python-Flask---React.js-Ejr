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
			]
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
			SignUp: (email, password) => {
				fetch('https://sturdy-space-barnacle-7vv77gvq456ghxjwv-3001.app.github.dev/api/crear_usuario', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: email, password: password }),
				})
				.then(response => {
					if (response.ok) {
						navigate('/iniciar_sesion');
					} else {
						throw new Error('Sign up error');
					}
				})
				.catch(error => {
					console.error('Error during registration:', error);
				});
			},
			LogIn: (email, password) => {
				fetch('https://sturdy-space-barnacle-7vv77gvq456ghxjwv-3001.app.github.dev/api/iniciar_sesion', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: email, password: password }),
				})
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error('Login error');
					}
				})
				.then(data => {
					sessionStorage.setItem('token', data.token);
					// window.location.href = '/private';
					console.log(data.token)
				})
				.catch(error => {
					console.error('Error en el inicio de sesion', error);
				});
			},
			ValidateToken: () => {
				const token = sessionStorage.getItem("token")

				fetch('https://sturdy-space-barnacle-7vv77gvq456ghxjwv-3001.app.github.dev/api/protected', {
					method: 'GET',
					headers: { 'Autorization': 'Bearer' + token }
				})
				.then(response => {
					if (!(response.ok)) {
						return false
					} else {
						return true
					}
				})				
				.catch(error => {
					console.error('Error en el inicio de sesion', error);
				});
			},
			LogOut: () => {
                sessionStorage.removeItem("token"); // Elimina el token de sesión
                // Redirige al usuario a la página de inicio de sesión
                window.location.href = '/';
            }
		}
	};
};

export default getState;
