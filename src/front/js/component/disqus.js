import React, { Component } from "react";
import Disqus from "disqus-react";

export default class Comentarios extends Component {
	render() {
		const disqusShortname = "costaricapassport";
		const disqusConfig = {
			url: "https://3000-aquamarine-cat-14f9pgld.ws-us03.gitpod.io/",
			identifier: "article-id",
			title: "Reseña de los usuarios"
		};

		return (
			<div className="article-container">
				<h1>Reseña de los usuarios</h1>

				<p>Escribe aqui tu reseña!!</p>

				<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
			</div>
		);
	}
}
