import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(148, 163, 82)'}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://i.ibb.co/C1sDhjs/White-Black-Minimalist-Logo-Distro-Fashion-6.jpg" width="70" height="65" alt="Logo"></img>
        </a>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">

              <a className="nav-link btn" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">LogIn</a>
            </li>


            <li className="nav-item dropstart">
              <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              &#9776;
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#">Avisos/Notificaciones</a></li>
                <li><a className="dropdown-item" href="#">Ofertas Favoritas</a></li>
                <li><a className="dropdown-item" href="#">Explora tu siguiente trip</a></li>
                <li><a className="dropdown-item" href="#">Help</a></li>
                <li><a className="dropdown-item" href="#">LogOut</a></li>
              </ul>
            </li>
          </ul>
        </div>


        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identify</strong></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" required>Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"></input>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="inlineFormCheck"></input>
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                      Remember me
                    </label>
                  </div>
                  
                    <a className="nav-link active" aria-current="page" href="#">Check Account</a>
                  
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>



    </nav>
  );
};

export default Navbar;