import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteService,
  listServicesByCompany,
} from "../../service/services.js";

import styles from "./serviceList.module.css";

import Header from "../../components/header/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import ServiceCard from "../../components/serviceCard/index.jsx";
import Modal from "../../components/modal/index.jsx";
import Button from "../../components/button/index.jsx";
import DeleteToast from "../../components/deleteToast/index.jsx";

export const ListService = () => {
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const navigate = useNavigate();
  const { companyID } = useParams();

  const getList = async () => {
    const serviceList = await listServicesByCompany(companyID);
    setList(serviceList.filter((service) => service.is_active === true));
  };

  useEffect(() => {
    getList();
  }, []);

  const deleteFunction = async (service_id) => {
    const resMsg = await deleteService(service_id);
    await getList();
    resMsg.data // if data exists inside resMsg, then the object was successfully deleted.
      ? toast.success(resMsg?.msg)
      : toast.error(resMsg?.msg);
  };

  return (
    <>
      <Header />
      <main className={styles._mainContainer}>
        <BigContainer>
          <h1 className={styles._title}>List Services</h1>
          <div className={styles._servicesList}>
            {list.map((service) =>
              !service.is_active ? null : (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  setIsOpen={() => {
                    setSelectedService(service);
                    setIsOpen(true);
                  }}
                  handleDelete={() =>
                    toast.error(
                      <DeleteToast
                        msg="Delete this service?"
                        action={() => deleteFunction(service.id)}
                      />,
                      { autoClose: false }
                    )
                  }
                  navigate={() => navigate(`/update-service/${service.id}`)}
                />
              )
            )}
          </div>
        </BigContainer>
        <Modal
          title="Service Details"
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          selectedService={selectedService}
        >
          <div className={styles._modalContent}>
            <p>
              <strong>Name: </strong>
              {selectedService?.name}
            </p>
            <p>
              <strong>Price: </strong>
              {selectedService?.price}€
            </p>
            <p>
              <strong>Duration: </strong>
              {selectedService?.service_duration}min
            </p>
            <p>
              <strong>Description: </strong>
            </p>
            <p>{selectedService?.description}</p>
            <div className={styles._modalFooter}>
              <p>
                <strong>Do you want to update or delete this service?</strong>
              </p>
              <div className={styles._btnWrapper}>
                <Button
                  title="Update"
                  onClick={() =>
                    navigate(`/update-service/${selectedService?.id}`)
                  }
                />
                <Button
                  title="Delete"
                  onClick={() =>
                    toast.error(
                      <DeleteToast
                        msg="Delete this service?"
                        action={() => deleteFunction(selectedService?.id)}
                      />,
                      { autoClose: false }
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Modal>
      </main>
    </>
  );
};
