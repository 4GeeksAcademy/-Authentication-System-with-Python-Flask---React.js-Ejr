import React from "react";
import { FaHandPointDown } from "react-icons/fa";
import { Link } from "react-router-dom";


function Registros() {


    return (
        <div className="container my-3 mb-3 col-8">
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                <div className='card border border-success mb-3 col-12'>
                    <div className='card-body '>
                        <p className="card-text">Si eres empresa <FaHandPointDown /></p>
                    </div>
                    <div className='mt-1 mb-3'>
                        <Link to="/registro-empresa">
                            <button type='submit' className=' btn btn-success'>
                                Registrarse como empresa
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='card border border-success mb-3 col-12'>
                    <div className='card-body '>
                        <p className="card-text">Si eres casino <FaHandPointDown /></p>
                    </div>
                    <div className='mt-1 mb-3'>
                        <Link to="/registro-casino">
                            <button type='submit' className=' btn btn-success'>
                                Registrarse como casino
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='card border border-success mb-3 col-12'>
                    <div className='card-body '>
                        <p className="card-text">Si perteneces a una empresa que contrató a Casino Corporativo <FaHandPointDown /></p>
                    </div>
                    <div className='mt-1 mb-3'>
                        <Link to="/register">
                            <button type='submit' className=' btn btn-success'>
                                Registrarse como usuario
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registros;



