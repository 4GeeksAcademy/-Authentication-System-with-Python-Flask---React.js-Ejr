import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'
const NewPatient = () => {
    const navigate = useNavigate()
    const {store, actions} = useContext(Context)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handlerCreatePatient = async () => {
        try{ 
            if(firstName == "" || lastName == "" || email == "" || password == ""){
                alert("Todos los campos son requeridos")
                return
            }
            
            
            let newInputPatient = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password 
        }
        await actions.createNewPatient(newInputPatient) 
        navigate("/") //---------------------------->Colocar ruta creada por Leo ATENCION <------------------------------------
    }catch(error){
        console.error("Error trying to send info", error)
    }
    
       
    }

    return (
        <div className='patientForm'>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">First Name</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Last Name</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <label for="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </div>

            <div>
                <button onClick={handlerCreatePatient} type="button" class="btn btn-primary">Crear</button>
            </div>

        </div>
    )
}

export default NewPatient