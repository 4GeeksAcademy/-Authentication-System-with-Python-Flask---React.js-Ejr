const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: sessionStorage.getItem('token'),
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// start of user related fetch request
			signUp: async (form, navigate) => {
				const url = `${process.env.BACKEND_URL}/api/signup`;
				try {
					const response = await fetch(url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(form)
					});
					if (!response.ok) {
						throw new Error('User already exists or other error');
					}
					const data = await response.json();
					navigate('/login');
				} catch (error) {
					console.error("Signup error:", error);
				}
			},
			login: (form, navigate) => {
				const store = getStore();
				const url = process.env.BACKEND_URL + "/api/login";
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
					sessionStorage.setItem("token", data.access_token);
					setStore({user: data.user});

					
					
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			authenticateUser: async (navigate) => {
				console.log(sessionStorage.getItem('token'))
				const store = getStore();
				const url = process.env.BACKEND_URL + "/api/private"
				let response = await fetch(url, {
					method: "GET",
					headers: {
						"Authorization": "Bearer " + sessionStorage.getItem('token'),
						'Access-Control-Allow-Origin':'*'
					}
				})
				let data = response.json()
				setStore({user: data.user});
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
			},
			
			// end of user related fetch request
		}
	};
};

export default getState;