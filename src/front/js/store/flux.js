const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
						user: {
				'nombre': '',
				'apellido': '',
				'telefono': '',
				'direccion': '',
				'email': ''
			},
			empresa: {
				'nombre': '',
				'telefono': '',
				'direccion': '',
				'email': ''
			},
			casino: {
				'nombre': '',
				'telefono': '',
				'direccion': '',
				'email': ''
			},
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

			syncTokenFromSessionStore: () =>{
				const token  = sessionStorage.getItem("token");
				console.log("Application loaded")
				if (token && token !="" && token !=undefined) setStore({token: token})

			},
			register: async (nombre, apellido, telefono, direccion, email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'nombre': nombre,
						'apellido': apellido,
						'telefono': telefono,
						'direccion': direccion,
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/register', opts)
					.then(response => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			registroEmpresa: async (nombre, telefono, direccion, email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'nombre': nombre,
						'telefono': telefono,
						'direccion': direccion,
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/registro', opts)
					.then(response => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			registroCasino: async (nombre, telefono, direccion, email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'nombre': nombre,
						'telefono': telefono,
						'direccion': direccion,
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/registro-casino', opts)
					.then(response => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/login/user', opts)
					.then(response => response.json())
					.then((data) => {
						console.log("This came from the backend", data);
						sessionStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})
						return true

					})
					.catch((error) => {
						console.error(error);
					})
			},
			loginEmpresa: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/login/empresa', opts)
					.then(response => response.json())
					.then((data) => {
						console.log("This came from the backend", data);
						sessionStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})
						return true

					})
					.catch((error) => {
						console.error(error);
					})
			},
			loginCasino: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/login/casino', opts)
					.then(response => response.json())
					.then((data) => {
						console.log("This came from the backend", data);
						sessionStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})
						return true

					})
					.catch((error) => {
						console.error(error);
					})
			},
			logout: () =>{
				sessionStorage.removeItem("token");
				console.log("Login Out")
				 setStore({token: null})
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


//reporteproblema

reporteProblema: async (contenido,userid) => {
	const opts = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'usuario_id':userid,
			'contenido':contenido,
		

		})
	};
	await fetch("https://3001-marellanore-casinocorpo-hp46zzc1nqx.ws-us63.gitpod.io/api/problema-usuario", opts)
		.then(response => response.json())
		.then((data) => {
			console.log("This came from the backend", data);
			sessionStorage.setItem("token", data.access_token);
			setStore({token: data.access_token})
			return true

		})
		.catch((error) => {
			console.error(error);
		})
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
			}
		}
	};
};

export default getState;
