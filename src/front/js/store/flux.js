const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: null,
			user: null
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
			signUp: async (form, navigate) => {
				const url = "https://animated-engine-r4gjrv4vwwjpcxrrq-3001.app.github.dev/api/signup";
				await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin":"*",
						"Access-Control-Allow-Methods":"*"
					},
					body: JSON.stringify({						
						"email": form.email,
                      	"password": form.password,
						"is_active": true
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok) {
						alert("user already exists");
						console.log(resp.status);
						return false;
						
					}
					await resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					navigate('/login');														
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			login: (form, navigate) => {
				const store = getStore();
				const url = "https://animated-engine-r4gjrv4vwwjpcxrrq-3001.app.github.dev/api/login";
				fetch(url, {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
						'Access-Control-Allow-Origin':'*'
					},
					body: JSON.stringify({						
						"email": form.email,
                      	"password": form.password
					})					
				})
				.then(async resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						alert("wrong username or password");
						return false;						
					}
					//console.log(resp.text()); // will try return the exact result as string
					const data = await resp.json();
					sessionStorage.setItem("token", data.token);
					setStore({token: data.token});
					
					console.log(store.token);
					navigate('/private');
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			authenticateUser: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = "https://animated-engine-r4gjrv4vwwjpcxrrq-3001.app.github.dev/api/private"
				fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + store.token,
						'Access-Control-Allow-Origin':'*'
					}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if(!resp.ok){
						navigate("/login");
						alert("Please login to continue");
												
					}
					
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json();
				})
				.then(data => {
					setStore({user: data});
					
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			tokenFromStore: () => {
				let store = getStore();
				const token = sessionStorage.getItem("token");
				if (token && token!= null && token!=undefined) setStore({token: token});
			},
			logout: (navigate) => {			
				setStore({user:null});
				sessionStorage.removeItem("token");
				setStore({token: null});
				navigate("/");
			}
		}
	};
};

export default getState;