import React, { useContext, useEffect  } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPosts();
		actions.getSuggestions();
	}, [actions]);

	return (
		<div>
			<h1>Posts</h1>
			<ul>
				{store.posts.map((post, index) => (
					<li key={index}>{post.bodytext}</li>
				))}
			</ul>

			<h1>Suggestions</h1>
			<ul>
				{store.suggestions.map((suggestion, index) => (
					<li key={index}>{suggestion.suggestion}</li>
				))}
			</ul>
		</div>
	);
};
