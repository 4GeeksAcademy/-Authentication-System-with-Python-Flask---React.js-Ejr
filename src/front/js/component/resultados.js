import React, { useContext, useState, useEffect, useCallback } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import debounce from 'lodash.debounce';
export const Resultados=({valor})=>{
const { store, actions } = useContext(Context);
 


const fetchDebounced= useCallback(debounce( (valor)=>actions.consulta(valor),1000),[])

useEffect(()=>{
	fetchDebounced(valor)		
		
}

,[valor,fetchDebounced])

	return(
			<>
		

	{valor.trim()  ?	store.resultados && ( 
					 <div className="mt-0">
					 <ul>	
						{store.resultados.map((inner, index) => (
								<li  className="list-group-item" key={index}>{inner.title}</li>
							 ))}
					 </ul>
						 
					 </div>) : null}

					 
					 	
					 </>)

	}
	

