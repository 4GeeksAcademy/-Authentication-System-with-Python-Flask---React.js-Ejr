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
			login: (dato)=>{
				console.log(dato)
			

			var requestOptions = {
				method: "PUT",
				headers: {
				  "Content-Type": "application/json"
				},
				body: JSON.stringify(dato),
				redirect: "follow"
			  };
			
			  fetch(
				"url",
				requestOptions
			  )
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
			  },

			registrocliente: (dato2)=>{
				console.log(dato2)

				var requestOptions2 = {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json"
					},
					body: JSON.stringify(dato2),
					redirect: "follow"
				  };
				
				  fetch(
					"url",
					requestOptions2
				  )
					.then((response) => response.json())
					.then((result) => { 
						console.log(result)
					
					})
					.catch((error) => console.log("error", error));	
			
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
