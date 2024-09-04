import React from 'react'
import "../../styles/formContactPostulados.css"

const Form_Contact_Postulados = () => {
    return (
        <div className='contenedor'>
            <div className='intro'>Contactar con el postulado</div>

            <form id="formPostulado" class="topBefore">

                <input id="name" type="text" placeholder="NAME" />
                <input id="email" type="text" placeholder="E-MAIL" />
                <textarea id="message" type="text" placeholder="MESSAGE"></textarea>
                <input id="submit" type="submit" value="ENVIAR!" />

            </form>
        </div>
    )

}
export default Form_Contact_Postulados