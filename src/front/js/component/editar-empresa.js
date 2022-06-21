import React, { Component, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";




export const EditarEmpresa = () => {

    const parametro = useParams()

    var allData = {}
    var finalData = {}

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/empresas/${parametro.id}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (result) {

                document.getElementById('email').value = result["email"];
                document.getElementById('password').value = "";
                document.getElementById('rep-password').value = "";
                document.getElementById('apellidos').value = result["apellidos"];
                document.getElementById('nombre').value = result["nombre"];
                document.getElementById('autonomia').value = result["autonomia"];
                document.getElementById('sector').value = result["sector"];
                document.getElementById('razon').value = result["razon_social"];
                document.getElementById('ciudad').value = result["ciudad"];
                document.getElementById('bio').value = result["bio"];
                console.log(result)

                return console.log(result)
            })
            .catch(error => console.log('error', error));





    }, [])

    function updateData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(finalData);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/empresas/${parametro.id}`, requestOptions)
            .then(function (response) {
                if (response.ok == true) {
                    alert("Usuario actualizado con éxito")
                } else {

                    alert("Lo sentimos, no se ha podido crear el usuario. Por favor, contacta con nosotros.")
                }
                return response.text()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    function sendData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(finalData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/registro-empresas", requestOptions)
            .then(function (response) {
                if (response.ok == true) {
                    alert("Usuario creado con éxito")
                } else {

                    alert("Lo sentimos, no se ha podido crear el usuario. Por favor, contacta con nosotros.")
                }
                return response.text()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    }
    function addData() {
        if (document.getElementById('password').value == document.getElementById('rep-password').value) {

            allData.email = document.getElementById('email').value;
            allData.password = document.getElementById('password').value;
            allData.apellidos = document.getElementById('apellidos').value;
            allData.nombre = document.getElementById('nombre').value;
            allData.razon_social = document.getElementById('razon').value;
            allData.sector = document.getElementById('sector').value;
            allData.autonomia = document.getElementById('autonomia').value;
            allData.ciudad = document.getElementById('ciudad').value;
            allData.bio = document.getElementById('bio').value;
            if (allData.email &&
                allData.password &&
                allData.apellidos &&
                allData.nombre &&
                allData.razon_social &&
                allData.sector &&
                allData.autonomia &&
                allData.ciudad &&
                allData.bio) {
                finalData = allData
                console.log(finalData)
                updateData()
            } else {
                alert("Todos los campos son obligatorios")
            }
        } else {
            alert("Las contraseñas no coinciden")
        }
    }


    function delData() {
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('rep-password').value = "";
        document.getElementById('apellidos').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('razon').value = "";
        document.getElementById('sector').value = "";
        document.getElementById('autonomia').value = "";
        document.getElementById('ciudad').value = "";
        document.getElementById('bio').value = "";
    }

    return <div className="container-fluid m-0 p-0">

        <div className="container-fluid">
            <p className="h1 text-center my-5">Editar Datos</p>
            <div className="container row d-flex justify-content-center text-end mx-auto mb-3">
                <div className="col">
                    <div className="mb-3 row">
                        <label for="email" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="email" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="apellidos" className="col-sm-3 col-form-label">Apellidos</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="apellidos" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="sector" className="col-sm-3 col-form-label">Sector</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="sector" />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3 row">
                        <label for="password" className="col-sm-5 col-form-label">Contraseña</label>
                        <div className="col-sm-7">
                            <input type="password" className="form-control" id="password" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="nombre" className="col-sm-5 col-form-label">Nombre</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="nombre" />
                        </div>
                    </div>
                    <div className="mb-3 row d-flex">
                        <label for="autonomia" className="col-sm-5 col-form-label">C. Autónoma</label>
                        <div className="col-sm-7">
                            <select className="form-select" aria-label="Default select example" id="autonomia" defaultValue="Selecciona">
                                <option value="Andalucía">Andalucía</option>
                                <option value="Aragón">Aragón</option>
                                <option value="Canarias">Canarias</option>
                                <option value="Cantabria">Cantabria</option>
                                <option value="Castilla y León">Castilla y León</option>
                                <option value="Castilla-La Mancha">Castilla-La Mancha</option>
                                <option value="Cataluña">Cataluña</option>
                                <option value="Ceuta">Ceuta</option>
                                <option value="Comunidad de Madrid">Comunidad de Madrid</option>
                                <option value="Comunidad Valenciana">Comunidad Valenciana</option>
                                <option value="Extremadura">Extremadura</option>
                                <option value="Galicia">Galicia</option>
                                <option value="Islas Baleares">Islas Baleares</option>
                                <option value="La Rioja">La Rioja</option>
                                <option value="Melilla">Melilla</option>
                                <option value="Navarra">Navarra</option>
                                <option value="País Vasco">País Vasco</option>
                                <option value="Principado de Asturias">Principado de Asturias</option>
                                <option value="Región de Murcia">Región de Murcia</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3 row">
                        <label for="rep-password" className="col-sm-6 col-form-label">Repite contraseña</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" id="rep-password" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="razon" className="col-sm-6 col-form-label">Razón social</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="razon" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="ciudad" className="col-sm-6 col-form-label">Ciudad</label>
                        <div className="col-sm-6">
                            <input type="text" className="form-control" id="ciudad" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid row text-center mx-0 py-3">
                <div className="mb-3 col-8 mx-auto">
                    <label for="bio" className="form-label">Cuéntanos un poco más de ti</label>
                    <textarea className="form-control" id="bio" rows="3"></textarea>
                </div>
            </div>
            <div className="button-container my-5 d-flex justify-content-center pb-5">
                <button type="button" className="btn btn-danger btn-sm col-1 me-3" onClick={() => { delData() }}>Borrar</button>
                <button type="button" className="btn btn-success btn-sm col-1 ms-3" onClick={() => { addData() }}>Enviar</button>
            </div>
        </div>
    </div>
}

