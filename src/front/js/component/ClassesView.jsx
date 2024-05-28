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



        <div>
            <table className="table table-dark table-striped table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>

                        <th scope="col">Datetime class</th>
                        <th scope="col">Start time </th>
                        <th scope="col">Duration minutes</th>
                        <th scope="col">Available slots </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.classesData && store.classesData.map((item) => (


                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>

                                <td>{item.dateTime_class}</td>
                                <td>{item.start_time}</td>
                                <td>{item.duration_minutes}</td>
                                <td>{item.available_slots}</td>
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
        </div>
    )
};
export default ClassesView;
