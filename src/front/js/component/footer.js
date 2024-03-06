import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Ayuda</h5>
                        <ul className="list-unstyled">
                            <li><a href="#!" className="text-decoration-none text-secondary">Sobre Nosotros</a></li>
                            <li><a href="#!" className="text-decoration-none text-secondary">Quiénes son los "Recomendadores"</a></li>
                            <li><a href="#!" className="text-decoration-none text-secondary">Aviso de privacidad</a></li>
                            <li><a href="#!" className="text-decoration-none text-secondary">Anuncios en la página</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Únete a Nuestras Noticias</h5>
                        <p>Recibe las mejores recomendaciones, noticias y más directamente en tu correo electrónico.</p>
<button className="btn btn-primary">Únete a las Noticias</button>
</div>
<div className="col-md-3">
<h5>Síguenos</h5>
<div>
<a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
<a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
<a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
<a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTiktok} size="lg" /></a>
<a href="#!" className="text-secondary"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
</div>
</div>
</div>
<div className="border-top border-secondary mt-3 pt-3 text-center text-secondary">
<p>Politicas de Privacidad | Terminos y Politicas | Aviso de Cookies | Noticias | Anuncios</p>
<p>Copyright © Recomiendame un Libro. Todos los derechos reservados.</p>
</div>
</div>
</footer>
);
};

export default Footer;
