import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInfoCompanyById, updateCompany } from "../../service/company";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./updateCompany.module.css";

import BigContainer from "../../components/bigContainer/index.jsx";
import Input from "../../components/input/index.jsx";
import Button from "../../components/button/index.jsx";
import Spinner from "../../components/spinner/index.jsx";

const initalState = {
  name: "",
  cif: "",
  description: "",
  address: "",
  working_schedule: "",
};

const UpdateCompany = () => {
  const [updatedCompany, setUpdatedCompany] = useState(initalState);
  const [isLoading, setIsLoading] = useState(false);

  const { company_id } = useParams();

  const responseToast = (msg) => toast(msg);

  const getCompany = async () => {
    const company = await getInfoCompanyById(company_id);
    setUpdatedCompany(company);
  };

  useEffect(() => {
    getCompany(company_id);
  }, []);

  const handleChange = ({ target }) => {
    setUpdatedCompany({ ...updatedCompany, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await updateCompany(company_id, updatedCompany);
    console.log("updated company --->", data);
    setIsLoading(false);
    responseToast(data.msg);
  };

  return (
    <div className={styles._mainContainer}>
      <BigContainer>
        <h1>Update Company</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className={styles._form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <Input
              icon={<i className="fa-solid fa-circle-user"></i>}
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={updatedCompany.name}
            />
            <Input
              icon={<i className="fa-solid fa-circle-user"></i>}
              type="text"
              placeholder="CIF"
              name="cif"
              defaultValue={updatedCompany.cif}
              disabled
            />
            <Input
              icon={<i className="fa-solid fa-circle-user"></i>}
              type="textarea"
              placeholder="Description"
              name="description"
              defaultValue={updatedCompany.description}
            />
            <Input
              icon={<i className="fa-solid fa-envelope"></i>}
              type="text"
              placeholder="Address"
              name="address"
              defaultValue={updatedCompany.address}
            />
            <Input
              icon={<i className="fa-solid fa-calendar-days"></i>}
              type="text"
              placeholder="Working Schedule"
              name="working_schedule"
              defaultValue={updatedCompany.working_schedule}
            />
            <Button type="submit" title="Update" />
          </form>
        )}
      </BigContainer>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default UpdateCompany;
