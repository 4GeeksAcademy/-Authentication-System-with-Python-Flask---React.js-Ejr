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
	  isAuthenticated: false, 
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
   
	  login: () => {
	   setStore({ isAuthenticated: true });
	  },
   
	  logout: () => {
	  
	   const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
   
	   
	   if (confirm) {
		
		localStorage.removeItem('token');
   
		
		setStore({ isAuthenticated: false });
   
		
		const history = useHistory();
		history.push('/');
	   }
	  }
	 }
	};
   };
   
   export default getState;