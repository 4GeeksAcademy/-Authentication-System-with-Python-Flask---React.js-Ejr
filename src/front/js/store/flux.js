const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      clases: [
        {
          titulo: "Web 1.0 vs Web 2.0 vs Web 3",
          link: "https://www.loom.com/embed/40a34b4547a149a7bf7cf314a8c77048",
          id: 0,
          descripcion: "",
        },
        {
          titulo: "¿Que es blockchain?",
          link: "https://www.loom.com/embed/59be7dd7d49d4693b9f7623456e0538b",
		  id:1,
          descripcion: "",
        },
        {
          titulo: "Bitcoin vs Ethereum",
          link: "https://www.loom.com/embed/111edb45dde2452b85b4b16432dcd0fa",
          id: 2,
          descripcion: "",
        },
        {
          titulo: "Creando mi primera Wallet",
          link: "https://www.loom.com/embed/272f324885834ddf98ecfb543b1def1c",
          id: 3,
          descripcion: "",
        },
        {
          titulo: "Comprando cripto - Binance",
          link: "https://www.loom.com/embed/9f764eb3523d473792c06e296b95037e",

          id: 4,
          descripcion: "",
        },
        {
          titulo: "Comprando cripto - Buda",
          link: "https://www.loom.com/embed/d92134899bcc445e995b05e00920e9a4",
          id: 5,
          descripcion: "",
        },
        {
          titulo: "Wallet parte 2",
          link: "https://www.loom.com/embed/0701c219b0da47ec996edea099d6b476",
          id: 6,
          descripcion: "",
        },
        {
          titulo: "Proyectos en la web 3",
          link: "https://www.loom.com/embed/78b8089f5dcc4b5896f275d8779b388b",
          id: 7,
          descripcion: "",
        },
        {
          titulo: "Interactuando con un smart contract",
          link: "https://www.loom.com/embed/d82431879e4a45a1ae28bd6a5d7d5237",
          id: 8,
          descripcion: "",
        },
        {
          titulo: "Interactuando con un smart contract - parte 2",
          link: "https://www.loom.com/embed/1b2fe3b07d74490abde028c24252065c",
          id: 9,
          descripcion: "",
        },
        {
          titulo: "Interactuando con un smart contract - parte 3",
          link: "https://www.loom.com/embed/22cdcd17ee2b411895233be49d20b1dc",
          id: 10,
          descripcion: "",
        },
        {
          titulo: "Final del curso",
          link: "https://www.loom.com/embed/54873cd5f3be4906a3b8380217fcc90c",
          id: 11,
          descripcion: "",
        },
      ],
      descripcion: [],
    
      id: [],

      //titulos clases

      
      
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
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
    },
  };
};

export default getState;
