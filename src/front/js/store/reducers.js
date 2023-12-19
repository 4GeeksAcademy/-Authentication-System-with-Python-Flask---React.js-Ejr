const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_WHO_IS_LOGGED':
        return { ...state, whoIsLogged: action.payload };
      case 'SET_LOGGED_IN':
        return { ...state, isLogged: true };
      case 'SET_LOGGED_OUT':
        return { ...state, whoIsLogged: null, isLogged: false };
      case 'DELETE_TOKEN':
        
        console.log('Token eliminado'); 
    
        return { ...state, whoIsLogged: null, isLogged: false };
      default:
        return state;
    }
  };
  
  export default rootReducer;