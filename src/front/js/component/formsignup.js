import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

let stylebackgroundimg = {
    backgroundColor: "#FBF9F1",
    //  backgroundImage: `url("https://www.sattology.com/wp-content/uploads/2020/06/simbolo-do-om-ornamental_1058-101.jpg")`,
    backgroundImage: `url("https://res.cloudinary.com/dx23woi99/image/upload/v1708370471/om_1_cmnuza.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "95% 15%",
    backgroundSize: "20%",
}

export const FormSignup = () => {
    const [state, setState] = useState({
        //initialize state here
    });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [date_of_birth, setDate_of_birth] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const { store, actions } = useContext(Context)

    async function handleFormSignup(e) {
        e.preventDefault()
        console.log(name, lastname, date_of_birth, email, password, confirmPassword);
        let logged = await actions.formsignup(name, lastname, date_of_birth, email, password, confirmPassword);
        console.log(logged)
        if (logged) {
            true
            navigate("/")
        }
    }

    return (
        <form className="container d-flex flex-column h-100 opacity-50 ms-5 text-center " style={stylebackgroundimg} onSubmit={handleFormSignup}>
            <h1 style={{ fontFamily: 'Poiret one' }}>New Practitioner</h1>
            <div className="d-flex justify-content-center">
                <div className="col-12 col-sm-6 col-lg-4 ">
                    <div className="card-body">
                        <div className="mt-5 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">Your beautiful first name</label>
                            <input type="name" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-1 text-start">
                            <label htmlFor="exampleInputLastName1" className="form-label">The last name someone gave you</label>
                            <input type="lastname" className="form-control" id="exampleInputLastName1" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="mb-1 text-start">
                            <label htmlFor="exampleInputDate_of_birth1" className="form-label">The date came to life</label>
                            <input type="date_of_birth" className="form-control" id="exampleInputDate_of_birth1" onChange={(e) => setDate_of_birth(e.target.value)} />
                        </div>
                        <div className="mb-1 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">Your best email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column mt-5 align-items-center col-12 col-sm-6 col-lg-4">
                    <div className="card-body mt-5 text-start d-flex flex-column justify-content-center my-auto">
                        <label htmlFor="exampleInputPassword1" className="form-label">A password you would always remember</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="exampleInputConfirmPassword1" className="form-label">Again, just in case</label>
                        <input type="confirmpassword" className="form-control" id="exampleInputConfirmPassword1" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit" className="btn btn-outline-secondary w-50 mt-3">Sign Up</button>
                    </div>
                </div>
            </div>

            <h1 className="mt-5">Thank you a feel warmly welcomed</h1>

        </form>
    );
};
