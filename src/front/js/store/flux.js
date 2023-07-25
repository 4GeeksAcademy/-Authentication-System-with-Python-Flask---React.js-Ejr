const getState = ({ getStore, getActions, setStore }) => {
  const API_URL = process.env.BACKEND_URL + 'api'

  return {
    store: {
      user: {},
    },
    actions: {
      login: async (email, password) => {
        try {
          const response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })

          if (response.ok) {
            const data = await response.json()

            localStorage.setItem('myToken', data.access_token)
            setStore({ user: data.user })
            console.log(data.user)
            return data
          } else if (response.status === 401) {
            return false
          }
        } catch (err) {
          console.log(err)
          return false
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
        try {
         
          if (!userEmail || !userPassword || !firstName || !lastName || !phone || !location || !address || !paymentMethod) {
            return { error: 'Todos los campos son obligatorios.' };
          }
          const response = await fetch(API_URL + '/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userEmail,
              password: userPassword,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              location: location,
              address: address,
              payment_method: paymentMethod,
            }),
          })

          if (response.ok) {
            console.log(response)
            console.log('Succefully created user')
            return response
          } else if (response.status === 401) {
            return ('error: ' + response.status)
          }
        } catch (err) {
          console.log(err);
          // Devolver un objeto que indica un error general
          return { error: 'error:' + err };
        }
      },

      logout: () => {
        let token = localStorage.getItem('myToken')
        return token != null ? true : false
      },
    },
  }
}

export default getState
