import axios from "axios";

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
			signup: async (firstName, lastName, email, password, phone, confpassword)=>{
				console.log(firstName, lastName,email,phone,password,confpassword);
				try {
					let data = await axios.post("https://bug-free-winner-5gqqjj4445w7fv69p-3001.app.github.dev/api/signup", {

						"name": firstName,
						"lastname": lastName,
						"email": email,
						"phone_number": phone,
						"password": password,
						"is_admin": false

					})
					console.log(data);
					return true;

				} catch (error) {
					
					if (error.response.status === 404) {
						alert (error.response.data.msg)
						
					}
					return false;
				}

			},

			}
		}
	};


export default getState;
