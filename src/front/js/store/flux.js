const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			token: null,
			user: null,
      favorites: [],
		},
		actions: {
      addFavorites: (fav) => {
        setStore({ favorites: [...getStore().favorites, fav] });
      },
      removeFavorites: (fav) => {
        setStore({
          favorites: [...getStore().favorites.filter((item) => item !== fav)],
        });
      },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
        
			},
			// start of user related fetch request
			signUp: async (form, navigate) => {
				const url = `${process.env.REACT_APP_BACKEND_URL}/api/signup`;
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
					sessionStorage.setItem("token", data.token);
					setStore({token: data.token});
					navigate('/private')
					
					console.log(store.token);
				})				
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			authenticateUser: (navigate) => {
				const store = getStore();
				console.log(store.token);
				const url = process.env.BACKEND_URL + "/api/private"
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
			},
			
			// end of user related fetch request
		}
	};
};

export default getState;