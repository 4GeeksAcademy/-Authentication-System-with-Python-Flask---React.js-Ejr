const apiUrl = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            rooms: [],
            loadingRooms: false 
        },

        actions: {
            submitLogInForm: async (logInData) => {
                try {
                    let response = await fetch(`${apiUrl}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(logInData)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to log in');
                    }

                    let data = await response.json();
                    localStorage.setItem("jwt-token", data.token);

                    return true;
                } catch (error) {
                    console.error('Error logging user in:', error);
                    return false;
                }
            },

            submitSignUpForm: async (signUpData) => {
                try {
                    let response = await fetch(`${apiUrl}/api/signup`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(signUpData)
                    });

                    if (!response.ok) {
                        throw new Error('Failed to create user');
                    }

                    return true;
                } catch (error) {
                    console.error('Error creating user:', error);
                    return false;
                }
            },

            fetchRooms: async () => {
                const store = getStore();
                setStore({ loadingRooms: true }); //

                try {
                    let response = await fetch(`${apiUrl}/api/home`); 
                    if (!response.ok) throw new Error("Couldn't fetch current rooms");
                    let roomsData = await response.json();
                    setStore({ 
                        ...store, 
                        rooms: roomsData,
                        loadingRooms: false 
                    });
                    console.log(store.rooms);
                    return true; 
                } catch (error) {
                    console.error(error);
                    setStore({ loadingRooms: false });
                    return false; 
                }
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(`${apiUrl}/api/hello`);
                    const data = await resp.json();
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
            }
        }
    };
};

export default getState;
