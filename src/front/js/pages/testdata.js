import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const TestData = () => {
    const { store, actions } = useContext(Context);

    // let services = {
    //     service_sedan_1 : {
    //         name: "Aspirado", 
    //         description: "Aspirado interno", 
    //         price: "30"
    //     },
    //     service_sedan_2 : {
    //         name: "Lavado", 
    //         description: "Lavado externo", 
    //         price: "50"
    //     },
    //     service_suv_1 : {
    //         name: "Aspirado", 
    //         description: "Aspirado interno", 
    //         price: "60"
    //     },
    //     service_suv_2 : {
    //         name: "Lavado", 
    //         description: "Lavado externo", 
    //         price: "80"
    //     }
    // }

    function loadData(e) {
        
        e.preventDefault()
        let data = new FormData(e.target)
        let resp = actions.loadTestData(data.get("name"), data.get("description"), data.get("price"))
        if (resp >= 400) {
            return
        }
    }

    return (
        <div className="container" style={{ color: 'black' }}>
            AGREGAR Datos de Prueba
            <form onSubmit={loadData}>
            
                {/* <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre Servicio 1 Sedan</label>
                    <input type="text" class="form-control" name="name" value={services.service_sedan_1.name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Descripcion Servicio 1 Sedan</label>
                    <input type="text" class="form-control" name="description" value={services.service_sedan_1.description} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Precio Servicio 1 Sedan</label>
                    <input type="text" class="form-control" name="price" value={services.service_sedan_1.price} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre Servicio 2 Sedan</label>
                    <input type="text" class="form-control" name="name" value={services.service_sedan_2.name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Descripcion Servicio 2 Sedan</label>
                    <input type="text" class="form-control" name="description" value={services.service_sedan_2.description} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Precio Servicio 2 Sedan</label>
                    <input type="text" class="form-control" name="price" value={services.service_sedan_2.price} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre Servicio 1 Suv</label>
                    <input type="text" class="form-control" name="name" value={services.service_suv_1.name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Descripcion Servicio 1 Suv</label>
                    <input type="text" class="form-control" name="description" value={services.service_suv_1.description} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Precio Servicio 1 Suv</label>
                    <input type="text" class="form-control" name="price" value={services.service_suv_1.price} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre Servicio 2 Suv</label>
                    <input type="text" class="form-control" name="name" value={services.service_suv_2.name} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Descripcion Servicio 2 Suv</label>
                    <input type="text" class="form-control" name="description" value={services.service_suv_2.description} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Precio Servicio 2 Suv</label>
                    <input type="text" class="form-control" name="price" value={services.service_suv_2.price} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div> */}
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}