import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { ProgressBar } from "react-bootstrap";
import ButtomStar from "./ButtomStar.jsx";
import ButtomStar2 from "./ButtomStar2.jsx";
import { Form, Button } from "react-bootstrap";

export const Formcomment = () => {
	const { store, actions } = useContext(Context);
	const [text_comment, setComment] = useState(null);
	const [assessment, setAssessment] = useState();
	return (
		<>
			<div className="container">
				<div className="row">
					<div className="col-md-8">
						<section className="comment-list">
							<article className="row">
								<div className="col-md-2 col-sm-2 hidden-xs"></div>
								<div className="col-md-10 col-sm-10">
									<div className="panel panel-default arrow left">
										<div className="panel-body">
											<div className="col-sm-3">
												<div className="review-block-date">
													24 Marzo 2021
													<br />
													Hoy
												</div>
											</div>
											<header className="text-left">
												<ButtomStar onClick={() => setAssessment(1)} />
												<ButtomStar onClick={() => setAssessment(2)} />
												<ButtomStar onClick={() => setAssessment(3)} />
												<ButtomStar onClick={() => setAssessment(4)} />
												<ButtomStar onClick={() => setAssessment(5)} />
											</header>
											<div className="comment-post">
												{/*<Form.Label>Titulo</Form.Label>
                                                <Form.Control type="text" placeholder="Escribe el titulo" />*/}
												<Form.Label>Comentario</Form.Label>
												<Form.Control
													type="text"
													placeholder="Escribe el comentario"
													value={text_comment}
													onChange={e => setComment(e.target.value)}
												/>
											</div>
											<p className="text-right">
												<Button
													variant="info"
													onClick={() => {
														actions.addComment(text_comment);
													}}>
													<i className="fa fa-reply"></i> reply
												</Button>{" "}
											</p>
											<ul>
												{store.comments
													.filter(item => {
														return item;
													})
													.map((item, index) => {
														return <li key={index}>{item.text_comment}</li>;
													})}
											</ul>
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
