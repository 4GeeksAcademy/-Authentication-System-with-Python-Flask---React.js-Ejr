import React from "react";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#d3d3d3' }}>
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            backgroundImage: `url(https://uc68bb29a58af4b878b52eeeee1d.previews.dropboxusercontent.com/p/thumb/ACV2ffXL4xzTWd-luSq6HeNXxU0KzglJcBObKMDD4HgwFqfUuDyfDXImFme5_zH-0gli7UaLYPc0iLk5bnYKOI47NIR4obQIWugMg-XyS5NVASaDr9OFeSKHWuPAyOWYBBvXr8w8_BRV4kGpg8AWnOfnsmCWGWLuTWspHsuJBmjNxwx-7izYxpGfxM1cRKQPHx-36Ey1scVmLlVcg8WCPuryl4cM3WeIQdROLz7uhrgsr1XBXVdioRyA021KxeRXa-t0E7vzZVBQbUpG-fRsn80hhhTStTEESdEZXFN4nb7qnw8IuiBe6TYLigEwDG3qaapXIv-YIQ1zacNl6dW5oewy3umyVQY7AR8gKMF0iSEmwg/p.png)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '50px',
            width: '50px',
            display: 'block',
            textIndent: '-9999px'
          }}
        >
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" style={{ color: 'black' }}>
                Discover events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: 'black' }}>
                Gallery
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'black' }}>
                Registrarse
              </a>
              <ul className="dropdown-menu dropdown-menu-end"> 
                <li><a className="dropdown-item" href="#">Registrarse/iniciar sesión como usuario</a></li>
                <li><a className="dropdown-item" href="#">Registrarse/iniciar sesión como partner</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
