import React, {  useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext";



const RegistroLibro2 = () => {
    
    const {store, actions} = useContext(Context)    
    const navigate = useNavigate()
    
    return (
        <div className="container col-md-4 my-3 shadow p-0">
            <form className="form-control shadow p-3 " onSubmit={(e)=>{actions.submitBookImage(e, navigate)}}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Titulo 
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa el titulo"                       
                        required
                        name="title"
                        value={store.title}
                        onChange={actions.inputBookValue}
                    />
                    <label htmlFor="author" className="form-label">
                        Autor
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa el autor"                        
                        required
                        name="author"
                        value={store.author}
                        onChange={actions.inputBookValue}
                    />
                    <label htmlFor="cathegory" className="form-label">
                        Categoria
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cathegory"
                        aria-describedby="emailHelp"
                        placeholder="Ingresa la categoria"
                        required                         
                        name="cathegory"
                        value={store.cathegory}
                        onChange={actions.inputBookValue}
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="number_of_pages" className="form-label">
                        Numero de páginas
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="number_of_pages"
                        placeholder="Numero de páginas"
                        required
                        name="number_of_pages"
                        value={store.number_of_pages}
                        onChange={actions.inputBookValue}                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="description" className="form-label">
                        Descripción
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Descripción"
                        required
                        name="description"
                        value={store.description}
                        onChange={actions.inputBookValue}
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="price" className="form-label">
                        Precio
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Ingresa precio"
                        required
                        name="price"
                        value={store.price}
                        onChange={actions.inputBookValue}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="photo" className="form-label">
                        Foto
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="photo"
                        placeholder="Ingresa foto"                        
                        name="photo"                        
                        onChange={(e) => actions.inputBookImage(e.target.files[0])}
                    
                    />
                </div>
                <div className="mb-3 password">
                    <label htmlFor="type" className="form-label">
                        Tipo
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        placeholder="Ingresa tipo"
                        required
                        name="type"
                        value={store.type}
                        onChange={actions.inputBookValue}
                    
                    />
                </div>                
                <button type="" className="btn btn-primary my-3" >
                    Publicar
                </button>
            </form>
        </div>
    )

};
export default RegistroLibro2