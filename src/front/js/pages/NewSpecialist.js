import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate, useSearchParams } from 'react-router-dom'


const NewSpecialist = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPhysio, setIsPhysio] = useState(false)
    const [isNurse, setIsNurse] = useState(false)

    const handlerPhysioChange = async () => {
        setIsPhysio(true);
        setIsNurse(false)
    }

    const handlerNurseChange = async () => {
        setIsNurse(true);
        setIsPhysio(false)
    }

    const handlerCreateSpecialist = async () => {
        try{
            if(firstName == "" || lastName == ""|| email == "" || password == "" || (!isPhysio && !isNurse)){
                alert("Todos los campos son requeridos")
                return
            }

            let newInputSpecialist = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                isPhysio: isPhysio,
                isNurse: isNurse
            }
            await actions.createNewSpecialist(newInputSpecialist)
            navigate("/")

        }catch(error){
            console.error("There was an error creating the specialist user", error)
        }
    }



    return (
        <div className='specialistForm'>
            <h2>Bienvenido especialista</h2>
            <p>Por favor, introduce tus datos para registrarte</p>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                <input onChange={(e)=>setFirstName(e.target.value)} type="firstName" className="form-control" id="exampleFormControlInput1" placeholder="Nombre" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Apellido</label>
                <input onChange={(e)=>setLastName(e.target.value)} type="lastName" className="form-control" id="exampleFormControlInput2" placeholder="Apellido" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Correo electónico</label>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput3" placeholder="name@example.com" />
            </div>

            <div>
                <label for="inputPassword5" className="form-label">Contraseña</label>
                <input onChange={(e)=>setPassword(e.target.value)} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <div class="form-check form-check-inline">
                <input onChange={handlerPhysioChange} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label class="form-check-label" for="inlineRadio1">Fisioterapeuta</label>
            </div>
            <div class="form-check form-check-inline">
                <input onChange={handlerNurseChange} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">Enfermero/a</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                <label class="form-check-label" for="inlineRadio3">Psycologist (Comming soon)</label>
            </div>

            <div>
            <button onClick={handlerCreateSpecialist} type="button" class="btn btn-primary">Crear</button>
            </div>
            

        </div>
    )
}

export default NewSpecialist