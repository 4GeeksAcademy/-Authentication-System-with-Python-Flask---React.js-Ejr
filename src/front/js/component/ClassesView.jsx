import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



const ClassesView = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getClasses()
    }, [])
    //guarda la informacion y navega
    const handlerEdit = (item) =>{
        actions.saveCurrentEdit(item)  
        navigate("/classEdit")
    }
    console.log(store.classesData)
    return (



        <div>
            <table className="table table-dark table-striped table-responsive">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Class Instructor ID</th>
                        <th scope="col">Datetime class</th>
                        <th scope="col">Start time </th>
                        <th scope="col">Duration minutes</th>
                        <th scope="col">Available slots </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        store.classesData && store.classesData.map((item) => (
                            <div>

                                <tr key={item.name}>
                                    <td>{item.description}</td>
                                    <td>{item.instructor_id}</td>
                                    <td>{item.dateTime_class}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.duration_minutes}</td>
                                    <td>{item.available_slots}</td>
                                </tr>

                                <button onClick= {()=> handlerEdit(item)}>
                                    Editar clase
                                </button>
                            </div>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};
export default ClassesView;
