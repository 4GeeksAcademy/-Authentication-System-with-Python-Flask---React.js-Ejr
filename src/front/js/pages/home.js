import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [form, setForm] = React.useState({ email: "", password: "" });

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const apiUrl = `${process.env.BACKEND_URL}api/login`;
		const res = await fetch(apiUrl, {
			method: "POST",
			body: JSON.stringify(form)
		});

		return (
			<div className="text-center mt-5">
				<h1>Hello Rigo!!</h1>
				<form onSubmit={onSubmit}>
					<input
						name="email"
						onChange={handleChange}
						placeholder="email"
						value={form.email}
					></input>
					<input
						name="password"
						onChange={handleChange}
						placeholder="password"
						value={form.password}
					></input>
					<button type="submit">Submit</button>
				</form>
	
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>
			</div>
		);
	};}
