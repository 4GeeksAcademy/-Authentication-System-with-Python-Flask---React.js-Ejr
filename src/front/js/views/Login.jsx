import React, {useState, useContext} from 'react'
import {Context} from "../store/appContext"


const Login = () => {
    const {store,actions}=useContext(Context)
    const [data, setData] = useState({})
    const handlerInput = (e) =>{

      let value = e.target.value
      setData({...data, [e.target.name]:value}) 
    }
    const handlerSubmit = async() =>{
      try { 
        await actions.login(data)
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <form>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" onChange={handlerInput} name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" onChange={handlerInput} name="password" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" onClick={handlerSubmit} className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Login