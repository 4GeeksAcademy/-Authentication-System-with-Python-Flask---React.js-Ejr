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
        // console.log(data.user)
        setStore({ user: data.user, token : data.token })
        const obj = {...data.user}
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
        setStore({user: {}, token : undefined})
        
      },

      // handleRefreshClick : async () => {
      //   const store = getStore()
      //   setTimeout(() => {
      //     // Utiliza el método window.location.reload() para refrescar la página
      //     !store.user.isAdmin && window.location.reload();
      //   }, 2500);}
    },
  }
}

export default getState
