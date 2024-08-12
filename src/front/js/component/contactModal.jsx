import React from "react";
import "../../styles/contact_modal.css"

export const ContactModal = () => {

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
                        <form action="submit" className="text-start">
                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="email" className="form-label text-black">Email</label>
                                <input type="email" className="form-control rounded-pill" name="email" id="email" required/>
                            </div>

                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="asunto" className="form-label text-black">Asunto</label>
                                <input type="text" className="form-control rounded-pill" name="asunto" id="asunto" required/>
                            </div>

                            <div className="mb-3 w-75 mx-auto">
                                <label htmlFor="description" className="form-label text-black">Descripción</label>
                                <textarea className="form-control" id="description" name="description" rows="4" required></textarea>
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