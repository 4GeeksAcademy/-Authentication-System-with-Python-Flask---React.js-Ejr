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

			getMessage: async () => {
				let actions=getActions()
				try{
					// fetching data from the backend

					const data = actions.APIfetch("/hello")
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
			APIfetch: async (endpoint,method="GET",body=null)=>{
				let params={method}
				if (body!=null){
					params.headers={
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin":"*"
					}
					params.body=JSON.stringify(body) 
				}
				let res=await fetch(process.env.BACKEND_URL+"/api"+endpoint,params)
				if (!res.ok){
					console.error(res.statusText)
					return ({error:res.statusText})

				}
				let json=res.json()
				return json
				
			}
			
		}
	};
};

export default getState;
