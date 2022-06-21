import { string } from "prop-types";
import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const EditarInfluencer = () => {
    const parametro = useParams()
    var allData = {}
    var finalData = {}
    const [igLinks, addLinks] = useState([]);
    var getInfo = {}
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/influencers/${parametro.id}`)
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
                document.getElementById('categoria').value = result["categoria"];
                document.getElementById('ig-user').value = result["ig_user"];
                document.getElementById('ciudad').value = result["ciudad"];
                document.getElementById('bio').value = result["bio"];
                document.getElementById('precio-reel').value = result["precio_reel"];
                document.getElementById('precio-story').value = result["precio_story"];
                document.getElementById('precio-post').value = result["precio_post"];

                var links = []
                if (result["post1"]) { links.push(result["post1"]) }
                if (result["post2"]) { links.push(result["post2"]) }
                if (result["post3"]) { links.push(result["post3"]) }
                if (result["post4"]) { links.push(result["post4"]) }
                if (result["post5"]) { links.push(result["post5"]) }
                if (result["post6"]) { links.push(result["post6"]) }
                addLinks(links)


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

        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/influencers/${parametro.id}`, requestOptions)
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

        fetch("https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/registro-influencers", requestOptions)
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
            allData.autonomia = document.getElementById('autonomia').value;
            allData.ciudad = document.getElementById('ciudad').value;
            allData.bio = document.getElementById('bio').value;
            allData.ig_user = document.getElementById('ig-user').value;
            allData.categoria = document.getElementById('categoria').value
            allData.precio_post = document.getElementById('precio-post').value
            allData.precio_reel = document.getElementById('precio-reel').value
            allData.precio_story = document.getElementById('precio-story').value
            allData.post1 = igLinks[0]
            allData.post2 = igLinks[1]
            allData.post3 = igLinks[2]
            allData.post4 = igLinks[3]
            allData.post5 = igLinks[4]
            allData.post6 = igLinks[5]


            if (allData.email &&
                allData.password &&
                allData.apellidos &&
                allData.nombre &&
                allData.autonomia &&
                allData.ciudad &&
                allData.bio &&
                allData.ig_user &&
                allData.categoria &&
                allData.post1 &&
                allData.precio_post &&
                allData.precio_reel &&
                allData.precio_story) {
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
        document.getElementById('autonomia').value = "";
        document.getElementById('categoria').value = "";
        document.getElementById('ig-user').value = "";
        document.getElementById('ciudad').value = "";
        document.getElementById('bio').value = "";
        document.getElementById('precio-story').value = "";
        document.getElementById('precio-reel').value = "";
        document.getElementById('precio-post').value = "";

    }


    function plusButton() {
        if (igLinks.length == 6) {
            alert("Has llegado al máximo de enlaces posibles.")
        } else {

            addLinks([...igLinks, document.getElementById("ig-link").value])
            document.getElementById("ig-link").value = ""
        }
    }

    return (
        <div className="container-fluid m-0 p-0">
            <div className="container-fluid pt-5">
                <p className="h1 text-center my-5">Editar datos</p>
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
                            <label for="categoria" className="col-sm-3 col-form-label">Categoría</label>
                            <div className="col-sm-9">
                                <select className="form-select" aria-label="Default select example" id="categoria" defaultValue="Selecciona">
                                    <option value="Moda y belleza">Moda y belleza</option>
                                    <option value="Maquillaje y cosméticos">Maquillaje y cosméticos</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Fitness y gym">Fitness y gym</option>
                                    <option value="Comida y recetas">Comida y recetas</option>
                                    <option value="Mamá y premamá">Mamá y premamá</option>
                                    <option value="Vegano y vegetariano">Vegano y vegetariano</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Emprendimiento">Emprendimiento</option>
                                    <option value="Viajes">Viajes</option>
                                    <option value="Coches y motos">Coches y motos</option>
                                    <option value="Reality y televisión">Reality y televisión</option>
                                    <option value="Actores y cantantes">Actores y cantantes</option>
                                    <option value="Mascotas">Mascotas</option>
                                    <option value="Family friendly">Family friendly</option>
                                    <option value="Otro">Otro</option>
                                </select>
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
                            <label for="autonomia" className="col-sm-5 col-form-label">País</label>
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
                            <label for="ig-user" className="col-sm-6 col-form-label">Usuario Instagram</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="ig-user" />
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
                <div className="container row d-flex justify-content-center mx-auto my-5 py-3">
                    <div className="col-8">
                        <p className="text-center">Enlace a posts de promociones que hayas hecho como influencer (máximo 6)</p>
                        <div className="d-flex ">
                            <input className="form-control" type="text" placeholder="Pega aquí el enlace a tu post" aria-label="default input example" id="ig-link" /><i className="fas fa-plus m-auto ms-3" onClick={() => plusButton()}></i>

                        </div>
                        <div className="text-center mt-3" id="mostrar-ig-links">
                            {igLinks.map((value, index) => {
                                return (
                                    <li className="list-group-item" key={`${index}`}>
                                        <div className="d-flex">
                                            <div className="col-10">{value}</div>
                                            <div className="col-2 text-end">
                                                <i
                                                    className="fas fa-times"
                                                    id="cross"
                                                    onClick={() => {
                                                        let newItemsArray = igLinks.filter(
                                                            (v, i) => {
                                                                return i != index;
                                                            }
                                                        );
                                                        addLinks(newItemsArray);
                                                    }}></i>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="container-fluid row text-center mx-0 py-3">
                    <div className="mb-3 col-8 mx-auto">
                        <label for="bio" className="form-label">Cuéntanos un poco más de ti</label>
                        <textarea className="form-control" id="bio" rows="3"></textarea>
                    </div>
                </div>
                <p className="h1 text-center my-5">Tus precios</p>
                <div className="container-fluid row d-flex justify-content-center mx-auto">
                    <div className="col-3 d-flex ">
                        <label for="precio-post" className="col-sm-3 col-form-label text-end me-3">Post</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-post" />
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <label for="precio-reel" className="col-sm-3 col-form-label text-end me-3">Reel</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-reel" />
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <label for="precio-story" className="col-sm-3 col-form-label text-end me-3">Story</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-story" />
                        </div>
                    </div>
                </div>
                <div className="button-container my-5 d-flex justify-content-center pb-5">
                    <button type="button" className="btn btn-danger btn-sm col-1 me-3" onClick={() => { delData() }}>Borrar</button>
                    <button type="button" className="btn btn-success btn-sm col-1 ms-3" onClick={() => { addData() }}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
