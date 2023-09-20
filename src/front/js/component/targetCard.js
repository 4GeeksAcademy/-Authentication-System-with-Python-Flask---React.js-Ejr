import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const TargetCard = () => {
    return (
        <div className="d-flex flex-column ">
            <h3 className="title">
                <i className="fas fa-chart-line" style={{ marginRight: '15px' }}></i>Targets
            </h3>
            <table className="table table-sm" style={{ width: "15rem" }}>
                <tbody>
                    <tr>
                        <th scope="row">Per Month</th>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th scope="row">Read</th>
                        <td>2</td>
                    </tr>
                    <tr>
                        <th scope="row">Status</th>
                        <td>50%</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

