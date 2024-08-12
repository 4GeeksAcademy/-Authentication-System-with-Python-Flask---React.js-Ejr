import React, { useContext, useState } from 'react'
import { Context } from "../store/appContext";
import "../../styles/RegisterLogin_modal.css";
 


export const LoginRegister = () => {
    const { store, actions } = useContext(Context);
	const [register, setRegister] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
	}
    return (
        <>
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-0 rounded-4">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 logo">ShareTrips</h1>
                            <button type="button" className="btn-close me-1" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className=" text-center">
                                <h1 className="action fs-5">{!register? 'Iniciar sesión' : 'Crear cuenta'}</h1>
                            </div>
                            <form action="submit" className="">
                                <div className="w-75 mx-auto mt-3 input-group-sm">
                                    <label htmlFor="email" className="ms-2">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        className="form-control rounded-pill input-sm mx-auto mt-1" 
                                        required
                                    />
                                </div>
                                <div className="w-75 mx-auto mt-2 input-group-sm">
                                    <label htmlFor="password" className="ms-2">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        className="form-control rounded-pill mx-auto mt-1" 
                                        required
                                    />
                                </div>
                                {register === true ? (
                                    <>
                                        <div className="w-75 mx-auto mt-2 input-group-sm">
                                            <label htmlFor="passwordConfirm" className="ms-2">Repetir contraseña</label>
                                            <input 
                                                type="password" 
                                                id="passwordConfirm" 
                                                name="passwordConfirm" 
                                                className="form-control 
                                                rounded-pill mx-auto mt-1" 
                                                required
                                            />
                                        </div>
                                        <div className="w-75 mx-auto mt-2 input-group-sm">
                                            <label htmlFor="username" className="ms-2">Nombre de usuario</label>
                                            <input 
                                                type="text" 
                                                id="username" 
                                                name="username" 
                                                className="form-control rounded-pill mx-auto mt-1" 
                                                required
                                            />
                                        </div>
                                    </>
                                    ) : null}
                                {!register? <p className="mt-2 mb-0 w-75 mx-auto text-secondary">
                                                <span>¿Has olvidado tu contraseña?</span>
                                            </p> 
                                            : null}
                                <p className="mt-0 w-75 mx-auto text-secondary">
                                    <span onClick={() => setRegister(!register)}>
                                        {!register? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}
                                    </span>
                                </p>
                                <div className="text-center">
                                    <button
                                        onClick={handleSubmit} 
                                        style={{background: '#257895'}} 
                                        type="submit" 
                                        className="btn btn-primary mt-2 my-3 rounded-pill px-3 mx-auto"
                                    >
                                        {!register ? 'Iniciar sesión' : 'Crear cuenta'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}