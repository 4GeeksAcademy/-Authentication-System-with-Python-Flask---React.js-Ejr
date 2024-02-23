const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,
            events: []
        },

        actions: {
            obtenerEventos: async ()=> {
                try {
                    const res = await fetch(process.env.BACKEND_URL+"/api/events")
                    const data = await res.json()
                    setStore({events:data.results})
                    
                } catch (error) {
                    console.error(error) 
                }               
                    
                    
            },
            login: async (email, password) => {

				try {
					let response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method:"POST",
						headers: {
							"Content-type":"application/json"
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					});
					let data = await response.json();
					localStorage.setItem("token",data.access_token);
                    window.location.reload();
						return true;
				} catch (error) {
					console.log(error);
						return false;
				}
            },
       

            validate_token: async () => {
                let token = localStorage.getItem("token")

                if(token){
                    try {
					let response = await fetch(process.env.BACKEND_URL + "/api/validate_token", {
					    headers: {
						    'Content-Type': 'application/json',
						    'Authorization': `Bearer ${token}`
					    }
				    });
                    if (response.status>=200 && response.status<300){
                        setStore({ auth: true})
                    }
                    else{
                        setStore({ auth: false});
                        localStorage.removeItem("token");
                    }
				    } catch (error) {
					    console.log(error);
				    }
                }
				
            },

            register: async (name, email, password)  => {
                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "name": name,
                            "email": email,
                            "password": password
                        })
                    });
            
                    let data = await response.json();
                    
                    if (response.status >= 200 &&  response.status < 300) {
                        return true ; // Registro exitoso
                    } else {
                        console.error(data.msg); // Manejo de errores
                        return false;
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            }

            








































           
  
        }
}};

export default getState;