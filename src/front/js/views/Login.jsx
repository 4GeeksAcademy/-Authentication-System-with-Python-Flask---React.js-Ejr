import React, { useState, useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router'
import Navbar from "../component/Navbar.jsx";


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { actions } = useContext(Context)

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    actions
      .login(email, password)
      .then((res) => navigate('/home'))
      // actions.handleRefreshClick())
      .catch((err) => {
        alert('Incorrect user/password')
        console.log(err)
        console.log(err.httpStatus)
      })
  }

  

  const handleRedirect = () => {
    navigate('/signup')
  }

  return (
    <div>
      <Navbar />
      <h1 className='mx-auto p-5 text-center' style={{ fontSize: '3rem' }}>
        Welcome Back!
      </h1>
      <form className='card w-75 mx-auto mb-5' onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            <h5>Email address</h5>
          </label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
          />
        </div>
        <div className='m-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            <h5>Password </h5>
          </label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            id='exampleInputPassword1'
          />
        </div>
        <button type='submit' className='btn btn-success  mx-auto m-3'>
          Enter
        </button>
      </form>
      <h5
        className='mt-3 card w-75 mx-auto'
        style={{ cursor: 'pointer' }}
        onClick={handleRedirect}
      >
        You haven't account? Click Here to Register!
      </h5>
    </div>
  )
}

export default Login;
