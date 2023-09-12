import React from 'react';

const IntroView = () => {
  return (
    <div className="jumbotron container">
  <div className="jumbotron d-flex align-items-center">
    <div className="jumbotron-content">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 style={{ textAlign: "left" }}>
              <strong>Powerful <span style={{"color":"#FD5812"}}>components</span> for your website</strong>
            </h1>
            <ol style={{ textAlign: "left" }}>
              <li>Hundreds of quality components & templates</li>
              <li>All consistent, well-documented, reliable</li>
              <li>Super simple, 1-minute installation</li>
              <li>Easy theming and customization</li>
            </ol>
          
            <div className="d-flex">
              <button type="button" className="btn btn-info mx-3 text-white" > <strong>How to use it</strong></button>
              <button type="button" className="btn btn-warning text-white"> <strong>Pricing </strong></button>
            </div>
          </div>
          <div className="col-md-6">
            <img src="https://img.freepik.com/vector-gratis/ilustracion-abstracta-diseno_335657-5136.jpg?w=1380&t=st=1694535047~exp=1694535647~hmac=a042455731652a926d2084d147ef0b682bea07095fe7faa127140e3b75369eceN" alt="Descripción de la imagen" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default IntroView;