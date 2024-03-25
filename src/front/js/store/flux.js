const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // Estado inicial del store
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
            resultados: [],
            favorites: [],
            urlBase: "https://openlibrary.org/search.json",
            favorites: [],
            // Otros métodos de tu store...
            addToFavorites: (book) => {
                const { favorites } = getStore();
                if (!favorites.find((b) => b.key === book.key)) {
                    const updatedFavorites = [...favorites, book];
                    setStore({ favorites: updatedFavorites });
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                }
            },
            removeFromFavorites: (bookKey) => {
                const { favorites } = getStore();
                const updatedFavorites = favorites.filter((book) => book.key !== bookKey);
                setStore({ favorites: updatedFavorites });
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            },
        },
        actions: {
            login: async (email, password) => {
            
                // Proceso real de autenticación no borrar
                const actions = getActions();
                try {
                    const data = await actions.APIfetch("/login", "POST", { email, password });
                    if (data.error) {
                        console.error("Login error:", data.error);
                        return { success: false, error: data.error }; 
                    }
                    setStore({ token: data.token });
                    localStorage.setItem("accessToken", data.token);
                    return { success: true }; 
                } catch (error) {
                    console.error("Error:", error);
                    return { success: false, error: "Incorrect credentials" };
                }
            },
            logout: () => {
                setStore({ token: null });
                localStorage.removeItem('accessToken');
            },
            // Acción para registrarse
            signup: async (email, password, first_name, last_name, phone, location) => {
                const actions = getActions();
                try {
                    const res = await actions.APIfetch("/signup", "POST", {
                        email, password, first_name, last_name, phone, location
                    });
                    if (res.error) {
                        console.error("Error al registrar el usuario:", res.error);
                        return false;
                    } else {
                        console.log("Usuario registrado exitosamente");
                        return true;
                    }
                } 
                catch (error) {
                    console.error("Error al realizar la petición:", error);
                    return false;
                }
            },
            // Acción para obtener un mensaje del backend
            getMessage: async () => {
                const actions = getActions();
                try {
                    const data = await actions.APIfetch("/hello");
                    setStore({ message: data.message });
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

            // Función genérica para realizar llamadas API
            APIfetch: async (endpoint, method = "GET", body = null) => {
                const backendURL = process.env.BACKEND_URL || "http://localhost:5000";

                const params = { method, headers: {} };
                if (body) {
                    params.headers["Content-Type"] = "application/json";
                    params.body = JSON.stringify(body);
                }
                try {
                    const res = await fetch(`${backendURL}api${endpoint}`, params);
                    if (!res.ok) throw new Error(res.statusText);
                    return await res.json();
                } catch (error) {
                    console.error("Error fetching data durign login:", error);
                    throw error;
                }
            },
            setBooks: async (searchTerm) => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}?q=${searchTerm}&limit=50`);
                    if (!response.ok) throw new Error('Respuesta no exitosa de la API');
                    const data = await response.json();
                    const filteredResults = data.docs.filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6);
                    setStore({ resultados: filteredResults });
                } catch (error) {
                    console.error("Error al realizar la búsqueda:", error);
                }
            },
            loadSession: () => {
                const token = localStorage.getItem("accessToken");
                setStore({ token });
            }
        }
    };
};

export default getState;
