import * as api from '../utils/apiCalls.js'
const API_URL = process.env.BACKEND_URL + 'api'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      token: undefined,
      clothes:[],
      shoes:[],
      accessories:[],
      details: {}
    },
    actions: {
      login: async (email, password) => {
        const data = await api.login(email, password)
        setStore({ user: data.user, token: data.token })
        const obj = { ...data.user }
        obj.is_admin = false
        delete obj.is_admin
        localStorage.setItem('user', JSON.stringify(obj))
        if (!data.user.is_admin) localStorage.setItem('myToken', data.token)
      },
      signup: async (
        email,
        password,
        first_name,
        last_name,
        phone,
        location,
        address,
        payment_method
      ) => {
        const response = await api.signup(
          email,
          password,
          first_name,
          last_name,
          phone,
          location,
          address,
          payment_method
        )
        console.log(response)
        console.log('Succefully created user')
        return response
      },

      logout: () => {
        localStorage.removeItem('myToken')
        localStorage.removeItem('user')
        setStore({ user: {}, token: undefined })
      },

      validateToken: async () => {
        const token = localStorage.getItem('myToken')
        if (!token) return
        try {
          const user = await api.validateToken(token)
          localStorage.setItem('user', JSON.stringify(user))
          setStore({ user, token })
        } catch {
          localStorage.removeItem('user')
          localStorage.removeItem('myToken')
          setStore({ user: {}, token: undefined })
        }
      },

      addNewProduct: async (
        name,
        price,
        description,
        color,
        type,
        category_id,
        // sizes,
        image_url
      ) => {
        const response = await api.createProduct(
          name,
        price,
        description,
        color,
        type,
        category_id,
        // sizes,
        image_url,
        getStore().token
        )
        console.log(response)
        console.log('Succefully created product')
        return response
      },

      getClothes: async () => {
        try {
          const store = getStore();
          const result = await fetch(API_URL + "/products/clothing");
          const data = await result.json();
      
          if (Array.isArray(data)) {
            setStore({clothes: data});
            console.log("Prendas cargadas");     
            console.log(store.clothes);
            
          } else {
            console.log("El resultado de la API no es un array válido:", data);
          }
        } catch (error) {
          console.log("No se pudo recuperar lista prendas", error);
        }
        
      
			},
      getShoes: async () => {
        try {
          const store = getStore();
          const result = await fetch(API_URL + "/products/shoes");
          const data = await result.json();
      
          if (Array.isArray(data)) {
            setStore({shoes: data});
            console.log("shoes uploaded");     
            console.log(store.shoes);
            
          } else {
            console.log("El resultado de la API no es un array válido:", data);
          }
        } catch (error) {
          console.log("No se pudo recuperar lista prendas", error);
        }
        
      
			},
      getAccessories: async () => {
        try {
          const store = getStore();
          const result = await fetch(API_URL + "/products/accessories");
          const data = await result.json();
      
          if (Array.isArray(data)) {
            setStore({accessories: data});
            console.log("accesorios cargados");     
            console.log(store.accessories);
            
          } else {
            console.log("El resultado de la API no es un array válido:", data);
          }
        } catch (error) {
          console.log("No se pudo recuperar lista prendas", error);
        }
        
      
			},
      viewDetails:async (id) => {
				const store = getStore();
        // const cat = category == 1 ? "clothes" : category == 2 ? "accessories" : "shoes"
				// const selected = store[cat].find((e)=>e.id === id);
        // console.log(store.[cat])
				// console.log("Esta es la info product", selected );
				// setStore({details:selected });
        try {
          
          const result = await fetch(API_URL + `/products/${id}`);
          const data = await result.json();
      
          
            setStore({details: data});
            console.log("details cargados");
          } catch (error) {
            console.log("No se pudo recuperar detalles", error);
          }
			  },

             
            
					
				

			

			
      

    },
  }
}

export default getState
