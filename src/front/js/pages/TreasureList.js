import React from "react";
import list from '/src/front/img/list.webp';
import amateur from '/src/front/img/1.png';

const treasures = [
    { imageUrl: "https://media.istockphoto.com/id/636783196/es/foto/5-billetes-en-euros.jpg?s=612x612&w=0&k=20&c=Mti9s5mpdMQpyI_yCmIR7azvmrZhLmwKkFxgVgNGc_E=", name: "Billete", description: "Billete de 5€", city: "Valencia", findUrl: "" },
    { imageUrl: "https://www.superchuches.com/11642-thickbox_default/chicles-trident-max-fresa.jpg", name: "Chicles", description: "Paquete de chicles Trident", city: "Sevilla", findUrl: "" },
    { imageUrl: "https://balenciaga.dam.kering.com/m/76ede963e2b4da06/Small-787358TQVE81083_Y.jpg?v=2", name: "Camiseta", description: "Camiseta sin usar", city: "Barcelona", findUrl: "" },
    { imageUrl: "https://tushisha.com/9614-large_default/pod-desechable-muss-tech-8000-0-lima-limon-calipo-8000-caladas.jpg", name: "Vaper", description: "Vaper de limón", city: "Madrid", findUrl: "" },
    { imageUrl: "https://t3.ftcdn.net/jpg/06/06/85/00/360_F_606850052_sgygjRn23GNN8YVEmhpFit3HiG8LFyf1.jpg", name: "Golden Ticket", description: "Golden Ticket escondido por Coca Cola. Canjealo por un producto en nuestras tiendas", city: "Bilbao", findUrl: "" },
];

const TreasureList = () => {
    return (
        <div className="text-center treasure-list-page" style={{ backgroundImage: `url(${list})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '150px 0', height: "100%" }}>
            <h1 className="title-page-list pb-4">Treasures List</h1>
            <table className="table-list">
                <thead>
                    <tr className="cabecero">
                        <th className="user-title">User</th> 
                        <th className="image-title">Image</th>
                        <th className="name-title">Name</th>
                        <th className="description-title-list">Description</th>
                        <th className="city-title">City</th>
                        <th className="find-it-title">Find It</th>
                    </tr>
                </thead>
                <tbody>
                    {treasures.map((treasure, index) => (
                        <tr className="elementos" key={index}>
                            <td className="user-elements ps-3">Usuario {index + 1}
                                <img className="image-status-profile ms-3 me-3" src={amateur} alt="nombre_imagen_2" />
                            </td>
                            <td className="image-elements"><img src={treasure.imageUrl} alt="Tesoro" className="image-treasure-list" /></td>
                            <td className="name-elements ps-2">{treasure.name}</td>
                            <td className="description-elements ps-2">{treasure.description}</td>
                            <td className="city-elements ps-2">{treasure.city}</td>
                            <td className="find-it-elements">
                                <button className="button-see-more btn btn-warning" onClick={() => window.location.href = treasure.findUrl}>Find it</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TreasureList;
