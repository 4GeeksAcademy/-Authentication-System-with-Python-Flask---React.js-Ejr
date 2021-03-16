import React, { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Jumbotron } from "../component/jumbotron";
import { Card } from "../component/Card";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export function ViewGeneral() {
	const { type } = useParams();
	const storeContext = useContext(Context);
	const {
		store: { pymes }
	} = storeContext;
	useEffect(() => {
		storeContext.actions.loadPymeData();
	}, []);
	const data = useMemo(
		() => {
			return pymes.filter(current => current.tipo === type);
		},
		[type, pymes]
	);

	return (
		<div className="text-center container-fluid">
			<Jumbotron type={type} />
			<div className="row px-1 my-5">
				{data.map((value, index) => {
					return (
						<div className="col-sm-12 col-md-4 col-lg-3 my-2" key={index}>
							<Card item={value} type={type} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
