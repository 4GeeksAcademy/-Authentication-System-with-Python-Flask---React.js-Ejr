// flux.js store
const initialState = {
	whoIsLogged: null, // Puede ser 'Patient', 'Professional', 'Admin', o null si no está loggeado
	isLogged: false,
  };
  
  const demoState = {
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
  };
  
  const rootState = {
	...initialState,
	...demoState,
  };
  
  const rootReducer = (state = rootState, action) => {
	switch (action.type) {
	  case 'SET_WHO_IS_LOGGED':
		return { ...state, whoIsLogged: action.payload };
	  case 'SET_LOGGED_IN':
		return { ...state, isLogged: true };
	  case 'SET_LOGGED_OUT':
		return { ...state, whoIsLogged: null, isLogged: false };
	  case 'DELETE_TOKEN':
		// Llama a la función de eliminación del token
		deleteTokenAction();
		return state;
	  default:
		return state;
	}
  };
  
  export default rootReducer;
  