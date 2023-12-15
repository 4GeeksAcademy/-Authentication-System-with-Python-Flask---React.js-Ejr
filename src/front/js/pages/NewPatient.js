import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/NewPatient.css';


const NewPatient = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Dinamizations states
    const [clickedFristName, setClickedFirstName] = useState(false)
    const [clickedLastName, setClickedLastName] = useState(false)
    const [clickedEmail, setClickedEmail] = useState(false)
    const [clickedPassword, setClickedPassword] = useState(false)



    //Funciones para dinamizmos de inputs

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






    //Funcion para crear usuario
    const handlerCreatePatient = async () => {
        try {
            if (firstName == "" || lastName == "" || email == "" || password == "") {
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
        } catch (error) {
            console.error("Error trying to send info", error)
        }


    }

    return (
        <div className='patientForm'>
             <div className='title'>
            <h1>Bienvenido paciente!</h1>
            <p className='subTitle'>Por favor, introduce tus datos para registrarte</p>
            </div>
            <div className="mb-3">
                <input onChange={(e) => setFirstName(e.target.value)} onClick={handlerClickFirstName} onBlur={handlerBlurFirstName} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Nombre" />
                {clickedFristName && (<p className='errorMsg'>* El nombre es obligatorio *</p>)}
            </div>

            <div className="mb-3">
                <input onChange={(e) => setLastName(e.target.value)} onClick={handlerClickLastName} onBlur={handlerBlurLastName} type="email" className="form-control" id="exampleFormControlInput1" placeholder="Apellido" />
                {clickedLastName && (<p className='errorMsg'>* El apellido es obligatorio *</p>)}
            </div>

            <div className="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} onClick={handlerClickEmail} onBlur={handlerBlurEmail} type="email" className="form-control" id="exampleFormControlInput1" placeholder=" Correo electrónico" />
                {clickedEmail && (<p className='errorMsg'>* El correo electrónico es obligatorio *</p>)}

            </div>

            <input onChange={(e) => setPassword(e.target.value)} onClick={handlerClickPassword} onBlur={handlerBlurPassword} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Contraseña' />
            {clickedPassword && (<p className='errorMsg'>* La contraseña es obligatoria *</p>)}
            <br></br>

            {/* <div>
                <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="progress">
                    <div class="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="progress">
                    <div class="progress-bar bg-danger" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div> */}

            <div className='createNewBtn'>
                <button onClick={handlerCreatePatient} type="button" className="btn btn-success saveBtn">Crear</button>

                <Link to={'/signup'}>
                    <button type="button" className="btn btn-outline-primary exitBtn">Salir</button>
                </Link>
            </div>

        </div>
    )
}

export default NewPatient