import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ProgressBar } from "react-bootstrap";
import ButtomStar from "./ButtomStar.jsx";
import { Form, Button } from "react-bootstrap";

export const Formcomment = () => {
	const { store, actions } = useContext(Context);
	const [commentText, addComment] = useState(null);
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<section className="comment-list">
							<article className="row">
								<div className="col-md-2 col-sm-2 hidden-xs">
									<figure className="thumbnail">
										<img
											className="img-responsive"
											src="http://dummyimage.com/60x60/666/ffffff&text=No+Image"
										/>
										<div classNameName="review-block-name">
											<a href="#">Romina Fuentes</a>
										</div>
									</figure>
								</div>
								<div className="col-md-10 col-sm-10">
									<div className="panel panel-default arrow left">
										<div className="panel-body">
											<header className="text-left">
												<ButtomStar />
												<ButtomStar />
												<ButtomStar />
												<ButtomStar />
												<ButtomStar />
											</header>
											<div className="comment-post">
												{/*<Form.Label>Titulo</Form.Label>
                                                <Form.Control type="text" placeholder="Escribe el titulo" />*/}
												<Form.Label>Comentario</Form.Label>
												<Form.Control
													type="text"
													placeholder="Escribe el comentario"
													value={commentText}
												/>
											</div>
											<p className="text-right">
												<Button
													variant="info"
													onClick={() => {
														addComment(commentText);
													}}>
													<i className="fa fa-reply"></i> reply
												</Button>{" "}
											</p>
										</div>
									</div>
								</div>
							</article>
						</section>
					</div>
				</div>
			</div>
		</>
	);
};
