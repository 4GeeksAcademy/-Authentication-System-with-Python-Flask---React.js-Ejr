const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			favInf: [],
			posts: [],
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
			agregar: (url)=>{
				const store = getStore();
				setStore({ posts: [...store.posts, url] });
			},

			addFavInf: (name)=>{
				setStore({favInf:[...getStore().favInf, name]})		


			},
			deleteFavInf: (name)=>{
				let newArray = getStore().favInf.filter((valor)=> {
					return valor != name;

				})
				setStore({favInf:newArray})
			},


			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				var myHeaders = new Headers();
  				myHeaders.append("Content-Type", "application/json");

  				var raw = JSON.stringify({
    				"email": email,
    				"password": password,
  				});

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow'
				};

				try{
					const resp = await fetch(
						"https://3001-jaygosling-influere-gyow40i3nvc.ws-eu47.gitpod.io/login", requestOptions)
					if (resp.status != 200) {
						alert("There has been some error");
						return false;
					}
	
					const data = await resp.json();
					console.log("this come form the backend", data);	
					sessionStorage.setItem("token", data.access_token);
					setStore({token: data.access_token});
					return true;
				}
				catch(error){
					console.error("Error al iniciar sesion")
				}
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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
