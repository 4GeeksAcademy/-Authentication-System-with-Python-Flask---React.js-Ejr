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
        await actions.createNewUser(newInputPatient) 
        navigate("/") //---------------------------->Colocar ruta creada por Leo ATENCION <------------------------------------
    }catch(error){
        console.error("Error trying to send info", error)
    }
    
       
    }

    return (
        <div className='patientForm'>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                <input onChange={(e)=>setFirstName(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Apellido</label>
                <input onChange={(e)=>setLastName(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Correo electronico</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>

            <label for="inputPassword5" className="form-label">Contraseña</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
            <div id="passwordHelpBlock" className="form-text">
                Tu contraseña debe tener de 8-20 caracteres, letras y numeros y no debe contener caracteres epeciales o emojis
            </div>

            <div>
                <button onClick={handlerCreatePatient} type="button" class="btn btn-primary">Crear</button>
            </div>

        </div>
    )
}

export default NewPatient