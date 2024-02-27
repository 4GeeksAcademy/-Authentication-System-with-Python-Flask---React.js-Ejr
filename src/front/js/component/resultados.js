import React, { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

import debounce from 'lodash.debounce';





export const Resultados=({valor})=>{
const { store, actions } = useContext(Context);
const [resultados,setResultados]=useState([])



const fetchDebounced= useCallback(debounce((valor)=>{
	async function fetch(){
		if(valor){

		try {
			const data = await actions.setBooks(valor);
			setResultados(data.docs.slice(0,6));
			
			if (resultados){
				
				console.log ("bien")
				return resultados
			}
			else{
				console.log("mal")
			
				return !resultados
			}
		} catch (error) {
			console.log("error", error);
		}

		
	
}
else{
	setResultados([])
} }fetch()},1000),[])

useEffect(()=>{
	fetchDebounced(valor)		
		
}

,[valor,fetchDebounced])

	return(
			<>
		

	{valor.trim()  ?	resultados && ( 
					 <div className="mt-0">
					 <ul>	
						{resultados.map((inner, index) => (
								<li  className="list-group-item" key={index}>{inner.title}</li>
							 ))}
					</ul>
						 
					 </div>) : null}

					 
					 	
					 </>)

	}
	

