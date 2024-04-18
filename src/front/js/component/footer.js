import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="footer-section-1 col-md-4">
          <h5>Urban Treasures</h5>
          <p>Explore the best urban treasures with us.</p>
        </div>
        <div className="footer-section-2 col-md-4">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section-3 col-md-4">
          <h5>Follow Us</h5>
          <div className="social-links">
            <a href="https://instagram.com"><FaInstagram /></a>
            <a href="https://twitter.com"><FaTwitter /></a>
            <a href="https://facebook.com"><FaFacebookF /></a>
            <a href="https://linkedin.com"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center pt-4">
          <p>© 2024 Urban Treasures. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
);
