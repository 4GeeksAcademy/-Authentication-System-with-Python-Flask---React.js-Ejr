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
			
			signupNewUser: async (formSignup)=>{
				const url="https://expert-space-eureka-4j76p6pr5rxpc7x4j-3001.app.github.dev/"
				const signupRequirement="/api/signup"
				try{
					
					const response= await fetch(url+signupRequirement,{
						method:"POST",
						body: JSON.stringify(formSignup),
						headers:{
							'Content-type': 'application/json'
						},					
					})
	
					if (response.ok){
						const jsonResponse= await response.json()
						console.log(jsonResponse)
						const store = getStore()
						setStore({...store,messageToShowAlert:jsonResponse})
					}
				
					else{
						const jsonResponse=await response.json()
						console.log(jsonResponse)
	
					}
	
				}
	
				catch(e){
					
					console.log("An error has occured",e)
					
				}
			},
			
			loginUserExisting:async({ email, password })=>{
				const url="https://expert-space-eureka-4j76p6pr5rxpc7x4j-3001.app.github.dev/"
				const loginRequirement="/api/login"
				try{
					const response = await fetch(url+loginRequirement, {
						method:'POST',
						headers:{
							'Content-type': 'application/json'
						},
						body:JSON.stringify({
							email,
							password
						})
					});
					
					if(response.status !==200) return false	
						
					const jsonResponse= await response.json()
	
					if (jsonResponse["token"]){
						localStorage.setItem("userToken", jsonResponse["token"])
						return true;
	
					}
					return false;
						
				}
			
				catch(e){
							console.log("An error was occurred, check it out!",e)
				}
			},
	
			getInformationOfToken: async () => {
				const url = "https://expert-space-eureka-4j76p6pr5rxpc7x4j-3001.app.github.dev/";
				const tokenRequirement = "/api/userdata";
			 
				try {
					const response = await fetch(url + tokenRequirement, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("userToken")}`
						}
					});
			 
					if (response.status !== 200) {
						throw new Error(`Error: ${response.status}`);
					}
			 
					const jsonResponse = await response.json();
			 
					return jsonResponse;

				} catch (error) {
					console.error("An error occurred: ", error);
				}
			},

			

		}
	};
};

export default getState;