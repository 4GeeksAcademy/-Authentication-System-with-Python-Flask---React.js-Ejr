import React from 'react';

function UserProfile() {
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row"></div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">John Smith</h5>
                <p className="text-muted mb-1">Participante</p>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-primary">
                    Configurar perfil
                  </button>
                  <button type="button" className="btn btn-outline-primary ms-1">
                    Administrar equipos
                  </button>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                {/* Contenido del perfil */}
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Nombre completo</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">JohnSmith@TechSports.com</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Télefono</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Móvil</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">(098) 765-4321</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Dirección</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Nombre del equipo</th>
                  <th>Torneo</th>
                  <th>Fecha de registro</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: '45px', height: '45px' }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Equipo juvenil</p>
                        <p className="text-muted mb-0">Colombia</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Colombia</p>
                
                  </td>
                  <td>
                    13/11/2023
                  </td>
                 
                  <td>$75</td>
                 
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                        className="rounded-circle"
                        alt=""
                        style={{ width: '45px', height: '45px' }}
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Equipo varonil 3</p>
                        <p className="text-muted mb-0">Nevada</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Las vegas</p>
                  </td>
                  <td>
                   <p>13/11/2024</p>
                  </td>
                  <td>$50</td>
                  
                </tr>
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                        className="rounded-circle"
                        alt=""
                        style={{ width: '45px', height: '45px' }}
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">Equipo campeones</p>
                        <p className="text-muted mb-0">San José</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">Costa Rica</p>
                   
                  </td>
                  <td>
                    <p> 13/11/2025</p>
               
                  </td>
                  <td>80$</td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
