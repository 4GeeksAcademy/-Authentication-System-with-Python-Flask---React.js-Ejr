import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark bg-success sticky-top">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand fw-bold fs-2 mb-0">GitLoot</span>
				</Link>
				<div className="ml-auto">
					<div className="btn-group dropstart">
						<button type="button" 
							className="cart-button btn btn-outline-info btn-lg dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" 
							style={{backgroundImage:"linear-gradient(to right, #ECE9E6 0%, #FFFFFF  51%, #ECE9E6  100%)", dataColor2:"#FFFFFF", dataColor2:"#ECE9E6"}}>
								Tu loot!
						</button>
						<ul class="dropdown-menu">
							<li className="dropdown-item">Loot 1</li>
							<li className="dropdown-item">Loot 2</li>
							<li className="dropdown-item">Loot 3</li>
							<li className="dropdown-item">This shalt clear thy loot</li>
						</ul>
					</div>
					<div class="dropdown">
  <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
    Dropdown form
  </button>
  <form className="dropdown-menu p-4">
    <div className="mb-3">
      <label for="exampleDropdownFormEmail2" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"></input>
    </div>
    <div className="mb-3">
      <label for="exampleDropdownFormPassword2" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"></input>
    </div>
    <div className="mb-3">
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="dropdownCheck2"></input>
        <label className="form-check-label" for="dropdownCheck2">
          Remember me
        </label>
      </div>
    </div>
    <button type="submit" className="btn btn-primary">Sign in</button>
  </form>
</div>
				</div>
			</div>
		</nav>
	);
};
