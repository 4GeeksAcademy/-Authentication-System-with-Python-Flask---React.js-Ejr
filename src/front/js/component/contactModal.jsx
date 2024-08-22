import React, { useState } from "react";
import "../../styles/contact_modal.css"

export const ContactModal = () => {
    const [formData, setFormData] = useState({
        contactEmail: '',
        asunto: '',
        descripcion: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
        console.log(formData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(process.env.BACKEND_URL + '/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = resp.json()
            if(!resp.ok){
                const errorMsg = data.msg
                throw new Error(errorMsg)
            }
            return { success : true }
        } catch (error) {
            console.error('Error enviando el formulario', error.message)
            return { success: false, msg: error.message}
        }
    }

	return(

        <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-3">ShareTrips</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className=" text-center">
                            <h1 className="action fs-5 text-black">Contacto</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="text-start">
                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="contactEmail" className="form-label text-black">Email</label>
                                <input onChange={handleChange} type="email" className="form-control rounded-pill" name="contactEmail" id="contactEmail" required/>
                            </div>

                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="asunto" className="form-label text-black">Asunto</label>
                                <input onChange={handleChange} type="text" className="form-control rounded-pill" name="asunto" id="asunto" required/>
                            </div>

                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="descripcion" className="form-label text-black">Descripción</label>
                                <textarea onChange={handleChange} className="form-control" id="descripcion" name="descripcion" rows="4" required></textarea>
                            </div>
                            <div className="text-center">
                            <button
                                        style={{background: '#257895'}} 
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

    );
};