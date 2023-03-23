import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3">
      <div className="container text-center">
        <p className="footer-text">
          &copy; {currentYear} Game Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
