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
						return true;
				} catch (error) {
					console.log(error);
						return false;
				}
            }
        }
    };
};
export default getState;