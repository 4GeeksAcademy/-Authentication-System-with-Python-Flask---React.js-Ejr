const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false
        },
        actions: {
            login: async (email, password) => {

				try {
					let response = await fetch("https://friendly-orbit-gwq4p945p5wfpvgp-3001.app.github.dev/api/login", {
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
					let response = await fetch("https://friendly-orbit-gwq4p945p5wfpvgp-3001.app.github.dev/api/validate_token", {
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
				
            }
        }
    };
};
export default getState;