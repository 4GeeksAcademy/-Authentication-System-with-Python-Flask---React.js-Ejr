import React, { Component } from "react";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="new_footer_area bg_color mt-5">
		<div className="new_footer_top">
			<div className="container">
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-12 mt-5">
						<div
							className="f_widget company_widget wow fadeInLeft"
							data-wow-delay="0.2s"
							style={{ visibility: "visible", animationDelay: "0.2s", animationName: "fadeInLeft" }}>
							<h3 className="f-title f_600 t_color f_size_18">Contacto</h3>
							<p />
							<form
								action="#"
								className="f_subscribe_two mailchimp"
								method="post"
								noValidate="true"
								_lpchecked="1">
								<input type="text" name="EMAIL" className="form-control memail" placeholder="Email" />
								<button className="btn btn_get btn_get_two" type="submit">
									Suscribir
								</button>
								<p className="mchimp-errmessage" style={{ display: " none" }} />
								<p className="mchimp-sucmessage" style={{ display: "none" }} />
							</form>
						</div>
					</div>

					<div className="col-lg-4 col-md-6 col-sm-12 mt-5">
						<div
							className="f_widget about-widget pl_70 wow fadeInLeft"
							data-wow-delay="0.6s"
							style={{ visibility: "visible", animationDelay: "0.6s", animationName: "fadeInLeft" }}>
							<h3 className="f-title f_600 t_color f_size_18">Ayuda</h3>
							<ul className="list-unstyled f_list">
								<li>
									<a href="#">FAQ</a>
								</li>
								<li>
									<a href="#">Terminos y &amp; condiciones</a>
								</li>
								<li>
									<a href="#">Reportes</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-lg-4 col-md-6 col-sm-12 mt-5">
						<div
							className="f_widget social-widget pl_70 wow fadeInLeft"
							data-wow-delay="0.8s"
							style={{ visibility: "visible", animationDelay: "0.8s", animationName: "fadeInLeft" }}>
							<h3 className="f-title f_600 t_color f_size_18">Redes Sociales</h3>
							<div className="f_social_icon">
								<a href="#" className="fab fa-facebook" />
								<a href="#" className="fab fa-twitter" />
								<a href="#" className="fab fa-linkedin" />
								<a href="#" className="fab fa-pinterest" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer_bg">
				<div className="footer_bg_one" />
				<div className="footer_bg_two" />
			</div>
		</div>
		<div className="footer_bottom">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 col-sm-7">
						<p className="mb-0 f_400">© Pura Vida Mart.. 2021 All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
