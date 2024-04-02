import React from "react";
import { Link } from "react-router-dom";
import amateur from '/src/front/img/1.png';
import bronze from '/src/front/img/2.png';
import silver from '/src/front/img/3.png';
import gold from '/src/front/img/4.png';
import platinum from '/src/front/img/5.png';
import diamond from '/src/front/img/6.png';
import legendary from '/src/front/img/7.png';

const StatusScore = () => {
    return (
        <div class="status-container">
            <div class="left-column-status">
                <h1 className="title-status">Status & Score</h1>
                <p className="description-status pt-4">You will be awarded <span className="bold-text">10 points</span> for each treasure found.</p>
                <p className="description-status">You will be awarded <span className="bold-text">10 points</span> for each hidden treasure.</p>
                <p className="description-status">Accumulate points to achieve higher status and to climb the <Link to="/rankings">rankings.</Link></p>
            </div>

            <div class="right-column-status">
                <div class="status-page">
                    <table class="status-table">
                        <tbody>
                            <tr>
                                <td><img className="image-status" src={amateur} alt="nombre_imagen_1" /></td>
                                <td className="name-status">AMATEUR</td>
                                <td className="desc-status">0 to 99 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={bronze} alt="nombre_imagen_2" /></td>
                                <td className="name-status">BRONZE</td>
                                <td className="desc-status">100 to 199 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={silver} alt="nombre_imagen_3" /></td>
                                <td className="name-status">SILVER</td>
                                <td className="desc-status">200 to 299 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={gold} alt="nombre_imagen_4" /></td>
                                <td className="name-status">GOLD</td>
                                <td className="desc-status">300 to 499 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={platinum} alt="nombre_imagen_5" /></td>
                                <td className="name-status">PLATINUM</td>
                                <td className="desc-status">500 to 699 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={diamond} alt="nombre_imagen_6" /></td>
                                <td className="name-status">DIAMOND</td>
                                <td className="desc-status">700 to 999 points</td>
                            </tr>
                            <tr>
                                <td><img className="image-status" src={legendary} alt="nombre_imagen_7" /></td>
                                <td className="name-status">LEGENDARY</td>
                                <td className="desc-status">1000+ points</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StatusScore
