import React from "react";
import list from '/src/front/img/list.webp';

const treasures = [
  { imageUrl: "url_de_tu_imagen_1", name: "Name 1", description: "Description 1", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_2", name: "Name 2", description: "Description 2", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_3", name: "Name 3", description: "Description 3", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_4", name: "Name 4", description: "Description 4", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_5", name: "Name 5", description: "Description 5", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_6", name: "Name 6", description: "Description 6", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_7", name: "Name 7", description: "Description 7", city: "City", findUrl: "url_para_mas_informacion" },
  { imageUrl: "url_de_tu_imagen_8", name: "Name 8", description: "Description 8", city: "City", findUrl: "url_para_mas_informacion" },
];

const TreasureList = () => {
    return (
        <div className="text-center treasure-list-page" style={{ backgroundImage: `url(${list})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '150px 0', height: "100vh" }}>
            <h1 className="title-page-list pb-4">Treasures List</h1>
            <table className="table-list">
                <thead>
                    <tr className="cabecero">
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
                            <td className="image-elements"><img src={treasure.imageUrl} alt="Tesoro" /></td>
                            <td className="name-elements">{treasure.name}</td>
                            <td className="description-elements">{treasure.description}</td>
                            <td className="city-elements">{treasure.city}</td>
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
