import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { AiFillFacebook } from 'react-icons/ai';
import { FaHandPointDown } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';


function Footer() {

  return (
    <footer className=' bg-success text-light text-center pt-3'>
      <h6>© Casino Corporativo <FontAwesomeIcon icon={faSeedling} /> 2022  </h6>
      <p>¡Síguenos en nuestras redes sociales! <FaHandPointDown /></p>
      <button className='btn btn-secondary me-3 text-dark border-warning bg-warning rounded-circle'><AiFillFacebook />  </button>
      <button className='btn btn-secondary text-dark border-warning bg-warning rounded-circle'> <AiOutlineInstagram /> </button>
    </footer>
  );
}

export default Footer
