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
            ],
            users: [], // Array para almacenar los usuarios creados
            currentUser: null, // Usuario actual
            currentRole: null // Rol actual
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
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
            },
            createUser: async (newUser, userRole) => {
                try {
                    const store = getStore();
                    const updatedUsers = [...store.users, newUser];
                    setStore({ users: updatedUsers, currentUser: newUser, currentRole: userRole });
                    console.log('User created:', newUser);
                    console.log('Role selected:', userRole);
                } catch (error) {
                    console.error("Error creating user:", error);
                }
            }
        }
    };
};

export default getState;

