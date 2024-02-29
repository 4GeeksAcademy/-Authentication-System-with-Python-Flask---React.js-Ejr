import React, { useState, useContext } from 'react'
import "../../styles/login.css"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')
  

  const { actions } = useContext(Context)

  let navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      location === ""
    ) {
      actions.showNotification("Complete all fields", "danger");
    } else {

    actions
      .signup(
        email,
        password,
        firstName,
        lastName,
        phone,
        location,
      )

       

      .then((res) =>{ navigate('/login')
      actions.showNotification(res.message,"success")
    })
      .catch((error) => {
        
       actions.showNotification(error.message,"danger")
      })
  }
}



  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit}>
    <div >
      <h1>Sign-up</h1>
      
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            id='email'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            id='password'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>First Name</label>
          <input
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            className='form-control'
            id='firstName'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Last Name</label>
          <input
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            className='form-control'
            id='lastName'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Phone</label>
          <input
            type='text'
            onChange={(e) => setPhone(e.target.value)}
            className='form-control'
            id='Phone'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Location</label>
          <input
            type='text'
            onChange={(e) => setLocation(e.target.value)}
            className='form-control'
            id='location'
          />
        </div>
        <button
          style={{ cursor: 'pointer' }}
          type='submit'
          className='btn btn-success'
        >Create account</button>
      
      <div className='mb-3 pt-5  mx-auto'>
        <h5
          className='text-center'
          style={{ cursor: 'pointer' }}
          onClick={handleLogin}
        >If you already have an account go to Login
        </h5>
      </div>
    </div>
    </form>
  )
}

export default Signup