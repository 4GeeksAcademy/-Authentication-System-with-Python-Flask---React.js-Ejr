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
        obj.isAdmin = false
        delete obj.isAdmin
        localStorage.setItem('user', JSON.stringify(obj))
        if (!data.user.isAdmin) localStorage.setItem('myToken', data.token)
      },
      signup: async (
        userEmail,
        userPassword,
        firstName,
        lastName,
        phone,
        location,
        address,
        paymentMethod
      ) => {
        const response = await api.signup(
          userEmail,
          userPassword,
          firstName,
          lastName,
          phone,
          location,
          address,
          paymentMethod
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

    },
  }
}

export default getState
