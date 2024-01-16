import React, { useRef, useState } from 'react'
import { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'


export const Signup = () => {

  const {store,actions}=useContext(Context)
  
  const [signup, setSignup]=useState(store.formSignup)

  const goToLogin=useNavigate()
  const formRef= useRef (null)

  const handleInputForm = (value,name)=>{

    setSignup({...signup,[name]:value})

  }

  const handleSubmit = async (formSignup)=>{
    try{
      console.log(formSignup)
      await actions.signupNewUser(formSignup)
      alert(`The user  was created succesfully`)
      formRef.current.reset()
      setSignup(store.formSignup)
      goToLogin("/login")
    }
    catch(e){
      console.log("An error was occurred, check it out", e)
    }
  }

  return (
    <div className='container-form'>
        <form 
        ref={formRef}
        id='contact-form' className='form-signup'
        onSubmit={(e) => { e.preventDefault(); handleSubmit(signup); }}>
            <h6>Signup</h6>
            <label className='label-signup' for="email">Email:</label>
            <input className='input-signup' type="email" id="email" name="email" onChange={(e)=>(handleInputForm(e.target.value, e.target.name))} required/>

            <label className='label-signup' for="password">Password:</label>
            <input className='input-signup' type="password" id="password" name="password"  onChange={(e)=>(handleInputForm(e.target.value, e.target.name))} required/>

            <button className="button-signup" type="button" onClick={()=>handleSubmit(signup)}>Sign Up</button>
        </form>
        <div className='goHome-login'>
            <Link to="/">Go to Home</Link>
            </div>
    </div>
  )
}