import React from 'react'
import '../css/navbar.css'

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Book-Market</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
            <a className="nav-link" href="#">Book sales</a>
            <a className="nav-link" href="#">Book exchange</a>
            <a className="nav-link" href='#'>Best sellers</a>
            <a id='login' className="nav-link active" href='#'>Sing In / Login</a>
          </div>
        </div>
      </div>
    </nav>
  )
}