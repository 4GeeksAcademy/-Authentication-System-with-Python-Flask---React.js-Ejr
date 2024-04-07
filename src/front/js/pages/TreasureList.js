import React, { useEffect, useState } from "react";
import list from '/src/front/img/list.webp';
import amateur from '/src/front/img/1.png';


const TreasureList = () => {

    const [treasures, setTreasures] = useState([]);
    const [filter, setFilter] = useState('');
useEffect(() =>{
    const treasuresList = async () =>{
        try{
            const response = await fetch (process.env.BACKEND_URL + "/api/treasures",{
                method: "GET"
            });

            if (!response.ok) throw new Error ("This treasure map is imposible to read")

            const data = await response.json();
            setTreasures(data);
        } catch (error) {
            console.error("Error list dont found")
        }
    };
    treasuresList ()
},[]);
    const searchCity = (e) =>{
        setFilter(e.target.value)
    }
    const treasuresFilter = treasures.filter(treasure=>treasure.city_name.toLowerCase().includes(filter.toLowerCase()));
    return (
        <div className="text-center treasure-list-page" style={{ backgroundImage: `url(${list})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '150px 0', height: "100%" }}>
            <h1 className="title-page-list pb-4">Treasures List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by city..."
                    className="search-input"
                    onChange={searchCity}
                    style={{ marginBottom: '20px', width: '25%', height: '45px'}}
                />
            </div>
            <table className="table-list">
                <thead>
                    <tr className="cabecero">
                        <th className="user-title">User</th> 
                        <th className="image-title">Image</th>
                        <th className="name-title">Name</th>
                        <th className="city-title">City</th>
                        <th className="find-it-title">Find It</th>
                    </tr>
                </thead>
                <tbody>
                    {treasuresFilter.map((treasure, index) => (
                        <tr className="elementos" key={index}>
                            <td className="user-elements ps-3">Usuario {index + 1}
                                <img className="image-status-profile ms-3 me-3" src={amateur} alt="nombre_imagen_2" />
                            </td>
                            <td className="image-elements"><img src={treasure.imageUrl} alt="Tesoro" className="image-treasure-list" /></td>
                            <td className="name-elements ps-2">{treasure.name}</td>
                            <td className="city-elements ps-2">{treasure.city_name}</td>
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
