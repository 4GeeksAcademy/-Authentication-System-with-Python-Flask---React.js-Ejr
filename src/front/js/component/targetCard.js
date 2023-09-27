import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { ModalTarget } from "./modalTarget";


export const TargetCard = () => {
    const [perMonthTarget, setPerMonthTarget] = useState("");
    const [readTarget, setReadTarget] = useState("");
    const [statusTarget, setStatusTarget] = useState("");

    const updatePerMonthTarget = (newTarget) => {
        setPerMonthTarget(newTarget);
    };

    const updateReadTarget = (newTarget) => {
        setReadTarget(newTarget);
    };

    const updateStatusTarget = (newTarget) => {
        setStatusTarget(newTarget);
    };

    return (
        <div className="d-flex flex-column ">
            <h2 className="my-4">Targets</h2>
            <h3 className="title">
                <i className="fas fa-chart-line" style={{ marginRight: '15px' }}></i>Per month<button type="button" className="edit-bio" data-bs-toggle="modal" data-bs-target="#perMonthModal"><i class="fas fa-plus fa-xs"></i></button>
            </h3>
            <ModalTarget target={perMonthTarget} updateTarget={updatePerMonthTarget} modalId="perMonthModal" />
            <table className="table table-sm" style={{ width: "15rem" }}>
                <tbody>
                    <tr>
                        <th scope="row">Per Month</th>
                        <td>{perMonthTarget}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className="title">
                <i className="fas fa-book" style={{ marginRight: '15px' }}></i>Read<button type="button" className="edit-bio" data-bs-toggle="modal" data-bs-target="#readModal"><i class="fas fa-plus fa-xs"></i></button>
            </h3>
            <ModalTarget target={readTarget} updateTarget={updateReadTarget} modalId="readModal" />
            <table className="table table-sm" style={{ width: "15rem" }}>
                <tbody>
                    <tr>
                        <th scope="row">Read</th>
                        <td>{readTarget}</td>
                    </tr>
                </tbody>
            </table>

            <h3 className="title">
                <i className="fas fa-percentage" style={{ marginRight: '15px' }}></i>Status<button type="button" className="edit-bio" data-bs-toggle="modal" data-bs-target="#statusModal"><i class="fas fa-plus fa-xs"></i></button>
            </h3>
            <ModalTarget target={statusTarget} updateTarget={updateStatusTarget} modalId="statusModal" />
            <table className="table table-sm" style={{ width: "15rem" }}>
                <tbody>
                    <tr>
                        <th scope="row">Status</th>
                        <td>{statusTarget}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

