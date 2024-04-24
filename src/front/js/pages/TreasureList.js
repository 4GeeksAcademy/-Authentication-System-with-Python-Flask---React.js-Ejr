import React, { useEffect, useState } from "react";
import list from '/src/front/img/list.webp';
import { Link } from "react-router-dom";

const TreasureList = () => {
    const token = localStorage.getItem("jwt-token");
    const [treasures, setTreasures] = useState([]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [treasuresPerPage] = useState(5);

    const treasuresFilter = treasures.filter(treasure =>
        treasure.city_name.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastTreasure = currentPage * treasuresPerPage;
    const indexOfFirstTreasure = indexOfLastTreasure - treasuresPerPage;

    const currentTreasures = treasuresFilter.length ?
        treasuresFilter.slice(indexOfFirstTreasure, indexOfLastTreasure) : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const searchCity = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        const treasuresList = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/treasures", {
                    method: "GET"
                });

                if (!response.ok) throw new Error("Failed to update treasure list");

                const data = await response.json();
                setTreasures(data);
            } catch (error) {
                console.error("Error list don't found", error);
            }
        };
        treasuresList();
    }, []);

    return (
        <div className="text-center treasure-list-page" style={{ backgroundImage: `url(${list})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '150px 0', minHeight: "100vh" }}>
            <h1 className="title-page-list pt-5 pb-4">Treasures List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by city..."
                    className="search-input"
                    onChange={searchCity}
                    style={{ marginBottom: '20px', width: '25%', height: '45px' }}
                />
            </div>
            <div>
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
                        {currentTreasures.map((treasure, index) => (
                            <tr className="elementos" key={index}>
                                <td className="user-elements ps-3">
                                    <img
                                        src={treasure.userPhoto ? treasure.userPhoto : "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"}
                                        alt="User"
                                        className="rounded-circle user-photo"
                                        style={{ width: '30px', height: '30px', marginRight: '10px', verticalAlign: 'middle' }}
                                    />
                                    {treasure.username}
                                </td>
                                <td className="image-elements">
                                    <div className="image-container">
                                        <img src={treasure.image} alt="Treasure" className="image-treasure-list" />
                                    </div>
                                </td>
                                <td className="name-elements ps-2">{treasure.name}</td>
                                <td className="city-elements ps-2">{treasure.city_name}</td>
                                <td className="find-it-elements">
                                    <Link to={`/treasure/${treasure.id}`}>
                                        <button className="button-details btn btn-warning">Details</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pt-2">
                <button className="btn btn-prev me-1" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>🡸 Prev</button>
                <button className="btn btn-next" onClick={() => paginate(currentPage + 1)} disabled={currentPage * treasuresPerPage >= treasuresFilter.length}>Next 🡺</button>
            </div>
        </div>
    );
};

export default TreasureList;
