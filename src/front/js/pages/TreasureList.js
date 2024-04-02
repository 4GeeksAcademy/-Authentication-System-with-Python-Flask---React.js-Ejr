import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../store/appContext"

const TreasureList = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
            navigate("/login");
        } else {
            actions.getMyTasks();
        }
    }, [navigate]);

    return (
        <div className="text-center treasure-list-page">
            <h1>Lista de tesoros ocultos</h1>
        </div>
    )
}

export default TreasureList
