import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,
            events: [],
            user: [],
            eventInfo: null
        },

        actions: {

            obtenerInfoUsuario: async () => {
                let token = localStorage.getItem("token");
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/user/details", {
                        method: "GET",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await res.json()
                    setStore({ user: data.details })
                } catch (error) {
                    console.error(error)
                }
            },

            obtenerEventos: async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/events")
                    const data = await res.json()
                    setStore({ events: data.results })

                } catch (error) {
                    console.error(error)
                }
            },


            obtenerOneEvento: async (id) => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/events/${id}`)
                    const data = await res.json()
                    console.log(data);

                    setStore({ eventInfo: data })

                } catch (error) {
                    console.error(error)
                }
            },

            login: async (email, password) => {

                try {
                    let response = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            "email": email,
                            "password": password
                        })
                    });
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        localStorage.setItem("token", data.access_token);
                        setStore({ auth: true })
                        return true;
                    }
                    else {
                        toast.error(data.msg)
                    }

                } catch (error) {
                    console.log(error);
                    return false;
                }
            },


            validate_token: async () => {
                let token = localStorage.getItem("token")

                if (token) {
                    try {
                        let response = await fetch(process.env.BACKEND_URL + "/api/validate_token", {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (response.status >= 200 && response.status < 300) {
                            setStore({ auth: true })
                        }
                        else {
                            setStore({ auth: false });
                            localStorage.removeItem("token");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            },

            register: async (name, email, password) => {
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

                    if (response.status >= 200 && response.status < 300) {
                        return true; // Registro exitoso
                    } else {
                        toast.error(data.msg)
                        return false;
                    }
                } catch (error) {
                    console.error(error);
                    return false;
                }
            },

            

            obtenerEventosCategoria: async (category) => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/events/${category}`)
                    const data = await res.json()
                    setStore({ events: data.result })

                } catch (error) {
                    console.error(error)
                }
            },


        }
    }
};


        
    


export default getState;