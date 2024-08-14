import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/perfil.css";

function Perfil() {
  return (
   <div className='perfil'>
    <div className='perfil__side-content'>
      <h2>Mi perfil!</h2>
      <img src="https://picsum.photos/200/300"/>
      <span>Datos Personales</span>
      <span>Metodos de pago</span>
    </div>
    <div className='perfil__divider'></div>
      <div className='perfil__main-content'>
      <form class="row g-3"/>
      <div class="col-12">
      <label for="inputName" class="form-label">Name</label>
      <input type="text" class="form-control" id="inputName"/>
    </div>
    <div class="col-12">
      <label for="inputLastName" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="inputLastName"/>
    </div>
      <form class="row g-3">
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input type="email" class="form-control" id="inputEmail4"/>
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Password</label>
      <input type="password" class="form-control" id="inputPassword4"/>
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">Address</label>
      <input type="text" class="form-control" id="inputAddress"/>
    </div>
    <div class="col-md-6">
      <label for="inputCity" class="form-label">City</label>
      <input type="text" class="form-control" id="inputCity"/>
    </div>
    <div class="col-md-6">
      <label for="inputState" class="form-label">State</label>
      <input type="text" class="form-control" id="inputState"/>
    </div>
    <div class="col-md-2">
      <label for="inputZip" class="form-label">Zip Code</label>
      <input type="text" class="form-control" id="inputZip"/>
    </div>
    <div class="col-12">
      <div class="form-check">
       <input class="form-check-input" type="checkbox" id="gridCheck"/>
       <label class="form-check-label" for="gridCheck">
        Check me out
       </label>
      </div>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Sign in</button>
    </div>
  </form>

    </div>
    </div>
  );
}

export default Perfil;
