import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/contactUs.css";


export const FormCONTACT = () => {

    const [state, setState] = useState({
        //initialize state here
    });

    // activamos el useNavigate
    // const navigate = useNavigate();

    const { store, actions } = useContext(Context)

    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("")

    async function handleContact(e) {
        e.preventDefault()
        console.log(email, password);
        let logged = await actions.login(email, password);
        console.log(logged)
        if (logged) { //true
            navigate("/");
        } else {
            toast.error("Invalid email or password");
        }
        // if (email )
    }

    return (
    

            <form className="stylebackgrounding d-flex flex-column justify-content-center h-100 align-items-center text-secondary p-5 mt-3" >
                <div className="d-flex col-12 col-sm-6 col-md-8 col-lg-4 mb-5">
                    
                    <div className="d-block pr-3 me-5 col-6">
                        <h1 className="poiret-one-regular">Contact Us</h1>
                        <span className="poiret-one-regular">Your well being is our priority. If you have questions, suggestions, or simply want to share your experience, we are here to listen. Connect with us and let us be part of your journey towards inner peace and harmony. </span>
                        <div className="mt-5">
                            <div>
                                <i className="fa-solid fa-envelope fa-lg me-2"></i>
                                <span className="poiret-one-regular">info@oceanofom.com</span>
                            </div>
                            <div>
                                <i className="fa-solid fa-phone fa-lg"></i>
                                <span className="poiret-one-regular">÷34 610234567</span>
                            </div>
                           
                        </div>
                       
                       
                        <div className="mt-5">
                            <div>
                                <p className="mb-2 poiret-one-regular">Follow us on</p>
                            </div>
                        <div>
                            <i className="fa-brands fa-xl fa-twitter m-1 " style={{ color: "#9b9d85" }}></i>
                            <i className="fa-brands fa-xl fa-instagram m-1" style={{ color: "#9b9d85" }}></i>
                            <i className="fa-brands fa-xl fa-facebook m-1" style={{ color: "#9b9d85" }}></i>
                        </div>
                        </div>
                    </div>
                    
                    {/* onChange={(e) => setUserEmail(e.target.value)}
                    onChange={(e) => setPassword(e.target.value)} */}

                <div className="d-block col-6 mt-5">
                    <div className="d-block">
                        <div className="mb-1 text-start">
                            <label className="form-label poiret-one-regular">Email</label>
                            <input type="email" className="form-control inputEmail" id="exampleInputEmail1" aria-describedby="emailHelp"  />
                           
                        </div>
                        <div className="mb-1 text-start">
                            <label className="form-label poiret-one-regular">Name</label>
                            <input type="name" className="form-control inputEmail"  />
                        </div>
                    </div>
                    <div>
                            <label className="form-label poiret-one-regular">How can we help you?</label>
                            <input className="form-control inputComment inputEmail" id="exampleInputPassword1" />
                            <button type="submit" className="btn btn-outline-secondary w-50 mt-3 poiret-one-regular fs-5">Send</button>
                    </div>

                   

                        
                   
                    {/* <div className="d-flex flex-column justify-content-center">
                        <p className=" fw-light mb-0 text-decoration-none"><Link to="/singup" className="link-secondary">Don't have an acount?</Link></p>
                        <p className=" fw-light"><Link to="#" className="link-secondary fw-light mt-0">Forgot password?</Link></p>

                    </div> */}
                </div>

                </div>
            </form>
      
    );
};