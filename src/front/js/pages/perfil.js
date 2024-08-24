import React, { useState } from 'react'

const perfil = () => {

    return (
        <div className='container'>
            <div className='row border border-black my-5'>
                <form>
                    <div className='col'>
                        <div className="mb-3">
                            <label for="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" />
                          
                        </div>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" />
                          
                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" />
                          
                        </div>
                        <div className="mb-3">
                            <label for="pais" className="form-label">Pais</label>
                            <input type="text" className="form-control" id="pais" />
                          
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className='row'>
                <div className='col'>cuerpo/acciones del empleador ---
                    <div className='row'>
                        <div className='col'>ofertas y en ellas ver postulados</div>
                        <div className='col'>ofertas</div>
                        <div className='col'>ofertas</div>
                        <div className='col'>ofertas</div>
                        <div className='col'>ofertas</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default perfil