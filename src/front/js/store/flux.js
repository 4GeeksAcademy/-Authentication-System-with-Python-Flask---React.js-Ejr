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

			
			users: [],
            token: ""
		},
		actions: {
			login: async (email, password) => {
				const store = getStore();
				const opts = {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				  },
				  body: JSON.stringify({
					email: email,
					password: password
				  })
				};
			  
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}api/login`, opts);
				  const data = await resp.json();
				  localStorage.setItem("token", data.token);
				  setStore({ "token": data.token });
				  console.log(data);
				} catch (error) {
				  console.error(error);
				}
			  },



			//   login: async (email, password) => {
            //     const store = getStore()
            //     const opts = {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "Application/json",
            //             Authorization: Bearer ${store.token}
            //         },
            //         body: JSON.stringify({
            //             email: email,
            //             password: password
            //         })
            //     }
            //     const resp = await fetch(process.env.BACKEND_URL+"api/login", opts)
            //     const data = await resp.json()
            //     localStorage.setItem("token", data.token)
            //     setStore({"token": data.token})
            //     console.log(data)
            // },
			  
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
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
			getUser: () => {
				const store = getStore();
				fetch(process.env.BACKEND_URL + `api/configuration`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				})
				.then (response => response.json())
				.then ((response) => {
					setStore({user: response.data});
				});
			}
		}
	};
};

export default getState;
