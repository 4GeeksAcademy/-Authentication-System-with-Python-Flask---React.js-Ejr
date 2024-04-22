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
			tokenOK: false,
			navigate: false,
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
			// Iniciar sesion
			// {
			// 	"email": "messi@miami.com",
			// 	"password": "leo"
			// }
			// Registrarse
			// {
			// 	"email": "messi@miami.com",
			// 	"password": "leo",
			// 	"is_active": true
			// }
			registrarUsuario: async function (email, contraseña) {
				console.log(email, contraseña);
				try{
					const response = await fetch(`https://orange-cod-4jjwqw7xr657hqpw9-3001.app.github.dev/api/user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": contraseña,
							"is_active": true,
						})
					})
					const data = await response.json()
					console.log(data);
					console.log(response.status);
					localStorage.setItem("token",data.token)
					if (response.status == 200){
						setStore({tokenOK : true})
						setStore({navigate : true})
					}
					return true
				} catch (error) {
					console.error(err)

				}
				// fetch(`https://fantastic-space-zebra-v6r7vrg469pfxx9q-3001.app.github.dev/api/user`, {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify({
				// 		"email": email,
				// 		"password": contraseña,
				// 		"is_active": true,
				// 	})
				// })
				// 	.then(res =>{ 
				// 		res.json()
				// 		if (res.status == 200){
				// 			setStore({tokenOK : true})
				// 		}
				// 	})
				// 	.then(data => {
				// 		console.log(data);
				// 		localStorage.setItem("token",data.token)
				// 	})
				// 	.catch(err => console.error(err))
			},







			loginUsuario: async function (email, contraseña) {
				console.log(email, contraseña);
				try{
					const response = await fetch(`https://orange-cod-4jjwqw7xr657hqpw9-3001.app.github.dev/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": email,
							"password": contraseña,
						})
					})
					const data = await response.json()
					console.log(data);
					console.log(response.status);
					localStorage.setItem("token",data.token)
					if (response.status == 200){
						setStore({tokenOK : true})
						setStore({navigate : true})
					}
					return true
				} catch (error) {
					console.error(err)

				}
			},
			tokenOK: function(){
				if (localStorage.getItem("token")!= null) {
					setStore({tokenOK : true})
				}
			}
		}
	};
};

export default getState;
