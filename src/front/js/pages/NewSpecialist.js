import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/NewPatient.css';


const NewSpecialist = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPhysio, setIsPhysio] = useState(false)
    const [isNurse, setIsNurse] = useState(false)

    //Dinamizations states
    const [clickedFristName, setClickedFirstName] = useState(false)
    const [clickedLastName, setClickedLastName] = useState(false)
    const [clickedEmail, setClickedEmail] = useState(false)
    const [clickedPassword, setClickedPassword] = useState(false)


    // Inputs dinamization

    const handlerClickFirstName = () => {
        setClickedFirstName(false)
    }
    const handlerBlurFirstName = () => {
        if (!firstName.trim()) {
            setClickedFirstName(true);
        }
    }

    const handlerClickLastName = () => {
        setClickedLastName(false)
    }
    const handlerBlurLastName = () => {
        if (!lastName.trim()) {
            setClickedLastName(true);
        }
    }

    const handlerClickEmail = () => {
        setClickedEmail(false)
    }
    const handlerBlurEmail = () => {
        if (!email.trim()) {
            setClickedEmail(true);
        }
    }

    const handlerClickPassword = () => {
        setClickedPassword(false)
    }
    const handlerBlurPassword = () => {
        if (!password.trim()) {
            setClickedPassword(true);
        }
    }





    //Buttons dinamizations
    const handlerPhysioChange = async () => {
        setIsPhysio(true);
        setIsNurse(false)
    }

    const handlerNurseChange = async () => {
        setIsNurse(true);
        setIsPhysio(false)
    }

    const handlerCreateSpecialist = async () => {
        try {
            if (firstName == "" || lastName == "" || email == "" || password == "" || (!isPhysio && !isNurse)) {
                alert("Todos los campos son requeridos")
                return
            }

            // let newInputSpecialist = {
            //     first_name: firstName,
            //     last_name: lastName,
            //     email: email,
            //     passsword: password,
            //     is_physiotherapist: isPhysio,
            //     is_nurse: isNurse,
            //     certificate: null,
            //     description: null,
            //     language: null


              let newInputSpecialist ={
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                is_physiotherapist: isPhysio,
                is_nurse: isNurse,
                certificate: null,
                description: null,
                language: null

              }  
            
            
            await actions.createNewSpecialist(newInputSpecialist)
            navigate("/")

        } catch (error) {
            console.error("There was an error creating the specialist user", error)
        }
    }



    return (
        <div className='patientForm'>
            <div className='title'>
            <h1>Bienvenido especialista!</h1>
            <p className='subTitle'>Por favor, introduce tus datos para registrarte</p>
            </div>
           
            <div className="mb-3">

                <input onChange={(e) => setFirstName(e.target.value)} onClick={handlerClickFirstName} onBlur={handlerBlurFirstName} type="firstName" className="form-control" id="exampleFormControlInput1" placeholder="Nombre" />
                {clickedFristName && (<p className='errorMsg'>* El nombre es obligatorio *</p>)}
            </div>

            <div className="mb-3">
                <input onChange={(e) => setLastName(e.target.value)} onClick={handlerClickLastName} onBlur={handlerBlurLastName} type="lastName" className="form-control" id="exampleFormControlInput2" placeholder="Apellido" />
                {clickedLastName && (<p className='errorMsg'>* El apellido es obligatorio *</p>)}
            </div>

            <div className="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} onClick={handlerClickEmail} onBlur={handlerBlurEmail} type="email" className="form-control" id="exampleFormControlInput3" placeholder="Correo electrónico" />
                {clickedEmail && (<p className='errorMsg'>* El correo electrónico es obligatorio *</p>)}
            </div>

            <div>
                <input onChange={(e) => setPassword(e.target.value)} onClick={handlerClickPassword} onBlur={handlerBlurPassword} placeholder='Contraseña' type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    
                </div>
            </div>
            <div className='speciality'>
                <div className="form-check form-check-inline">
                    <input onChange={handlerPhysioChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    <label className="form-check-label" for="inlineRadio1">Fisioterapeuta</label>
                </div>
                <div className="form-check form-check-inline">
                    <input onChange={handlerNurseChange} className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label className="form-check-label" for="inlineRadio2">Enfermero/a</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                    <label className="form-check-label" for="inlineRadio3">Psycologist (Comming soon)</label>
                </div>
            </div>
            <br></br>

        <div className='createNewBtn'>
        
                <button onClick={handlerCreateSpecialist} type="button" className="btn btn-success">Crear</button>
            

            <Link to={'/signup'}>
                    <button type="button" className="btn btn-outline-primary exitBtn">Salir</button>
                </Link>


        </div>
           
        </div>
    )
}

export default NewSpecialist