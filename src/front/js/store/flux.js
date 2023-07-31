import * as api from '../utils/apiCalls.js'

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: {},
      token: undefined,
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

			
      

    },
  }
}

export default getState
