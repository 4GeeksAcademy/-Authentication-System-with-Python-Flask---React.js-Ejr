import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate} from "react-router-dom";
import "../../styles/index.css";

export const Signup = () => {

    const [inputEmail, setInputEmail]=useState("")
    const [inputPassword, setInputPassword]=useState("")
    const [signupError,setSignupError] = useState(false);
   
	const navigate = useNavigate();
    const {actions } = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault()
        let isSignup = await actions.signup(inputEmail, inputPassword) 
        if (isSignup){
            console.log('Signup successful');
            navigate("/Login");    // url del home aqui con navigate
        } else {
            setSignupError(true);
            console.log('Signup failed');
        }
    };
    return (
        <div className="contactForm">
            <h1 className="title">Signup</h1>
            <form onSubmit={handleSubmit}>
                 <div className="mb-3">
                     <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'brown' }}>Email</label>
                     <input type="email" className="form-control" id="exampleInputEmail1" placeholder="enter your email" onChange={(e) => setInputEmail(e.target.value)} />
                 </div>
                 {/* <div className="mb-3">
                     <label htmlFor="exampleInputName" className="form-label" style={{ color: 'orange' }}>Name</label>
                     <input type="text" className="form-control" id="exampleInputName" placeholder="enter your name" name='name' value={inputName} onChange={(e) => setInputName(e.target.value)} />
                 </div> */}
                 <div className="mb-3">
                     <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'brown' }}>Password</label>
                     <input type="password" className="form-control" id="exampleInputPassword" placeholder="xxxxxxx" onChange={(e) => setInputPassword(e.target.value)} />
                 </div>
                 {signupError ? <div className="text-danger mb-3">Wrong email or password</div> : null}
                 <button type="submit" className="login btn btn-dark">Signup</button>
            </form>
        </div>
    )
};