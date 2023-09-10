import React from "react";

function MyTableComponent() {
  return (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                alt=""
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle"
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Equipo juvenil</p>
                <p className="text-muted mb-0">Colombia</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Colombia</p>
          </td>
          <td>
            13/11/2023
          </td>
          <td>$75</td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              Edit
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                className="rounded-circle"
                alt=""
                style={{ width: '45px', height: '45px' }}
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Equipo varonil 3</p>
                <p className="text-muted mb-0">Nevada</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Las vegas</p>
          </td>
          <td>
            <p>13/11/2024</p>
          </td>
          <td>$50</td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              Edit
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <img
                src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                className="rounded-circle"
                alt=""
                style={{ width: '45px', height: '45px' }}
              />
              <div className="ms-3">
                <p className="fw-bold mb-1">Equipo campeones</p>
                <p className="text-muted mb-0">San José</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">Costa Rica</p>
          </td>
          <td>
            <p>13/11/2025</p>
          </td>
          <td>$80</td>
          <td>
            <button type="button" className="btn btn-link btn-sm btn-rounded">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MyTableComponent;
