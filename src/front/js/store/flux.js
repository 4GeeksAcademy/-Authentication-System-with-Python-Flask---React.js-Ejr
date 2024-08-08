import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		users:[]
		},
		actions: {
			loginFetch: async () => {
				try {
				  let response = await axios.get(`${process.env.BACKEND_URL}/api/login`);
				 console.log(response)
				  return response.data;
				} catch (error) {
				  console.error('Error:', error);
				  throw error; 
				}
			  },
		}
	};
};

export default getState;
