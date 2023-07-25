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


        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5 text-center" id="staticBackdropLabel"><strong>Identify</strong></h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label" required>Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"></input>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="inlineFormCheck"></input>
                    <label class="form-check-label" for="inlineFormCheck">
                      Remember me
                    </label>
                  </div>
                  <a class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Check Account</a>
                  </a>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Log In</button>
              </div>
            </div>
          </div>
        </div>
      </div>



    </nav>
  );
};

export default Navbar;