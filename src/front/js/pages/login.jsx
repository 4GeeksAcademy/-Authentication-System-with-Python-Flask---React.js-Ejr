import React from 'react';
import LogLogin from '../../img/LogLogin.png';

const Login = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#272932', fontFamily: 'Poppins' }} className="d-flex flex-column">
            <div className="row no-gutters flex-fill">
                {/* Columna derecha con la imagen, que ahora se muestra primero en pantallas pequeñas */}
                <div className="col-12 col-md-6 p-0 d-flex align-items-center justify-content-center order-first order-md-last">
                    <img 
                        src={LogLogin} 
                        alt="LogLogin" 
                        style={{ objectFit: 'cover', width: '92%', height: '100%' }}
                    />
                </div>

                            {/* Columna izquierda */}
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start px-3 px-md-5">
                    <h1 className="text-center text-md-start" style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '600', textAlign: 'start',  paddingTop: '20px'  }}>
                        Find friends and play together <br /> today!
                    </h1>
                    <h2 style={{ color: '#8C67F6', fontSize: '36px', fontWeight: '700', marginTop: '20px', textAlign: 'center' }}>
                        LOGIN
                    </h2>

                    <form className="w-75 mt-4 text-start">
                        {/* Campo Email */}
                        <div className="form-group">
                            <label style={{ color: '#FFFFFF', fontSize: '20px', textAlign: 'start' }}>
                                Email Address
                            </label>
                            <input 
                                type="email"
                                className="form-control"
                                style={{
                                    backgroundColor: '#1A1C26',
                                    color: '#FFFFFF',
                                    fontSize: '20px',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    border: 'none'
                                }} 
                            />
                        </div>

                        {/* Campo Password */}
                        <div className="form-group mt-3">
                            <label style={{ color: '#FFFFFF', fontSize: '20px' }}>
                                Password
                            </label>
                            <input 
                                type="password"
                                className="form-control"
                                style={{
                                    backgroundColor: '#1A1C26',
                                    color: '#FFFFFF',
                                    fontSize: '20px',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    border: 'none'
                                }} 
                            />
                        </div>

                        {/* Botón Login */}
                        <button 
                            className="btn mt-5 w-100"
                            style={{
                                background: 'linear-gradient(90deg, #8C67F6 0%, #523C90 100%)',
                                color: '#FFFFFF',
                                fontSize: '20px',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none'
                                
                            }}
                        >
                            Login
                        </button>

                        {/* Texto "Don’t have an account? Register" */}
                        <div className="mt-3  text-center text-md-start">
                            <span  style={{ color: '#FFFFFF', fontSize: '20px' }}>
                                Don’t have an account?
                            </span>
                            <span className="d-block d-md-inline" style={{ color: '#8C67F6', fontSize: '20px', marginLeft: '10px', cursor: 'pointer' }}>
                                Register
                            </span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Login;
