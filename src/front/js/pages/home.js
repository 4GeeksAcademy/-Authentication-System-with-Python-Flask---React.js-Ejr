import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Button, Breadcrumb } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../../styles/galeria.scss";

export const Home = () => {
	const { actions, store } = useContext(Context);
	return (
		<>
			{store.jwtoken == null ? <Redirect to="/" /> : "/home"}
			<div className="container">
				<div className="contenedor text-center">
					<article className="text-light textBox">
						<p>
							Mas que una pagina ilustrativa, en TOMATE`LO puedes encontrar los cócteles más populares
							seleccionados para tí!
						</p>
						<footer className="blockquote-footer">
							Sabias que puedes encontrar informacion dentro de las imagenes
						</footer>
					</article>
					<div className="row">
						{/* 1era Fila */}
						{/* 1era Fila */}
						{/* 1era Fila */}
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Frankenstein</h4>
									<p>Sabias que este coctel esta a base de RUM(Ron)</p>
									<Button href="#RUM" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Atardecer en Hawaii</h4>
									<p>Sabias que este coctel esta a base de Whisky</p>
									<Button href="#WHISKY" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Miss Honolulu</h4>
									<p>Sabias que este coctel esta a base de Tequila</p>
									<Button href="#TEQUILA" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						{/* 2da Fila */}
						{/* 2da Fila */}
						{/* 2da Fila */}
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Michelada</h4>
									<p>Sabias que este coctel esta a base de Gin</p>
									<Button href="#GIN" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Hierba Santa</h4>
									<p>Sabias que este coctel esta a base de Vodka</p>
									<Button href="#VODKA" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Acid Genesis</h4>
									<p>Sabias que este coctel no tiene de base Alcohol</p>
									<Button href="#WithoutBase" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						{/* 3era Fila */}
						{/* 3era Fila */}
						{/* 3era Fila */}
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Vampire Queen</h4>
									<p>Sabias que este coctel esta a base de Whisky</p>
									<Button href="#WHISKY" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Orange Machine</h4>
									<p>Sabias que este coctel esta a base de Vodka</p>
									<Button href="#VODKA" className="Button" variant="outline-success">
										Ver más
									</Button>{" "}
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Pradera Dorada</h4>
									<p>Sabias que este coctel esta a base de Gin</p>
									<Button href="#GIN" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						{/* 4ta Fila */}
						{/* 4ta Fila */}
						{/* 4ta Fila */}
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Blue Monday</h4>
									<p>Sabias que este coctel esta a base de Tequila</p>
									<Button href="#TEQUILA" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Holy Moly</h4>
									<p>Sabias que este coctel no tiene Alcohol como base.</p>
									<Button href="#WithoutBase" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
						<div className="mb-1 col-md-4">
							<div className="principal">
								<div className="frente" />
								<div className="atras text-light">
									<h4>Viernes 13</h4>
									<p>Sabias que este coctel esta a base de RUM(Ron)</p>
									<Button href="#RUM" className="Button" variant="outline-success">
										Ver más
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
