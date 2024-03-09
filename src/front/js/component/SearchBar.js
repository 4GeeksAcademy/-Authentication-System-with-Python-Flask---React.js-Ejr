import React from "react";
import { Context } from "../store/appContext";
import { useCallback, useContext, useState, useEffect } from "react";
import { Resultados } from "../component/resultados"

// Barra de búsqueda
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const { store, actions } = useContext(Context);

    const handelOnSubmit = (e) => {
        e.preventDefault()

    }
    useEffect(() => {
        console.log('Input:', search)
        
    }, [search])
    const [pag, setPag]=useState(false)
    return (
        <>
            <div className="text-center">
                <form onSubmit={handelOnSubmit} className="d-flex me-0 " >

                         <input 
                        className="form-control m-1 col-6"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)} />

                        <button className="btn btn-outline-success" type="submit" onClick={()=>setPag(!pag)}>Search</button>
                </form>
                <Resultados valor={search} />
            </div>





        </>
    )
}

export default SearchBar;