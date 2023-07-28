import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useSearchParams } from "react-router-dom";

export const ChangePassword = () => {
	const { store, actions } = useContext(Context);
    let [searchParams, setSearchParams] = useSearchParams();

    async function submitForm(e){
        e.preventDefault()
        let data = new FormData(e.target)
        if(data.get("password")!==data.get("passwordConfirm")){
            console.log("Claves no Coinciden")
            return
        }
        let tokenPassword=searchParams.get("token")
        let resp = await actions.changePasswordRecovery(tokenPassword, data.get("password"))
        if (resp >= 400){
            return
        }
        console.log("Clave Cambiada")
    }
}