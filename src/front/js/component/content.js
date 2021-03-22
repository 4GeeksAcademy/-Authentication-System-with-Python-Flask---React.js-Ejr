import React from "react";
import Content_jpg from "../../img/logo/conten.jpg";
import { Container, Row, Image, Card } from "react-bootstrap";
export const Content = () => {
	return (
		<Container className="mt-2 mb-2" id="AboutContent">
			<Row>
				<div className="d-flex justify-content-end" id="content1">
					<Image className="contentimg col-12 col-md-8" src={Content_jpg} fluid />
					<div className="col-12 col-md-6" id="content2">
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
