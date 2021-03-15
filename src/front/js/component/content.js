import React from "react";
import { Container, Row, Image, Card } from "react-bootstrap";
import "../../styles/disable_scroll.scss";
export const Content = () => {
	return (
		<Container className="mt-2 mb-2">
			<Row>
				<div className="d-flex justify-content-end" id="padre">
					<Image
						className="contentimg col-12 col-md-8"
						src="https://foodandtravel.mx/wp-content/uploads/2019/02/coctelesclassic.jpg"
						fluid
					/>
					<div className="col-12 col-md-6" id="uno">
						<Card className="Card text-light p-3">
							<blockquote className="blockquote mb-0 card-body">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
									ante.
								</p>
								<footer className="blockquote-footer">
									<small className="text-muted">
										Someone famous in <cite title="Source Title">Source Title</cite>
									</small>
								</footer>
							</blockquote>
						</Card>
					</div>
				</div>
			</Row>
		</Container>
	);
};
