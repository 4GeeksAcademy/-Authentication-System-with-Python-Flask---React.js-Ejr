import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"
import Filters from "./FilterModal/Filters";
import { Context } from "../store/appContext";
import "../../styles/cardata.css"

export const Navbar = () => {
	const {store, actions} = useContext(Context);




	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container m-0">
				<div>
					<Link to={"/"}>
						<img
						src="https://static.vecteezy.com/system/resources/previews/013/923/543/original/blue-car-logo-png.png"
						style={{"width": "7rem", "height": "auto"}}
						/>
					</Link>
				</div>
				<div>
					<Link to="/catalog">
					<button className="btn btn-primary">
						<h5>Cars catalog</h5>
					</button>
					</Link>
				</div>
				<div>
					< SearchBar />
				</div>
				<div>
					< Filters />
				</div>
				<div>	
					<Link to={"/signup"}>
						<button className="btn btn-primary">
							<h5>Sign Up</h5>
						</button>
					</Link>
					<Link to={"/Login"}>
						<button className="btn btn-primary"><h5>Login</h5></button>
					</Link>
						<button onClick={() => actions.retrieveData()} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					<div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Side Menu</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                        <Link to={"/"}>
							<p className="nav-link active" aria-current="page" href="#">Home</p>
						</Link>
                    </li>
                    <li className="nav-item">
						<Link to={"/compare"}>
							<button>
								Compare added cars
							</button>
						</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <p className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Saved Cars
                        </p>
                        <ul className="dropdown-menu dropdown-menu-dark" id="drop-down-menu" >
						{store.saved.map((item, index) => {
							const car = item.car; 
								if (store.saved.includes(car)) alert("Car is already added")
									else if (!car || !car.car_name) {
										return null;
								}
									console.log("CAR NAME FROM SAVED: ", car.car_name);
									return (
									<div key={index}style={{"display": "flex"}}>
										<li className="carFormatted">{car.car_name}</li>
										<button type="button" onClick={(e)=> {
											if (store.compareCars.includes(car)) {
												return alert("Car already added");
											  } else {
												actions.addCarToCompare(car);
											  }
											}}>Compare</button>
									</div>
								)
							})}
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <Link to={"/compare"}>
							<li className="dropdown-item" href="#"><button className="btn btn-success">Compare selected saved cars (3 MAX.)</button></li>
						</Link>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div>
				</div>
			</div>
		</nav>
	);
};
