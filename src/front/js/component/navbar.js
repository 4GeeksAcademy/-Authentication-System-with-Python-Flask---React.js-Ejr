import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (

    <div class="main-div">
      <h1>ThunderCats</h1>
      <div class="left-div">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown" data-bs-theme="dark">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonDark" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonDark">
                <li><a class="dropdown-item" id="actionGames" href="#">Action</a></li>
                <li><a class="dropdown-item" id="roleplayingGames" href="#">RPG</a></li>
                <li><a class="dropdown-item" id="strategy" href="#">Strategy</a></li>
              </ul>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>

            </div>


          </div>
        </nav>
      </div>
      <div class="right-div">
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div>
    </div>

  );
};
//<div class="main_div">
//<div class="left-div">
//<button>Home</button>
// <button>Categories</button>
////<button>Favorites</button>
//</div>
//<div class="right-div">
//  <button>Login</button>
// <button>signup</button>
//</div>
//</div>