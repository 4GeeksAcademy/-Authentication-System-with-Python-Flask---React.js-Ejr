import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";



const LogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState("");
  const { store, actions } = useContext(Context);
  let navigate = useNavigate()

  async function handleLog(e) {
    e.preventDefault();
    let isLogged = await actions.login(email, password);
    console.log("is Logged:", isLogged);
    if (isLogged) {
      // Connexion réussie
      navigate("/");
    } else {
      // Connexion échouée
      setLoginError("Email and/or password incorrect");
    }
  }

  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identify</strong></h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLog}>
              <div className="mb-3">
                <label htmlFor="emaillog" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emaillog" aria-describedby="emailHelp" onChange={e => setEmail(e.target.value)} required></input>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="pass" className="form-label" required>Password</label>
                <input type="password" className="form-control" id="pass" onChange={(e) => setPassword(e.target.value)}></input>
              </div>

              <Link to='/signup' > <span data-bs-dismiss="modal">Don't you have an account? Click here</span></Link>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary"><span data-bs-dismiss="modal">Log In</span>  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn