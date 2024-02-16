import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Formulario = () => {
	const{store,actions} = useContext (Context)
	return (
		<form>
  <div  className="mb-3">
    <label for="exampleInputEmail1"  className="form-label">Email address</label>
    <input type="email"  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp"  className="form-text">.</div>
  </div>
  <div  className="mb-3">
    <label for="exampleInputPassword1"  className="form-label">Password</label>
    <input type="password"  className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
	);
};
