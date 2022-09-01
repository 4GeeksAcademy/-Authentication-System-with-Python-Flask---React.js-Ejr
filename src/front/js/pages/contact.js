import React from "react";
import ramses from "../../img/ramsesprofile.jpg";
import alejandro from "../../img/alejandroprofile.jpg";
import roberto from "../../img/robertoprofile.jpg";
const Contact = () => {
  return (
    <div className="container">
    <div className="card mb-3 w-100" id="card-one"> 
      <div className="row g-0">
        <div className="col-md-4">
          <img src={ramses} className="img-fluid rounded-start" alt="..." id="imgprofile" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Ramses Cevallos</h5>
            <p className="card-text">
            Full-Stack Web Developer & Cofundador de Dogger
            </p>
            <p className="card-text">
              <small className="text-muted">Ramses@dogger.com</small>
            </p>
            <p className="card-text">
              <small className="text-muted">México</small>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="card mb-3 w-100" id="card-one"> 
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Alejandro Manco</h5>
            <p className="card-text">
            Full-Stack Web Developer & Cofundador de Dogger
            </p>
            <p className="card-text">
              <small className="text-muted">Alejandro@dogger.com</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Venezuela</small>
            </p>
          </div>
        </div>
        <div className="col-md-4 d-md-flex justify-content-md-end">
          <img src={alejandro} className="img-fluid rounded-start" alt="..." id="imgprofile" />
        </div>
      </div>
    </div>

    <div className="card mb-3 w-100" id="card-three"> 
      <div className="row g-0">
        <div className="col-md-4">
          <img src={roberto} className="img-fluid rounded-start" alt="..." id="imgprofile" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Roberto Lopez</h5>
            <p className="card-text">
            Full-Stack Web Developer & Cofundador de Dogger
            </p>
            <p className="card-text">
              <small className="text-muted">Roberto@dogger.com</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Costa Rica</small>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Contact;