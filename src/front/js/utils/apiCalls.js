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
  userEmail,
  userPassword,
  firstName,
  lastName,
  phone,
  location,
  address,
  paymentMethod
) {
  const response = await makeRequest('/signup', 'POST', {
    email: userEmail,
    password: userPassword,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
    location: location,
    address: address,
    payment_method: paymentMethod,
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
      imageUrl,
      token
) {
  const response = await makeRequest('/products', 'POST', {
    name: name,
    price: price,
    description: description,
    color: color,
    type: type,
    category_id: category_id,
    // sizes: sizes,
    imageUrl: imageUrl,
  } , token)

  return response
}
