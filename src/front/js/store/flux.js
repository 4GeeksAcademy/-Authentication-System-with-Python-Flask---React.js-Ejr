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
                    console.log(response.status);
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("user", data.user.name);
                        localStorage.setItem("email", data.user.email);
                        localStorage.setItem("id", data.user.id);
                        await setStore({ auth: true })
                    }
                    else {
                        toast.error(data.msg)
                    }

                } catch (error) {
                    console.log(error);
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
                            await setStore({ auth: true })
                            await getActions().obtenerInfoUsuario()
                            console.log(getStore().eventInfo);
                            console.log(getStore().user);
                        }
                        else {
                            setStore({ auth: false });
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            localStorage.removeItem("email");
                            localStorage.removeItem("id");
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


            inscripcionEvento: async (id) => {
                let token = localStorage.getItem("token")

                try {
                    let response = await fetch(process.env.BACKEND_URL + `/api/asistir/${id}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }

                    });
                    let data = await response.json();
                    if (response.status >= 200 && response.status < 300) {

                        await getActions().obtenerOneEvento(id)
                        await getActions().obtenerInfoUsuario()

                        // localStorage.setItem("token", data.access_token);
                        // setStore({ auth: true })
                        console.log(data);
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



        }
    }
};






export default getState;