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

    const handleChangeEmpleador = (e) => {

        setEditEmpleador({ ...editEmpleador, [e.target.name]: e.target.value })
    }

    const handleChangeProgramador = (e) => {
        setEditProgramador({ ...editProgramador, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (editEmpleador.cif === undefined) {
            actions.editUser(editProgramador, "Programador", token)
            setEdit(true)
        } else {
            actions.editUser(editEmpleador, "Empleador", token)
            setEdit(true)
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
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" name='name' value={editProgramador.name} onChange={handleChangeProgramador} id="name" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" name='username' value={editProgramador.username} onChange={handleChangeProgramador} id="username" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" name='email' value={editProgramador.email} onChange={handleChangeProgramador} id="email" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pais" className="form-label">Pais</label>
                                        <input type="text" className="form-control" name='country' value={editProgramador.country} onChange={handleChangeProgramador} id="pais" disabled={edit} />

                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                        <input type="text" className="form-control" name='descripcion' value={editProgramador.descripcion} onChange={handleChangeProgramador} id="descripcion" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="experiencia" className="form-label">Experiencia</label>

                                        <input type="text" className="form-control" name='experiencia' value={editProgramador.experiencia} onChange={handleChangeProgramador} id="experiencia" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="precio_hora" className="form-label">Precio hora</label>
                                        <input type="number" className="form-control" name='precio_hora' value={editProgramador.precio_hora} onChange={handleChangeProgramador} id="precio_hora" disabled={edit} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tecnologias" className="form-label">Tecnologias</label>
                                        <input type="text" className="form-control" name='tecnologias' value={editProgramador.tecnologias} onChange={handleChangeProgramador} id="tecnologias" disabled={edit} />


                                    </div>
                                    
                                </>)}
                        {store.empleador && (
                            <>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" name='name' value={editEmpleador.name} onChange={handleChangeEmpleador} id="name" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" name='username' value={editEmpleador.username} onChange={handleChangeEmpleador} id="username" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" name='email' value={editEmpleador.email} onChange={handleChangeEmpleador} id="email" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pais" className="form-label">Pais</label>
                                    <input type="text" className="form-control" name='country' value={editEmpleador.country} onChange={handleChangeEmpleador} id="pais" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cif" className="form-label">Cif</label>
                                    <input type="text" className="form-control" name='cif' value={editEmpleador.cif} onChange={handleChangeEmpleador} id="cif" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                    <input type="text" className="form-control" name='descripcion' value={editEmpleador.descripcion} onChange={handleChangeEmpleador} id="descripcion" disabled={edit} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="metodo_pago" className="form-label">Metodo_pago</label>
                                    <input type="text" className="form-control" name='metodo_pago' value={editEmpleador.metodo_pago} onChange={handleChangeEmpleador} id="metodo_pago" disabled={edit} />

                                </div>
                            </>
                        )}


                        {store?.editar &&(
                            <div class="alert alert-success" role="alert">{store.msg}</div>
                        )}


                        <div className='row'>
                            <button onClick={() => setEdit(false)} type="button" className="btn btn-primary w-25 mx-2">Editar</button>
                            <button type="submit" className="btn btn-primary w-25">Guardar</button>
                        </div>
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
                    <Link to={"/user"}>
                    <button>Ir a la pagina del perfil correcto</button>
                    </Link>
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
                                    <button className='btn btn-primary'>Crear Oferta</button>
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