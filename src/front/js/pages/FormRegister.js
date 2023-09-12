import React, {useContext} from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router'

const Registro = () => {

    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    return (
        <div className="container col-md-4 my-3 shadow p-0">
            <form className="form-control shadow p-3 " onSubmit={(e) => actions.submitRegister(e, navigate)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu nombre"
                        maxLength="12"
                        minLength="3"
                        required
                        name={'name'}
                        value={store.newUser.name}
                        onChange={actions.handleChange}
                    
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Apellido
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu apellido"
                        maxLength="12"
                        minLength="3"
                        required
                        name={'lastname'}
                        value={store.newUser.lastname}
                        onChange={actions.handleChange}
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa tu email"
                        required
                        pattern="/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/"
                        name={'email'}
                        value={store.newUser.email}
                        onChange={actions.handleChange}
                    

                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña"
                        required
                        name={'password'}
                        value={store.newUser.password}
                        onChange={actions.handleChange}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Repetir Contraseña
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="re_password"
                        placeholder="Repita contraseña"
                        required
                        name={'rep_password'}
                        value={store.newUser.rep_password}
                        onChange={actions.handleChange}
                    
                    />
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">
                        Region
                    </label>
                    <select className="form-select" required >
                        
                        <option selected="" >Selecciona region...</option>
                        <option value={1}>I</option>
                        <option value={2}>II</option>
                        <option value={3}>III</option>
                        <option value={4}>IV</option>
                        <option value={5}>V</option>
                        <option value={6}>VI</option>
                        <option value={7}>VII</option>
                        <option value={8}>VIII</option>
                        <option value={9}>IX</option>
                        <option value={10}>X</option>
                        <option value={11}>XI</option>
                        <option value={12}>XII</option>
                        <option value={13}>XIII</option>
                        <option value={14}>XIV</option>
                        <option value={15}>XV</option>
                        <option value={16}>RM</option>
                    </select>
                </div>
                <div className="my-3 form-check">
                    <input type="checkbox"
                        className="form-check-input"
                        id="Check1" required
                    
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        Acepto términos y condiciones
                    </label>
                </div>
                <button type="submit" className="btn btn-primary my-3">
                    Registrarse
                </button>
            </form>
        </div>
    )
}

export default Registro


//jssolar