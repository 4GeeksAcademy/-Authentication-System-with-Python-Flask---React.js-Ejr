const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			token: null,
			currentUser: null,
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

			getProjects: () => {
				fetch("https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects")
				  .then((response) => response.json())
				  .then((data) => {console.log(data); 
					setStore({ projects: data })
				})
			}, 

			// getProject: (id) => {
			// 	fetch("https://3001-xetnal-finalproject-v6ua4tu6zkd.ws-us45.gitpod.io/api/projects/"+id)
			// 	  .then((response) => response.json())
			// 	  .then((data) => {console.log(data); 
			// 		setStore({ projects: data })
			// 	});
			// }

			logout: () => {
				sessionStorage.removeItem("token")
				setStore({token: null})
			},

			syncTokenFromSessionStore: () => {
				const currentUser = JSON.parse(sessionStorage.getItem('user'))
				const token = sessionStorage.getItem("token")
				if(token && token != "" && token != undefined) setStore({ token, currentUser})
			},

			login: async (email, password) => {
				console.log({
					email: email,
					password: password
				  })
				  const opts = {
					method: "POST",
					headers:{
					  "Content-Type": "application/json"
					},
					body: JSON.stringify(
					  {
						email: email,
						password: password
					  }
					)
				  }


				try{
					const resp = await fetch("https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/token", opts)  
					console.log(resp)
					if(resp.status !== 200){
						alert("There was an error");
						return false
						
						} 
					const data = await resp.json();
					console.log("this came from the backend", data)
					sessionStorage.setItem('token', data.access_token, )	
					sessionStorage.setItem('user', JSON.stringify(data.user) )
					setStore({ token: data.access_token, currentUser: data.user })
					return true				  		

				}
				catch(error){
					console.error("There was an error!")
				}

			},



			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: () => {
			// 	// fetching data from the backend
			// 	fetch(process.env.BACKEND_URL + "/api/hello")
			// 		.then(resp => resp.json())
			// 		.then(data => setStore({ message: data.message }))
			// 		.catch(error => console.log("Error loading message from backend", error));
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }



		}
	};
};

export default getState;
