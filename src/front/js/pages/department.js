import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Department = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
    let artPieces = store.artPieces.filter(item => item.department == params.thedepartment)
	return (
        <div>
            {artPieces.map((item) => {
                
            })}
        </div>
        
    )
}