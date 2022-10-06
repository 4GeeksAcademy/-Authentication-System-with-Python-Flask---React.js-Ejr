const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      moreexchange: null,
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
      prueba: () => {
        const { moreexchange } = getStore();
        let parser = new DOMParser();
        let doc = parser.parseFromString(moreexchange, "text/html");
        console.log(doc);
      },
      getExchange: async () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        await fetch(
          "https://3000-mojonapower-scrapingand-3sp1jp43osy.ws-us70.gitpod.io/",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            let parser = new DOMParser();
            let doc = parser.parseFromString(result.moreexchange, "text/html");
            console.log(doc.querySelectorAll("[class*=ninja_table_row]"));
            setStore({ moreexchange: result.moreexchange });
          })
          .catch((error) => console.log("error", error));
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
