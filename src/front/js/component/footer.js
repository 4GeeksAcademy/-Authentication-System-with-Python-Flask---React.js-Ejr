import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import logoImageUrl from "../../img/logoHW.png";


export const Footer = () => {
	
	return (
		<footer className="footer fs-4 d-flex justify-content-between">
			<div className="d-flex mt-2 ms-3 mb-2">
				<img className="logo-footer" src={logoImageUrl} />
				<p className=" fs-3 me-4 ms-3 mt-3 text-white-50">© 2024 Friendly Wheels,Inc</p>
			</div>
			<div className="d-flex justify-content-end mt-3">
				<Link to="/sobrenosotros" className="text-decoration-none">
					<div className="me-3 text-warning fs-2">Sobre Nosotros</div>
				</Link>
				<div>
					<a className="instagram" href="https://www.instagram.com/friendlywheels58" target="_blank">
						<i className="fab fa-instagram mt-3 me-2" />
					</a>
				</div>
				<div>
					<a className="facebook" href="https://www.facebook.com/people/Jo-Jo/pfbid02ebXDgWypf9v7ZJxL6zVzJAxb6gcyxEbmnicygdMGF6t7p2D6jdmMk94asJfPbMeDl" target="_blank">
						<i className="fab fa-facebook mt-3 me-2" />
					</a>
				</div>
				<div>
					<a className="facebook" href="https://x.com/FriendlyWheels5" target="_blank">
						<i className="fab fa-twitter mt-3 me-2"></i>
					</a>
				</div>
			</div>
		</footer>
	);
};

