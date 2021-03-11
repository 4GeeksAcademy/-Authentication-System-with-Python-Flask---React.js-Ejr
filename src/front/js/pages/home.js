import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Img } from "react-bootstrap";
import "../../styles/home.scss";

export const Home = () => {
	return (
		<div className="container">
			<div className="contenedor">
				<div className="row">
					{/* 1era Fila */}
					{/* 1era Fila */}
					{/* 1era Fila */}
					<div className="mb-1 col-md-4">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					<div className="mb-1 col-md-4">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					<div className="mb-1 col-md-4">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					{/* 2da Fila */}
					{/* 2da Fila */}
					{/* 2da Fila */}
					<div className="mb-1 col-md-8">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					<div className="mb-1 col-md-4">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					{/* 3era Fila */}
					{/* 3era Fila */}
					{/* 3era Fila */}
					<div className="mb-1 col-md-4">
						<div className="principal">
							<div className="frente" />
							<div className="atras">
								<h4>Titulo</h4>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti repellendus
									labore quia dolore saepe maxime esse repellat quaerat aspernatur deleniti assumenda
									nihil.
								</p>
							</div>
						</div>
					</div>
					{/* <div className="col-md-4 caja2">
                        <img
                            src="https://s2.best-wallpaper.net/wallpaper/1920x1080/1702/Fruit-drinks-cocktail-cold-glass-cups_1920x1080.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja3">
                        <img
                            src="https://kkinziger.files.wordpress.com/2014/08/8589130414963-grasshopper-cocktail-wallpaper-hd.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 caja4">
                        <img
                            src="https://img.elo7.com.br/product/main/1E47FBA/adesivo-para-bar-caipirinha-bebida-restaurante-adesivo-limonada.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja5">
                        <img
                            src="https://wallpapercave.com/wp/wp7495149.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja6">
                        <img
                            src="https://st2.depositphotos.com/1177973/7383/i/600/depositphotos_73831175-stock-photo-glasses-of-cocktails-on-bar.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 caja7">
                        <img
                            src="http://ibgnews.com/wp-content/uploads/2016/12/alcohol-fire.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja8">
                        <img
                            src="https://c1.wallpaperflare.com/preview/338/571/673/cocktail-bar-nightlife-icee.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja9">
                        <img
                            src="https://wallpapermemory.com/uploads/523/cocktail-wallpaper-hd-3200x2048-242804.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4 caja10">
                        <img
                            src="https://assets.blog.foodnetwork.ca/wp-content/uploads/sites/6/2016/06/Cranberry-Mojito.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja11">
                        <img
                            src="https://www.shutterfly.com/ideas/wp-content/uploads/2017/05/peach-melba-cooler3.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div>
                    <div className="col-md-4 caja12">
                        <img
                            src="http://blog.tefal.co.uk/wp-content/uploads/2018/01/Delicious-mocktail-ideas-for-Dry-January-Winter-spiced-mojito.jpg"
                            className="img-fluid"
                            alt="Responsive image"
                        />
                    </div> */}
				</div>
			</div>
		</div>
	);
};
