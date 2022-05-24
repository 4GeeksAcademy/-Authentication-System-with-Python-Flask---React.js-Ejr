import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const LastProyects = () => {

    const { store, actions } = useContext(Context); 

    

    let lista = store.projects?.map((project, index)=>{
        return (
            <div className="col" key={project.id}>

            </div>
      )

    })

	return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {lista}
        </div>
	);
};
