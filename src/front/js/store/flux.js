const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: {}
		},
		actions: {
			logIn: (email, password) => {
				console.log(email, password);
				fetch(BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify({
						"email": email,
						"password": password
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(response => {
						console.log(response);
						return response.json();
					})
					// .then(data => console.log(data)) guardar en localStore
					.catch(error => console.log(error));
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
		}
	};
};

export default getState;
