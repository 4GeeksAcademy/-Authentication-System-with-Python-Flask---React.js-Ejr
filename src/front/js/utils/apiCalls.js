const API_URL = process.env.BACKEND_URL + 'api'

async function makeRequest(url, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const response = await fetch(API_URL + url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    const newError = new Error(data.message)
    newError.httpStatus = response.status
    newError.missing_values = response.missing_values
    throw newError
  }
  return data
}

export async function login(email, password) {
  const response = await makeRequest('/login', 'POST', {
    email,
    password,
  })
  return response
}

export async function signup(
  email,
  password,
  first_name,
  last_name,
  phone,
  location,
  address,
  payment_method
) {
  const response = await makeRequest('/signup', 'POST', {
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    location: location,
    address: address,
    payment_method: payment_method,
  })

  return response
}

export async function validateToken(token) {
  const user = await makeRequest('/validate-token', 'POST', null, token)
  return user
}

export async function createProduct(
  name,
  price,
  description,
  color,
  type,
  category_id,
  // sizes,
  image_url,
  token
) {
  const response = await makeRequest(
    '/products',
    'POST',
    {
      name: name,
      price: price,
      description: description,
      color: color,
      type: type,
      category_id: category_id,
      // sizes: sizes,
      image_url: image_url,
    },
    token
  )

  return response
}

export async function getFavorites(token) {
  const response = await makeRequest('/users/favorites', 'GET', null, token)

  return response
}

export async function postFavorites(token, product_id) {
  const response = await makeRequest(
    '/users/favorites/' + product_id,
    'POST',
    null,
    token
  )
  return response
}

export async function deleteFavorites(token, product_id) {
  const response = await makeRequest(
    '/users/favorites/' + product_id,
    'DELETE',
    null,
    token
  )
  return response
}

export async function getProductByID(id) {
  const response = await makeRequest(`/products/${id}`, 'GET', null)
  return response
}