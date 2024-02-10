const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            BACKEND_URL: process.env.BACKEND_URL,
            token: null,
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

            events: [
                {
                    date: "02-02-2022",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 1,
                    image: null,
                    location: "Thompsons",
                    name: "Event 01",
                    price: "20"
                },
                {
                    date: "06-08-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 2,
                    image: null,
                    location: "Laverys",
                    name: "Event 02",
                    price: "10"
                },
                {
                    date: "23-12-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 3,
                    image: null,
                    location: "Ollies",
                    name: "Event 03",
                    price: "15"
                },
                {
                    date: "05-05-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 4,
                    image: null,
                    location: "4Geeks",
                    name: "Event 04",
                    price: "35"
                },
                {
                    date: "2024-02-24",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 5,
                    image: null,
                    location: "Voodoo",
                    name: "Event 05",
                    price: "25"
                },
                {
                    date: "2024-02-25",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 6,
                    image: null,
                    location: "Liquor",
                    name: "Event 06",
                    price: "50"
                },
                {
                    date: "2024-03-15",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 7,
                    image: null,
                    location: "The SSE Arena",
                    name: "Event 07",
                    price: "30"
                },
                {
                    date: "2024-04-20",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 8,
                    image: null,
                    location: "Ulster Sports Club",
                    name: "Event 08",
                    price: "15"
                },
                {
                    date: "06-08-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 9,
                    image: null,
                    location: "Thompsons",
                    name: "Event 09",
                    price: "10"
                },
                {
                    date: "19-05-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 10,
                    image: null,
                    location: "Boneyard",
                    name: "Event 10",
                    price: "30"
                },
                {
                    date: "19-05-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 11,
                    image: null,
                    location: "Boneyard",
                    name: "Event 11",
                    price: "30"
                },
                {
                    date: "11-05-2024",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel neque eros. Pellentesque pretium faucibus mattis. Phasellus faucibus non diam vitae condimentum.",
                    id: 12,
                    image: null,
                    location: "Thompsons",
                    name: "Event 12",
                    price: "20"
                }
                ]
        },

        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                console.log("Application opened. Syncing the sessionsStorage token.");
                if (token && token !== "" && token !== undefined) setStore({ token: token });
            },

            logout: () => {
                sessionStorage.removeItem("token");
                console.log("Logging user out");
                setStore({ token: null });
            },

            login: async (email, password) => {
                console.log(email, password);
                const opts = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                };

                try {
                    const resp = await fetch(`${getStore().BACKEND_URL}/api/login`, opts);
                    if (resp.status !== 200) {
                        alert("There has been an error !");
                        return false;
                    }

                    const data = await resp.json();
                    console.log("This came from the backend.", data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } catch (error) {
                    console.log("There has been an error logging in.");
                    console.log(error);
                }
            },

            getMessage: async () => {
                const store = getStore();
                const opts = {
                    headers: {
                        "Authorization": "Bearer" + store.token
                    }
                };

                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello", opts);
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            fetchEvent: async (eventId) => {
                try {
                    const response = await fetch(`${getStore().BACKEND_URL}/api/event/${eventId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch event data");
                    }
                    const data = await response.json();
                    return data.event;
                } catch (error) {
                    console.error("Error fetching event data:", error);
                    throw error;
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
