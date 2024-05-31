import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import logoImageUrl from "../../img/logoHW.png";

export const Footer = () => {
	const [aboutUsHover, setAboutUsHover] = useState(false); 

	const linkStyle = {
		color: aboutUsHover ? 'green' : 'white',
		textDecoration: "none",
	  };

	return (
		<footer className="footer fs-4 d-flex justify-content-between">
			<div className="d-flex mt-2 ms-4 mb-2 ps-3">
				<img src={logoImageUrl} />
				<p className=" fs-3 me-4 ms-3 mt-4 text-white">© 2024 Friendly Wheels,Inc</p>
			</div>
			<div className="d-flex justify-content-end mt-4">
				<Link to="/sobrenosotros" style={linkStyle} onMouseOver={() => setAboutUsHover(true)} onMouseLeave={() => setAboutUsHover(false)}>
					<div className="me-3 mt-2 fs-3">Sobre Nosotros</div>
				</Link>
				<div className="iconos d-none d-lg-block d-xl-block">
					<a className="instagram fs-1" href="https://www.instagram.com/friendlywheels58" target="_blank">
						<i className="fab fa-instagram me-2" />
					</a>
					<a className="facebook fs-1" href="https://www.facebook.com/people/Jo-Jo/pfbid02ebXDgWypf9v7ZJxL6zVzJAxb6gcyxEbmnicygdMGF6t7p2D6jdmMk94asJfPbMeDl" target="_blank">
							<i className="fab fa-facebook me-2" />
					</a>
					<a className="twitter fs-1" href="https://x.com/FriendlyWheels5" target="_blank">
						<i className="fab fa-twitter me-3"></i>
					</a>
				</div>
			</div>
		</footer >
	);
};

