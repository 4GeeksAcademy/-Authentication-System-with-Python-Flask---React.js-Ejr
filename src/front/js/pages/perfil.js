import React, { useState, useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
const perfil = () => {
    const { store, actions } = useContext(Context);
    const [edit, setEdit] = useState(true)
    const [editProgramador, setEditProgramador] = useState({
        name: store.user?.name,
        username: store.user?.username,
        email: store.user?.email,
        country: store.user?.country,
        descripcion: store.programador?.descripcion,
        experiencia: store.programador?.experiencia,
        precio_hora: store.programador?.precio_hora,
        tecnologias: store.programador?.tecnologias,

    })

    const [editEmpleador, setEditEmpleador] = useState({
        name: store.user?.name,
        username: store.user?.username,
        email: store.user?.email,
        country: store.user?.country,
        cif: store.empleador?.cif,
        descripcion: store.empleador?.descripcion,
        metodo_pago: store.empleador?.metodo_pago
    })

    const handleChange = (e) => {
        setEditProgramador({ ...editProgramador, [e.target.name]: e.target.value })
        setEditEmpleador({ ...editEmpleador, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        console.log(token)
        if (editEmpleador.cif === undefined) {
            actions.editUser(editProgramador, "Programador", token)
        } else {
            actions.editUser(editEmpleador, "Empleador", token)
        }
    }

    return (
        <div className='container'>
            <div className='row border border-black my-5'>
                <form onSubmit={handleSubmit}>
                    <div className='col'>

                        {store.programador
                            && (
                                <>
                                    <div className="mb-3">
                                        <label for="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={editProgramador.name} onChange={handleChange} id="name" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" name='username' value={editProgramador.username} onChange={handleChange} id="username" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" name='email' value={editProgramador.email} onChange={handleChange} id="email" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="pais" className="form-label">Pais</label>
                                        <input type="text" className="form-control" name='country' value={editProgramador.country} onChange={handleChange} id="pais" disabled={edit} />

                                    </div>

                                    <div className="mb-3">
                                        <label for="descripcion" className="form-label">Descripcion</label>
                                        <input type="text" className="form-control" name='descripcion' value={editProgramador.descripcion} onChange={handleChange} id="descripcion" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="experiencia" className="form-label">Experiencia</label>
                                        <input type="text" className="form-control" name='experiencia' value={editProgramador.experiencia} onChange={handleChange} id="experiencia" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="precio_hora" className="form-label">Precio hora</label>
                                        <input type="number" className="form-control" name='precio_hora' value={editProgramador.precio_hora} onChange={handleChange} id="precio_hora" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label for="tecnologias" className="form-label">Tecnologias</label>
                                        <input type="text" className="form-control" name='tecnologias' value={editProgramador.tecnologias} onChange={handleChange} id="tecnologias" disabled={edit} />

                                    </div>
                                </>)}
                        {store.empleador && (
                            <>

                                <div className="mb-3">
                                    <label for="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name='name' value={editEmpleador.name} onChange={handleChange} id="name" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" name='username' value={editEmpleador.username} onChange={handleChange} id="username" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name='email' value={editEmpleador.email} onChange={handleChange} id="email" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="pais" className="form-label">Pais</label>
                                    <input type="text" className="form-control" name='country' value={editEmpleador.country} onChange={handleChange} id="pais" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="cif" className="form-label">Cif</label>
                                    <input type="text" className="form-control" name='cif' value={editEmpleador.cif} onChange={handleChange} id="cif" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="descripcion" className="form-label">Descripcion</label>
                                    <input type="text" className="form-control" name='descripcion' value={editEmpleador.descripcion} onChange={handleChange} id="descripcion" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label for="metodo_pago" className="form-label">Metodo_pago</label>
                                    <input type="text" className="form-control" name='metodo_pago' value={editEmpleador.metodo_pago} onChange={handleChange} id="metodo_pago" disabled={edit} />

                                </div>
                            </>
                        )}

                        <button onClick={() => setEdit(false)} type="button" class="btn btn-primary">Editar</button>
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>

                </form>
            </div>
            {store.programador && (
                <div className='row border'>
                    <div className='col'>Acciones del programador
                        <div className='row border'>
                            <div className='col'>Proyectos</div>
                        </div>

                        <div className='row border'>
                            <div className='col'>Favoritos</div>
                        </div>
                    </div>
                </div>
            )}
            {store.empleador && (


                <div className='row border'>
                    <div className='col'>Acciones del empleador
                        <div className='row border'>
                            <div className='col'>ofertas y en ellas ver postulados</div>
                        </div>

                        <div className='row border'>
                            <div className='col'>
                                <Link to={"/formoffer"} >
                                <button  className='btn btn-primary'>Crear Oferta</button>
                                </Link>
                                </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default perfil