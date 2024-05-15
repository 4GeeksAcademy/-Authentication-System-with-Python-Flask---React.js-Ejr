import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const Private = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions } = useContext(Context);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Realizar cualquier lógica necesaria para la vista privada
        actions.Private(); // Ejemplo de una acción para la vista privada
    };

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Private;
