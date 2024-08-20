import React from "react";
import Protein from "../../../../public/images/tarro-proteina.png";
import "../../styles/listofproducts.css";

const TopProduct = () => {
    return (
        <div className="col-12 d-flex flex-column card-item align-items-center justify-content-center">
            <div className="card w-50 text-center" style={{ background: 'transparent', border: 'none' }}>
                <img src={Protein} className="card-img-top w-100" alt="tarro-de-proteina" />
                <div className="card-body">
                    <h2 className="card-title w-100">Proteina</h2>
                    <h4 className="card-subtitle mb-2">44$</h4>
                </div>
            </div>
        </div>
    );
};

export default TopProduct;
