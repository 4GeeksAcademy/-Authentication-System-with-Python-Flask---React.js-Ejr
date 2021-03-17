import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Button, Breadcrumb } from "react-bootstrap";
import "../../styles/galeria.scss";

export const Home = () => {
	return (
		<div className="container mb-4">
			<div className="contenedor text-center">
				<article className="text-light">
					<h4>Ingresa y enterate de todo lo relacionado a este proyecto!</h4>
					{/* <p>
						Esta página esta ligada a una base de datos ya creada por lo cual para poder ingresar deberás
						revisar F12 y conocer los usuarios en lista ya creados!
					</p> */}
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
	);
};
