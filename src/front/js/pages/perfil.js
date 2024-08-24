import React, { useState, useContext } from 'react'
import { Context } from "../store/appContext";
const perfil = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className='container'>
            <div className='row border border-black my-5'>
                <form>
                    <div className='col'>
                        <div className="mb-3">
                            <label for="name" className="form-label">Name</label>
                            <input type="text" className="form-control" value={store.user?.name} id="name" />

                        </div>
                        <div className="mb-3">
                            <label for="username" className="form-label">Username</label>
                            <input type="text" className="form-control" value={store.user?.username} id="username" />

                        </div>
                        <div className="mb-3">
                            <label for="email" className="form-label">Email</label>
                            <input type="email" className="form-control" value={store.user?.email} id="email" />

                        </div>
                        <div className="mb-3">
                            <label for="pais" className="form-label">Pais</label>
                            <input type="text" className="form-control" value={store.user?.country} id="pais" />

                        </div>
                        {store.programador
                            && (
                                <>
                                    <div className="mb-3">
                                        <label for="descripcion" className="form-label">Descripcion</label>
                                        <input type="text" className="form-control" value={store.programador?.descripcion} id="descripcion" />

                                    </div>
                                    <div className="mb-3">
                                        <label for="experiencia" className="form-label">Experiencia</label>
                                        <input type="text" className="form-control" value={store.programador?.experiencia} id="experiencia" />

                                    </div>
                                    <div className="mb-3">
                                        <label for="precio_hora" className="form-label">Precio hora</label>
                                        <input type="number" className="form-control" value={store.programador?.precio_hora} id="precio_hora" />

                                    </div>
                                    <div className="mb-3">
                                        <label for="tecnologias" className="form-label">Tecnologias</label>
                                        <input type="text" className="form-control" value={store.programador?.tecnologias} id="tecnologias" />

                                    </div>
                                </>)}
                        {store.empleador && (
                            <>
                                <div className="mb-3">
                                    <label for="cif" className="form-label">Cif</label>
                                    <input type="text" className="form-control" value={store.empleador?.cif} id="tecnologias" />

                                </div>
                                <div className="mb-3">
                                    <label for="descripcion" className="form-label">Descripcion</label>
                                    <input type="text" className="form-control" value={store.empleador?.descripcion} id="descripcion" />

                                </div>
                                <div className="mb-3">
                                    <label for="metodo_pago" className="form-label">Metodo_pago</label>
                                    <input type="text" className="form-control" value={store.descripcion?.metodo_pago} id="metodo_pago" />

                                </div>
                            </>
                        )}


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