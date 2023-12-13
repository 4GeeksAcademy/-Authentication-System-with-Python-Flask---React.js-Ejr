import React from 'react'

const NewSpecialist = () => {
    return (
        <div className='specialistForm'>
            <h2>Bienvenido espcialista</h2>
            <p>Por favor, introduce tus datos</p>
            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Nombre</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Nombre" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Apellido</label>
                <input type="email" className="form-control" id="exampleFormControlInput2" placeholder="Apellido" />
            </div>

            <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Correo electónico</label>
                <input type="email" className="form-control" id="exampleFormControlInput3" placeholder="name@example.com" />
            </div>

            <div>
                <label for="inputPassword5" className="form-label">Contraseña</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label class="form-check-label" for="inlineRadio1">Fisioterapeuta</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label class="form-check-label" for="inlineRadio2">Enfermero/a</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled />
                <label class="form-check-label" for="inlineRadio3">Psycologist (Comming soon)</label>
            </div>

            <div>
            <button type="button" class="btn btn-primary">Crear</button>
            </div>
            

        </div>
    )
}

export default NewSpecialist