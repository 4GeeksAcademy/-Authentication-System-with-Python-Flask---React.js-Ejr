import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Row, Col, Button} from "react-bootstrap";

const ClassesView = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getClasses()
    }, [])
    //guarda la informacion y navega
    const handlerEdit = (item) => {
        actions.saveCurrentEdit(item)
        let url="/classEdit/"+item.id
        navigate(url)
    }
    console.log(store.classesData)

    return (

        <div className="container">
            <h1>Clases Activas</h1>
            <table className="table table-dark table-striped table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th className="text-center" scope="col">Date class</th>
                        <th className="text-center" scope="col">Start time </th>
                        <th className="text-center" scope="col">Duration minutes</th>
                        <th className="text-center" scope="col">Available slots </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.classesData && store.classesData.filter(item => item.Class_is_active).map((item) => (
                            

                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>

                                <td className="text-center">{item.dateTime_class.slice(0,16)}</td>
                                <td className="text-center">{item.start_time}</td>
                                <td className="text-center">{item.duration_minutes}</td>
                                <td className="text-center">{item.available_slots}</td>
                                <td>
                                    <button className="btn-secondary mx-2" onClick={() => handlerEdit(item)}>
                                        Editar clase
                                    </button>
                                </td>
                            </tr>



                        ))
                    }
                </tbody>
            </table>

            <br />
            <h1>Clases canceladas</h1>
            <table className="table table-dark table-striped table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th className="text-center" scope="col">Date class</th>
                        <th className="text-center" scope="col">Start time </th>
                        <th className="text-center" scope="col">Duration minutes</th>
                        <th className="text-center" scope="col">Available slots </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {store.classesData && store.classesData.filter(item => !item.Class_is_active).map((item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td className="text-center">{item.dateTime_class.slice(0,16)}</td>
                                <td className="text-center">{item.start_time}</td>
                                <td className="text-center">{item.duration_minutes}</td>
                                <td className="text-center">{item.available_slots}</td>
                                
                            </tr>



                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};
export default ClassesView;
