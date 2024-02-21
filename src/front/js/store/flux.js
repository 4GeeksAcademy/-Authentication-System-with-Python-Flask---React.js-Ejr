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
            login: async (email, password) => {

				try {
					let response = await fetch("https://shiny-dollop-qgq7xr79pxg24747-3001.app.github.dev/api/login", {
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
					localStorage.setItem("token",data);
						return true;
				} catch (error) {
					console.log(error);
						return false;
				}
            },
             register: async (name, email, password) => {
        try {
            let response = await fetch("https://shiny-dollop-qgq7xr79pxg24747-3001.app.github.dev/api/signup", {
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
            if (response.ok) {
                return true; // Registro exitoso
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
        }
    };

export default getState;