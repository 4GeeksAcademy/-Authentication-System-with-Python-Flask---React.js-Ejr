import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/social.css';

const Social = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    }
    return (
        <div className="social-page">
        <header className="social-header">
            <h1>Conéctate con Nosotros</h1>
        </header>
        
        <section className="social-links">
            <h2>Síguenos en Redes Sociales</h2>
            <ul>
                <li>
                    <a href="https://www.facebook.com/4geeksacademylatinoamerica/" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </a>
                </li>
                <li>
                    <a href="https://x.com/i/flow/login?redirect_after_login=%2F4geeksacademy" target="_blank" rel="noopener noreferrer">
                        Twitter
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/4geeksacademylatam/?hl=es" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                </li>
            </ul>
        </section>

        <section className="testimonials">
            <h2>Testimonios</h2>
            <div className="testimonial">
                <p>"Este sitio me ha ayudado a mejorar mi salud de manera significativa. ¡Recomiendo sus servicios al 100%!"</p>
                <p>- Cliente Satisfecho</p>
            </div>
            <div className="testimonial">
                <p>"El equipo es muy profesional y sus recomendaciones son muy útiles. Gracias por todo."</p>
                <p>- Otro Cliente Satisfecho</p>
            </div>
        </section>
        
        <button className="go-home-button" onClick={handleGoHome}>
            Volver a Inicio
        </button>
        
        <footer className="social-footer">
            <p>&copy; 2024 Nutrición Saludable. Todos los derechos reservados.</p>
        </footer>
    </div>
);
}

export default Social;