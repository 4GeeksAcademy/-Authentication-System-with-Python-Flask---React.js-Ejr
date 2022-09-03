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
				'email': '',
				'token': ''
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
			logout: () =>{
				sessionStorage.removeItem("token");
				console.log("Login Out")
				 setStore({token: null})

			},

			login:async (email,password)=>{

				const ops = {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({
					  email: email,
					  password: password,
					}),
				  };
			      try
				  {const resp = await fetch(
					'https://3001-marellanore-casinocorpo-gkyhs8gqlox.ws-us63.gitpod.io/api/login/user',
					ops
				  )
					
					  if (resp.status !== 200){
					  alert("There has been some error");
					  return false

					  }
					  const data = await resp.json()
					  console.log("This came from the backend", data);
					  sessionStorage.setItem("token", data.access_token);
					  setStore({token: data.access_token})
					  return true;
					}
					  catch(error){
						console.error("There has been an error login in")
					  }
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
			}
		}
	};
};

export default getState;
