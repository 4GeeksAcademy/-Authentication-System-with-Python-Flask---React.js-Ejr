import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();
  const onLogout = () => {
    history.push("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Investor</span>
        </Link>
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
            <li>
              <Link to="/company_register">
                <a className="nav-link">Empresas</a>
              </Link>
            </li>
            {!store.token ? (
              <>
                <li>
                  <Link to="/register">
                    <a className="nav-link ">Registrate</a>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <a className="nav-link">Ingresar</a>
                  </Link>
                </li>
                <li>
                  <Link to="/company_login">
                    <a className="nav-link ">Ingreso Empresa</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">
                    <a onClick={() => actions.logout()} className="nav-link ">
                      Salir
                    </a>
                  </Link>
                </li>
              </>
            )}
            {store.currentUser != null ? (
              <>
                <li>
                  <Link to="/user_home">
                    <a className="nav-link">Proyectos</a>
                  </Link>
                </li>
                <li>
                  <Link to="/user_profile">
                    <a className="nav-link">Perfil</a>
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            {store.currentCompany != null ? (
              <li>
                <Link to="/company_dashboard">
                  <a className="nav-link">Tus Proyectos</a>
                </Link>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </nav>

    // <nav className="navbar navbar-light bg-light">
    //   <div className="container">
    //     <Link to="/">
    //       <span className="navbar-brand mb-0 h1">Investor</span>
    //     </Link>
    //     <Link to="/company_register">
    //       <a className="nav-link">Empresas</a>
    //     </Link>
    //     <div className="ml-auto">
    //       {!store.token ? (
    //         <>
    //           <Link to="/register">
    //             <button className="btn btn-success mx-5">Registrate</button>
    //           </Link>
    //           <Link to="/login">
    //             <button className="btn btn-success">Ingresar</button>
    //           </Link>
    //           <Link to="/company_login">
    //             <button className="btn btn-success mx-5">
    //               Ingreso Empresa
    //             </button>
    //           </Link>
    //         </>
    //       ) : (
    //         <Link to="/">
    //           <button
    //             onClick={() => actions.logout()}
    //             className="btn btn-success mx-5"
    //           >
    //             Salir
    //           </button>
    //         </Link>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};
