import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 col-9">
			<h1>Welcome to WordSword B)</h1>
			<form>
				<label for="textFile">Choose a file:</label>
				<br></br>
				<input type="file" id="textFile" name="textFile" accept=".txt, .pdf"></input>
				<input type="submit" value="Slice File" onClick={() => {
					actions.setFile(textFile)
				}}/>
				<br></br>
				<label for="typedInput">Or copy and paste text here:</label>
				<br></br>
				<textarea name="typedInput" rows="10" cols="60"></textarea>
				<br></br>
				<input type="submit" value="Slice Text" onClick={() => {
					actions.setFile(typedInput)
				}}/>
			</form>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
