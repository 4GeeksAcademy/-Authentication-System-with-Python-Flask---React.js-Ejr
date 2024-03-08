import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/footer.css'

const Footer = () => {
  // Función para manejar la redirección
  const redirectTo = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-dark text-light py-4 footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 ayuda">
            <h5>Ayuda</h5>
            <button onClick={() => redirectTo('/sobre-nosotros')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">Sobre Nosotros</button>
            <button onClick={() => redirectTo('/recomendadores')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">Quiénes son los "Recomendadores"</button>
            <button onClick={() => redirectTo('/aviso-privacidad')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-block">Aviso de privacidad</button>
            <button onClick={() => redirectTo('/anuncios')} className="btn btn-link text-decoration-none text-secondary p-0 d-block">Anuncios en la página</button>
          </div>
          <div className="col-md-4 unete">
            <h5>Únete a Nuestras Noticias</h5>
            <p>Recibe las mejores recomendaciones, noticias y más directamente en tu correo electrónico.</p>
            <button className="btn btn-primary">Únete a las Noticias</button>
          </div>
          <div className="col-md-4 siguenos">
            <h5>Síguenos</h5>
            <div>
			<a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
			{' | '}
                            <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
							{' | '}
                            <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
							{' | '}
                            <a href="#!" className="text-secondary me-2"><FontAwesomeIcon icon={faTiktok} size="lg" /></a>
							{' | '}
                            <a href="#!" className="text-secondary"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
            </div>
          </div>
        </div>
        <div className="border-top border-secondary mt-3 pt-3 text-center text-secondary">
		<button onClick={() => redirectTo('/politica-privacidad')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Política de Privacidad</button>
          {' | '}
          <button onClick={() => redirectTo('/terminos')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Términos y Condiciones</button>
          {' | '}
          <button onClick={() => redirectTo('/aviso-cookies')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Aviso de Cookies</button>
          {' | '}
          <button onClick={() => redirectTo('/noticias')} className="btn btn-link text-decoration-none text-secondary p-0 mb-2 d-inline">Noticias</button>
          <p>Copyright © Recomiéndame un Libro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
