import React from "react"

export const ProfileForm = () => {


    return (


        <div className="container d-flex justify-content-center">
            <form className="bg-white" style={{ height: "auto", width: "600px", margin: "20px", padding: "20px", boxShadow: "0 5px 8px rgba(0, 0, 0, 0.1)" }}>
                <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                        <img src="https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?auto=compress&cs=tinysrgb&w=800" className="img-fluid" style={{ borderRadius: "50%" }} />
                        <button style={{ height: 30, marginTop: 150, background: "transparent", border: "none" }}><i className="fa-solid fa-arrow-up-from-bracket"></i></button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <h2 className="me-2" placeholder="Username">Username</h2> <button style={{ background: "transparent", border: "none" }}> <i className="fa-sharp fa-solid fa-pen" /> </button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 d-flex align-items-center">
                        <h4 style={{ marginRight: "10px" }}>Cuéntanos un poco sobre ti</h4>
                        <button style={{ background: "transparent", border: "none" }}>
                            <i className="fa-sharp fa-solid fa-pen" />
                        </button>
                    </div>
                    <div className="col-md-12">


                        <p
                            className="form-control"
                            placeholder="Describete"
                            id="floatingTextarea2"
                            style={{ height: 100 }}
                            defaultValue={""}
                        />

                    </div>
                </div>
                <div className="row mt-4">
                    <div><h4>¿Qué te gusta hacer?</h4></div>
                    <div className="col-md-12 d-flex ">

                        <ul style={{ listStyleType: "none", display: "flex", flexDirection: "row", flexWrap: "wrap" }} >

                            <li style={{ margin: "5px" }}> <button> Videojuegos </button> </li>
                            <li style={{ margin: "5px" }}> <button> Juegos de mesa </button> </li>
                            <li style={{ margin: "5px" }}> <button> Libros </button> </li>
                            <li style={{ margin: "5px" }}> <button> Cine </button> </li>
                            <li style={{ margin: "5px" }}> <button> Viajar </button> </li>
                            <li style={{ margin: "5px" }}> <button> Cocinar </button> </li>
                            <li style={{ margin: "5px" }}> <button> Hacer la croqueta </button> </li>
                            <li style={{ margin: "5px" }}> <button> Viajar </button> </li>
                            <li style={{ margin: "5px" }}> <button> Comer </button> </li>
                            <li style={{ margin: "5px" }}> <button> Aprender idiomas </button> </li>
                            <li style={{ margin: "5px" }}> <button> Programar </button> </li>
                            <li style={{ margin: "5px" }}> <button> Bailar </button> </li>
                            <li style={{ margin: "5px" }}> <button> Ir de birras </button> </li>
                            <li style={{ margin: "5px" }}> <button> Cata de vinos </button> </li>
                            <li style={{ margin: "5px" }}> <button> Espiar al vecino </button> </li>
                            <li style={{ margin: "5px" }}> <button> Ver Telecinco </button> </li>
                            <li style={{ margin: "5px" }}> <button> Música de los 90 </button> </li>
                            <li style={{ margin: "5px" }}> <button> Música de los 80 </button> </li>


                        </ul>

                    </div>
                </div>
            </form>
        </div>





    )
}
