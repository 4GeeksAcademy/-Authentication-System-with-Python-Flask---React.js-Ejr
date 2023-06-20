import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate()

    const handleClick = () => {
        event.preventDefault()
        actions.signup(email, pass, name, lastName).then(() => {
            navigate("/login")
        })
    }

    return (
        <>
            <h1>SignUp</h1>
            <div className="d-flex justify-content-center mt-5">
                <form className="">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Lastname</label>
                        <input type="password" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </>
    )
}