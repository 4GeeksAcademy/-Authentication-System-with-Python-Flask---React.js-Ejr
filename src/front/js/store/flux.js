const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            products: [],//Creo un array de productos vacio para que se almacenen los productos seleccionados y mis favss?
            favorites: [],
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
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: () => {
                // fetching data from the backend
                fetch(process.env.BACKEND_URL + "/api/hello")
                    .then(resp => resp.json())
                    .then(data => setStore({ message: data.message }))
                    .catch(error => console.log("Error loading message from backend", error));
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },
            //CODIGO PARA AGREGAR Y REMOVER FAVORITOS
            /*agregarFavoritos: favs => {
                setStore ({favorites:getStore().favoritos.concat(favs)}); // Crear array nuevo con data de favoritos.
            },

            removerFavoritos: index => {
                const NuevoArrayFavs = getStore().favoritos.filter((item,index)=>{
                    return indice !== index;
                });*/

            setStore({ favorites: NuevoArrayFavs })
        }
    };

}
export default getState;
