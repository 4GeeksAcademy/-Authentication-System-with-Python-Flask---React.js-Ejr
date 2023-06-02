import React, { useState } from "react";
import Header from "../../components/header/index.jsx";
import Input from "../../components/input/index.jsx";
import "./styles.css";
import { createService } from "../../service/services.js";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  description: "",
  service_duration: "",
  price: "",
};

export const CreateService = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [newService, setNewService] = useState(initialState);

  const handleChange = ({ target }) => {
    setNewService({ ...newService, [target.name]: target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createService(params.companyID, newService);
    navigate(`/service-list/${params.companyID}`);
    setNewService(initialState);
  };

  return (
    <>
      <Header />
      <main className="mainContainerimg">
        <div className="parenttwo">
          <div className="childtwo">
            <div className="form-div">
              <h2 className="titleService">Create new service</h2>
              <form onChange={handleChange} onSubmit={handleSubmit}>
                <Input
                  icon={<i className="fa-solid fa-circle-user"></i>}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={newService.name}
                />
                <Input
                  icon={<i className="fa-solid fa-pen-to-square"></i>}
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={newService.description}
                />
                <Input
                  icon={<i className="fa-regular fa-clock"></i>}
                  type="text"
                  placeholder="Service duration"
                  name="service_duration"
                  value={newService.service_duration}
                />
                <Input
                  icon={<i className="fa-solid fa-coins"></i>}
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={newService.price}
                />
                <button type="submit" className="loginBtn boxShadow">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
