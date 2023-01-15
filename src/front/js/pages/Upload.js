import React from "react";

export const Upload_item = () =>{

    return (


        <form className="contenedor-login">
              
                <div className="mb-3">
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Categorias</option>
                        <option value="1">Accesorios</option>
                        <option value="2">Repuestos</option>
                        <option value="3">Indumentaria</option>
                        <option value="3">Bicicletas</option>
                    </select>
                    <label for="exampleInputEmail1" className="form-label">Producto </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ingrese nombre producto' />
                    <label for="exampleInputEmail1" className="form-label">Cantidad de productos </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ingrese stock' />
                    <div className="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descripcion del producto</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                   <div className='cargar-imagen'>
                    <img  src='https://cdn.pixabay.com/photo/2020/11/06/16/04/bike-5718217_960_720.jpg' width="200px"></img>   
                   </div>
                   
                   <button onClick={() => alert("proximamente") } type="submit" className="btn btn-dark">CARGAR IMAGEN</button>
                   <button  onClick={() => alert("proximamente") } type="submit" className="btn btn-dark">Save</button>
                   
                </div>
            


        </form>


    );
}

