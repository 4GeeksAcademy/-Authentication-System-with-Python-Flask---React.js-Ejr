import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { element } from "prop-types";
//I imported useNavigate

export const Navbar = () => {
  //we have to initiate useNavigate
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  //onClick handler for the signout button
  const handleSignout = (event) => {
    //resets store/token authentication and sends user home
    actions.signOut();

    //here useNavigate is used to go back to the home page
    //need to add pop up to confirm that user did sign out
    navigate("/");
  };

  return (
    // <div className="col-2">
    //   <nav className="navbar m-2 rounded">
    //     <ul className="nav navbar-nav">
    //       <li className="nav-item cutesiefy">
    //         <Link to="/" className="nav-link">
    //           Home
    //         </Link>
    //       </li>
    //       {
    //         //conditionally render based on if user is verified
    //         store.verifiedUser ? (
    //           <li className="nav-item cutesiefy big">
    //             <Link to="/user" className="nav-link">
    //               Personal Portal
    //             </Link>
    //           </li>
    //         ) : (
    //           <></>
    //         )
    //       }
    //       {
    //         //conditionally render based on if user is NOT verified
    //         !store.verifiedUser ? (
    //           <>
    //             <li className="nav-item cutesiefy">
    //               <Link to="/login" className="nav-link">
    //                 Login
    //               </Link>
    //             </li>
    //             <li className="nav-item cutesiefy big">
    //               <Link to="/create" className="nav-link">
    //                 Create account
    //               </Link>
    //             </li>
    //           </>
    //         ) : (
    //           <></>
    //         )
    //       }
    //       <li className="nav-item cutesiefy">
    //         <Link to="/about" className="nav-link">
    //           About Us
    //         </Link>
    //       </li>
    //       <li className="nav-item cutesiefy">
    //         <Link to="/donate" className="nav-link">
    //           Donate
    //         </Link>
    //       </li>
    //       {
    //         //conditionally render based on if user is verified
    //         store.verifiedUser ? (
    //           <li
    //             className="nav-item nav-link cutesiefy"
    //             onClick={handleSignout}
    //           >
    //             Sign Out
    //           </li>
    //         ) : (
    //           <></>
    //         )
    //       }
    //     </ul>
    //   </nav>
    // </div>
    // nav justify-content-center
    // <ul class="navbar navbar-expand-lg bg-light">
    //   <span class="navbar-text">WORDSWORD</span>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/">
    //       Home
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/login">
    //       Log in
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/create">
    //       Create account
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/about">
    //       Aboiut us
    //     </Link>
    //   </li>
    //   <li class="nav-item">
    //     <Link class="nav-link" to="/donate">
    //       Donate
    //     </Link>
    //   </li>
    // </ul>

    <nav
      class="navbar navbar-expand-lg bg-success bg-opacity-25"
      style={{ fontColor: "white" }}
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          WORDSWORD
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Log In
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/create">
                Join
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/donate">
                Donate
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
