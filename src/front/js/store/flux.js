import * as api from '../utils/apiCalls.js'
const API_URL = process.env.BACKEND_URL + 'api'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      token: undefined,
      clothes: [],
      shoes: [],
      accessories: [],
      details: {},
      favorites: [],
      shopping_cart: [],
      total_cart: 0
    },
    actions: {
      login: async (email, password) => {
        const actions = getActions()
        const data = await api.login(email, password)
        setStore({ user: data.user, token: data.token })
        const obj = { ...data.user }
        obj.is_admin = false
        delete obj.is_admin
        localStorage.setItem('user', JSON.stringify(obj))
        actions.getFavorites()
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
          const data = await api.validateToken(token)
          localStorage.setItem('user', JSON.stringify(data))
          setStore({ user: data.user, token, favorites: data.favorites, shopping_cart: data.shopping_cart })
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
          const store = getStore()
          const result = await fetch(API_URL + '/products/clothing')
          const data = await result.json()

          if (Array.isArray(data)) {
            setStore({ clothes: data })
            console.log('Prendas cargadas')
            console.log(store.clothes)
          } else {
            console.log('El resultado de la API no es un array válido:', data)
          }
        } catch (error) {
          console.log('No se pudo recuperar lista prendas', error)
        }
      },
      getShoes: async () => {
        try {
          const store = getStore()
          const result = await fetch(API_URL + '/products/shoes')
          const data = await result.json()

          if (Array.isArray(data)) {
            setStore({ shoes: data })
            console.log('shoes uploaded')
            console.log(store.shoes)
          } else {
            console.log('El resultado de la API no es un array válido:', data)
          }
        } catch (error) {
          console.log('No se pudo recuperar lista prendas', error)
        }
      },
      getAccessories: async () => {
        try {
          const store = getStore()
          const result = await fetch(API_URL + '/products/accessories')
          const data = await result.json()

          if (Array.isArray(data)) {
            setStore({ accessories: data })
            console.log('accesorios cargados')
            console.log(store.accessories)
          } else {
            console.log('El resultado de la API no es un array válido:', data)
          }
        } catch (error) {
          console.log('No se pudo recuperar lista prendas', error)
        }
      },
      getProductDetails: async (id) => {
        const product = await api.getProductByID(id)
        return product
      },
      getFavorites: async () => {
        const store = getStore()
        if (!store.token) return
        const response = await api.getFavorites(store.token)
        setStore({ favorites: response })
        console.log(response)
        console.log('Favorites upload')
        return response
      },

      postFavorites: async (id) => {
        const store = getStore()
        const response = await api.postFavorites(store.token, id)

        setStore({ favorites: response })
        console.log(response)
        console.log('Favorite added')
        return response
      },

      deleteFavorites: async (id) => {
        const store = getStore()
        const response = await api.deleteFavorites(store.token, id)
        setStore({ favorites: response })
        console.log(response)
        console.log('Favorite deleted')
        return response
      },
      // getShoppingCart:async() => {
      //   const store = getStore();
      //   const response = await api.getShoppingCart(store.token)
      //   // setStore({shopping_cart:response})
      //   // console.log(response)
      //   console.log('Shopping cart loaded')
      //   // return response
      // },
      postShoppingCart: async (product_id, quantity, size_id) => {
        const response = await api.postShoppingCart(
          product_id, quantity, size_id,
          getStore().token
        )

        setStore({ shopping_cart: response })

        console.log('Shopping item added')
        return response
      },

      deleteShoppingCart: async (product_id, size_id) => {
        const store = getStore();
        const response = await api.deleteShoppingCart(store.token, product_id, size_id);
      
        const updatedShoppingCart = store.shopping_cart.filter(item => (
          item.product.id !== product_id || item.size.id !== size_id
        ));
      
        const updatedTotalCart = updatedShoppingCart.reduce((total, item) => (
          total + item.quantity * item.product.price
        ), 0);
      
        setStore({
          shopping_cart: updatedShoppingCart,
          total_cart: updatedTotalCart
        });
      
        console.log('Shopping item deleted');
        return response;
      },
      
      changeTotalCart: async (value) => {
        const store = getStore();
        const updatedTotal = store.total_cart + value; 
      
        setStore({ total_cart: updatedTotal });
      },
      
      
      
    },
  }
}

export default getState
