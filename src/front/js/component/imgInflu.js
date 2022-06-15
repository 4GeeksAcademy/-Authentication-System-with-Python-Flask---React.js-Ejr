import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
/*import InstagramEmbed from "react-instagram-embed";*/

export const ImgInflu = (props) => {
    const {store, actions} = useContext(Context);

    return <>
        <div className="card border"  style>
            <img className="" src={"https://ainalosange.files.wordpress.com/2014/04/cosas-de-modernos.png"} style={{Width: "50px", height: "50px"}}
             alt="Card image cap"/>
             <i class="far fa-heart"></i>
        </div>
    
    
    
    
    </>
}