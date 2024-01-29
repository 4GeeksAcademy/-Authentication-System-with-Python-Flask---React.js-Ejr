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
		]
	  },
	
	  actions: {
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
	
		createAccount: async (email, nombre, password) => {
		  try {
			// Limpiar cualquier mensaje de error anterior
			setStore({ message: null });
	  
			// Enviar datos al servidor
			const response = await fetch(process.env.BACKEND_URL + "/crearCuenta", {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				email,
				nombre,
				password,
			  }),
			});
	  
			if (!response.ok) {
			  // Manejar errores según el código de estado
			  const responseData = await response.json();
			  if (response.status === 409) {
				setStore({ message: 'Este correo electrónico ya está registrado. Por favor, utiliza otro.' });
			  } else if (responseData.error) {
				setStore({ message: responseData.error });
			  } else {
				setStore({ message: 'Error en la solicitud al servidor' });
			  }
	  
			  // Devolver algún tipo de información si es necesario
			  return responseData;
			}
	  
			// Éxito en la creación de la cuenta
			const data = await response.json();
			console.log(data);
	  
			// Actualizar el estado global si es necesario
			setStore({ message: 'Cuenta creada con éxito' });
	  
			// Devolver algún tipo de información si es necesario
			return data;
	  
		  } catch (error) {
			console.error('Error al enviar los datos:', error);
			setStore({ message: 'Error al enviar los datos. Por favor, inténtalo de nuevo.' });
		  }
		},
	  },
	};
  };
  
  export default getState;
  