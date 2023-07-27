import * as api from '../utils/apiCalls.js'

const getState = ({ getStore, getActions, setStore }) => {
  const API_URL = process.env.BACKEND_URL + 'api'

  return {
    store: {
      user: {},
      token: undefined,
    },
    actions: {
      login: async (email, password) => {
        const data = await api.login(email, password)
        if (!data.user.isAdmin) {
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('myToken', data.token)
        }
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
        let token = localStorage.getItem('myToken')
        return token != null ? true : false
      },
      saveUserDatainStore: async (user) => {
        setStore({ user: user })
      },
    },
  }
}

export default getState
