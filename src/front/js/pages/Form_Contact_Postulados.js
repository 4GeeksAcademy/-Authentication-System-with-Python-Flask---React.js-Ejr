import React, { useContext, useState } from 'react'
import "../../styles/formContactPostulados.css"
import { Context } from '../store/appContext';
const Form_Contact_Postulados = () => {

    const { store } = useContext(Context);
    const [formData, setFormData] = useState({ name: `${store.user?.name}`, email: `${store.user?.email}`, mensaje: "" })
    const [error, setError] = useState(false)

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if ([formData.mensaje].includes("")) {
            setError(true)
            return
        }
        else {
            console.log(formData)
            //aquí poner el correo de mailjs
        }

    }


    return (
        <div>
            <section className='seccion-form text-center'>
                <h1 >CONTACTAR CON EL POSTULADO</h1>
                <div className="form-contact-postulados ">
                    {error && (
                        <div className="alert alert-warning" role="alert">
                            El campo del mensaje está vacío, para continuar debes rellenar el mensaje.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} >
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" disabled /> Poner el value de programador seleccionad
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-user-group"></i>
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" disabled /> Poner el value de programador seleccionado
                        </div>

                        <div className="input-field">
                            <i className="fas fa-at"></i>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" disabled />  Poner el value de programador seleccionad
                        </div>

                        <div className="input-field">
                            <i className="fas fa-pen"></i>
                            <label className='mb-5' htmlFor="mensaje">Mensaje</label>
                            <textarea name="mensaje" rows="20" length="500" value={formData.mensaje} onChange={handleOnChange} required></textarea>
                        </div>

                        <div className="btn-block">
                            <button className="btn" type="submit"><i className="fas fa-paper-plane"></i>ENVIAR</button>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    )

}
export default Form_Contact_Postulados