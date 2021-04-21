import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<Form action="">
						<FormGroup className="text-center pb-3">
							<h1 className="text-light">Login</h1>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Username"
								onChange={e => setUser(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<input
								type="password"
								className="form-control"
								placeholder="Password"
								onChange={e => setPass(e.target.value)}
							/>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3">
							<Button
								className="btn btn-block signin"
								onClick={() => {
									actions.loginValidation(user, pass);
								}}>
								Login
							</Button>
						</FormGroup>
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<Link to="/signup">
								<input type="submit" className="btn btn-block register" value="Register" />
							</Link>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
