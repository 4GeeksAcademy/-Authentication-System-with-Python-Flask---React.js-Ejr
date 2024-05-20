const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLoggedIn:false,
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
			

/* --------- De aqui en adelante van las funciones de flux  */

setLogin:()=>{
	setStore({isLoggedIn:true})
},
setLogout:()=>{
	setStore({isLoggedIn:false})
	localStorage.removeItem('token');
	
},

register_User: (name,email, password) =>{
	
	fetch( 'https://super-duper-barnacle-74g6vpw66q42pwr5-3001.app.github.dev/api/signup',{
		method:'POST',
		headers:{
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify({
			"name": name,
			"email": email,
			"password": password,
		   }),
})
	.then(Response => Response.json())
	.then(data => {
		console.log(data); 
		
	})
	.catch(error => console.log('Error parcero', error))

},

/* --------- FUNCION FLUX (fetch) PARA LOGIN----------- */
login: async (email, password) => {
    await fetch('https://super-duper-barnacle-74g6vpw66q42pwr5-3001.app.github.dev/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login exitoso:', data);

        localStorage.setItem('token', data.token);

        getActions().setLogin();
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}



		}
	};
};

export default getState;
