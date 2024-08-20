import React, { useState } from 'react'

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const handleChange = (e) => {
        setEmail(e.target.value)
        console.log(email)
    }

    return (
        <div className="modal fade ejemplo" id="forgot-password" aria-hidden="true" aria-labelledby="retrieve-password" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="retrieve-password">ShareTrips</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className=" text-center">
                            <h1 className="action fs-5 text-black">
                            Recuperar contraseña
                            </h1>
                        </div>
                        <form action="" className="">
                            <div className="w-75 mx-auto mt-3 input-group-sm">
                                <label htmlFor="recoveryEmail" className="ms-2">
                                    Email
                                </label>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="recoveryEmail"
                                    name="recoveryEmail"
                                    className="form-control rounded-pill input-sm mx-auto mt-1"
                                    required
                                />
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    onClick={handleSubmit}
                                    style={{ background: "#257895" }}
                                    type="submit"
                                    className="btn btn-primary mt-2 my-3 rounded-pill px-3 mx-auto"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}