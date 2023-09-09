import React from "react";
import { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

function imgErrorHandler(e){
    //e.target.src = "https://cdn-icons-png.flaticon.com/512/8211/8211919.png" //Dog Paw stock image
    e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Shiba_inu_taiki.jpg/800px-Shiba_inu_taiki.jpg"
}

export const Pets = (props) => {
    const{ store, actions } = useContext(Context);
    useEffect(()=>{
        actions.getOwnerPets(1);
    },[]);

    return(
        <div className="text-left my-2">
            <h2 style={{textAlign: "left", marginBottom:"15px"}}><strong>My pets</strong></h2>
            <ul style={{padding: "0"}} className="d-flex flex-row flex-wrap justify-content-start">
            {(store.pets.length < 1? "No pets":store.pets.map((pet, index)=>{
            return (
                <div style={{width: "14rem"}}>
                    <div style={{borderRadius:"50%", width: "100%", height:"auto", overflow:"hidden", aspectRatio:"1"}}><img onError={imgErrorHandler}  src="..." className="card-img-top" alt="..." /></div>
                    <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <div className="card-text">
                            <p>{pet.category}<br />{pet.size}</p>
                        </div>
                    </div>
                </div>
            );
        }))}
            </ul>
        </div>
    );
}