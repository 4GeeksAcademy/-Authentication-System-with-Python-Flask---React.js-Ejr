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
            urlBase:"https://openlibrary.org/search.json"
        },
        actions: {
            login: async (email, password) => {
                let actions=getActions()
				const dat =await actions.APIfetch("/login","POST",{email,password})
				if(dat.error){
					return false
				}
				setStore({token:dat.token})
				localStorage.setItem("accessToken",dat.token)
				return true				

            },
            signup: async (email, password, first_name, last_name, phone, location) => {
				
                let actions=getActions()
                const res= await actions.APIfetch("/signup","POST", {email,password,email, password, first_name, last_name, phone, location})
                if(res.ok){
                    console.log("Usuario registrado")
                    return true

                }
                else{
                    console.log("error")
                    return false

                }

        

        }		,
            getMessage: async () => {
                let actions = getActions();
                try {
                    const data = actions.APIfetch("/hello");
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
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
				
			},
			setBooks:async(endpoint,method="GET",body=null)=>{
				let store=getStore()
				try {
					const response=await fetch(store.urlBase+`?q=${endpoint}`)
					const data=await response.json()

					if(!response.ok){
						console.log(data)
					}
				return data
				} catch (error) {
				console.log(error)	
				}
            
			},
            showNotification: async (message, type) => {
                setStore({ response: { message, type } })
              },
              loadSession: ()=>{
                  let token=localStorage.getItem("accessToken")
                  setStore({token})
              }
        }
    };
};

export default getState;

