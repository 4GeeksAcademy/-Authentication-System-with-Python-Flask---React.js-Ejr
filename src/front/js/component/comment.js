import React, { Component } from "react";
import Disqus from "disqus-react";

export default class Comment extends Component {
	render() {
		const disqusShortname = "costaricapassport";
		const disqusConfig = {
			url: "https://3000-aquamarine-cat-14f9pgld.ws-us03.gitpod.io/",
			identifier: "article-id",
			title: "Reseña de los usuarios"
		};

		return (
			<div className="article-container">
				<h3>Reseña de los usuarios</h3>

				<p>Escribe aquí tu reseña!!</p>

				<Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
			</div>
		);
	}
}
