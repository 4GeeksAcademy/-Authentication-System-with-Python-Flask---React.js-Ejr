import React, { Component } from "react";

export const Footer = () => (
    
    <footer className="text-center text-lg-start border mt-xl-5 pt-4" >
     <div className="container-fluid">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4" style={{"color":"#FD5812"}}> <strong>OUR WORLD</strong></h5>
            <ul className="list-unstyled mb-4">
              <li>
                <a href="#aboutus" className="text-dark">About us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Collections</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Environmental philosophy</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Artist collaborations</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4" style={{"color":"#FD5812"}}> <strong>Assistance</strong></h5>
            <ul className="list-unstyled mb-4">
              <li>
                <a href="#!" className="text-dark">Contact us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Size Guide</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Shipping Information</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Returns & Exchanges</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-uppercase mb-4" style={{"color":"#FD5812"}}> <strong>Sign up to our newsletter</strong></h5>
            <div className="form-outline form-white mb-4">
              <input type="email" id="form5Example2" placeholder="Email address" className="form-control" />
            </div>
            <button type="submit" class="btn btn-outline-light" style={{"backgroundColor": "#FD5812", "color": "white"}} data-mdb-ripple-color="dark">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="text-center p-3 border-top border-white" style={{"color":"#FD5812"}}>
        © 2023 Copyright:
        <a className="text-dark" href="" > Componentify.com</a>
      </div>
       </div>
    </footer>
 
);
