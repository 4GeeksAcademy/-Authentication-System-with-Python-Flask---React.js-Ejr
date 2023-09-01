import React from 'react';
import '../../styles/LoginForm.css'

function LoginForm() {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <div className='Login-container'>
            <form action="procesar_iniciar_sesion.php" method="post">
                <div className='input-box'>
                <label htmlFor="username">Nombre de Usuario o Correo Electrónico:</label>
                <input type="text" id="username" name="username" required />
                </div>
                <div className='input-box'>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />
                </div>
                <div className='check-box'>
                    <div id='checkboxx'>
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember">Recordarme</label>
                    </div>
                
                <input type="submit" value="Iniciar Sesión" />
                </div>
        </form>
            </div>
          
        </div>
    );
}

export default LoginForm;
