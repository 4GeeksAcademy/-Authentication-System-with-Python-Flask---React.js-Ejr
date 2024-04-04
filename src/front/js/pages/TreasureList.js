import React from "react";
import list from '/src/front/img/list.webp';

const treasures = [
  { imageUrl: "", name: "Name 1", description: "Description 1", city: "City", findUrl: "" },
  { imageUrl: "", name: "Name 2", description: "Description 2", city: "City", findUrl: "" },
  { imageUrl: "", name: "Name 3", description: "Description 3", city: "City", findUrl: "" },
  { imageUrl: "", name: "Name 4", description: "Description 4", city: "City", findUrl: "" },
  { imageUrl: "", name: "Name 5", description: "Description 5", city: "City", findUrl: "" },
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
                            <td className="image-elements ps-2"><img src={treasure.imageUrl} alt="Tesoro" /></td>
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
