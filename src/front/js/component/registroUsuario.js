// Vamos a utilizar el Context y useContext para vincular el componente Signup de registroUsuario.js con el método POST del archivo flux.js
import React, { useState, useContext } from 'react';
// El useNavigate me sirve para cambiar de vista cuando haga alguna acción en el componente.
// Por ejemplo, si pulso un botón de enviar formulario en el componente y quiero que me devuelva a la ventana de inicio 
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {actions} = useContext(Context);  

    // e se refiere a evento: hacer clic en un botón (onClick, handleSubmit), enviar un formulario, o escribir en un campo de entrada 
    // la funcion handleSubmit estará vinculada al flux.js En este caso al método SignUp   
    const handleSubmit = (e) => {
        e.preventDefault();    
        actions.SignUp(email, password);
        // navigate('/home');   Aquí podríamos poner a dónde queremos que se redirija el navegador después de registrar el usuario
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1"
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Signup;
