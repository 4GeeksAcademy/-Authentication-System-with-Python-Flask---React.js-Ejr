const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites:[],
			destination:[],
			email:[],
			token:null

		},
		actions: {
			// Use getActions to call a function within a fuction
			addFav: (newFav) => {
				let newFavorites = getStore().favorites;
				newFavorites.push(newFav);
				setStore({ favorites: newFavorites });
			  },
			  destination: async () =>{
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
			register:(email, password, recovery_question, recovery_answer) => {
				fetch(`${process.env.BACKEND_URL}/register`,{
					method:'POST',
					headers:{
						"Content-Type":"application/json"
					},
					body:JSON.stringify({email, password, recovery_question, recovery_answer})
				})
				.then(resp =>{
					if(resp.ok){
						return resp.json()
					}
				})
				.then(data=>{
					return data.message
				})
				.catch(error=>console.log("error during registration",error))	
				}

				// const response = await fetch("https://bobo305-verbose-pancake-7v7wxqvx677hr5v4-3001.preview.app.github.dev/api/destination")
				// const data = await response.json();
				// // setToken(data.token)
				// setStore({destinations: data});
				// return data;
			
				// }catch(error){console.log ("error:", error)}
			

			}
		}
	
};

export default getState;

