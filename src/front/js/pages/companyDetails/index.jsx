import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInfoCompanyById } from "../../service/company";
import { getServicesbyWorker } from "../../service/service_worker";
import Logotipo from "../../components/logotipo/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import Avatar from "../../components/avatar/index.jsx";

import styles from "./company-details.module.css";
import Button from "../../components/button/index.jsx";
import BtnService from "../../components/btnService/index.jsx";
import ModalCompany from "../../components/modalCompany/index.jsx";
import Spinner from "../../components/spinner/index.jsx"

const initialState = {
  user: {
    avatar: "",
    firstname: "",
    lastname: "",
  },
};

const CompanyDetails = () => {
  const [company, setCompany] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [selectedWorker, setSelectedWorker] = useState(initialState);
  const [workerServices, setWorkerServices] = useState([]);

  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isWorkerModalOpen, setWorkerModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { companyId } = useParams();

  const navigate = useNavigate();

  const getCompany = async (companyId) => {
    setLoading(true)
    const data = await getInfoCompanyById(companyId);
    setCompany(data);
    setLoading(false)
  };

  const getServiceByWorkerId = async (worker_id) => {
    setLoading(true)
    const data = await getServicesbyWorker(worker_id);
    setWorkerServices(data);
    setLoading(false)
  };

  useEffect(() => {
    getCompany(companyId);
    if (selectedWorker.id) {
    getServiceByWorkerId(selectedWorker.id);
    }
  }, [companyId, selectedWorker]);
  
  return (
    <div className={styles._mainContainer}> 
      {loading ? (<Spinner/>): (<>
          <Logotipo className={styles._logo} />
          <div className={styles._btnWrapper}>
            <Button
              type="button"
              title="Booking now"
              onClick={() => navigate(`/create-booking/${companyId}`)}
            />
          </div>
      <BigContainer>
          <h1>{company?.name}</h1>
          <article className={styles._contentContainer}>
            <div className={styles._servicesContainer}>
              <span className={styles._serviceTitle}>Services:</span>
              <div className={`${styles._smallContainer} _boxShadow`}>
                {company?.services?.map((service) => (
                  <BtnService
                    key={service.id}
                    name={service?.name}
                    setIsOpen={() => {
                      setSelectedService(service);
                      setServiceModalOpen(true);
                    }}
                  ></BtnService>
                ))}
              </div>
            </div>
            <div className={styles._infoContainer}>
                <div className={styles._row}>
                  <span>Name:</span>
                  <p>{company?.name}</p>
                </div>
                <div className={styles._row}>
                  <span>CIF:</span>
                  <p>{company?.cif}</p>
                </div>
                <div className={styles._row}>
                  <span>Description:</span>
                  <p>{company?.description}</p>
                </div>
                <div className={styles._row}>
                  <span>Address:</span>
                  <p>{company?.address}</p>
                </div>
                <div className={styles._row}>
                  <span>Opening:</span>
                  <p>{company?.working_schedule}</p>
                </div>
              <div className={styles._workers}>
                <span>Workers:</span>
                <div className={styles._workersImagesContainer}>
                  {company.workers?.map((worker) => (
                    <div className={styles._workerImg} key={worker.id}>
                      <Avatar
                        url={worker?.user?.avatar}
                        onClick={() => {
                          setSelectedWorker(worker);
                          setWorkerModalOpen(true);
                        }}
                      ></Avatar>
                      <p>{worker?.user?.username}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
      </BigContainer>
      
        <ModalCompany
          title="Service Details"
          isOpen={isServiceModalOpen}
          close={() => setServiceModalOpen(false)}
          selectedService={selectedService}
        >
          <div className={styles._modalContent}>
              <div className={styles._textModal}>
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
              </div>
            <footer className={styles._modalFooter}>
                <p>
                  <strong>Do you want to appointment with this service?</strong>
                </p>
                <div className={styles._btnWrapperdiv}>
                  <Button
                    type="button"
                    title="Booking now"
                    onClick={() => navigate(`/create-booking/${companyId}`)}
                  />
                </div>
            </footer>
          </div>
        </ModalCompany>

        <ModalCompany
          title="Worker Details"
          isOpen={isWorkerModalOpen}
          close={() => setWorkerModalOpen(false)}
          selectedWorker={selectedWorker}
        >
          <div className={styles._modalContent}>
                <Avatar
                  url={selectedWorker?.user?.avatar}
                ></Avatar>
                <strong>
                  {`${selectedWorker?.user?.firstname} ${selectedWorker?.user?.lastname}`}
                </strong>
                <div className={styles._service}>
                  <p>
                    <strong>Services: </strong>
                  </p>
                  {workerServices?.map((service) => (
                  <p key={service.id}>{service.services.name}</p>
                ))}
                </div>
                <footer className={styles._modalFooter}>
                  <p>
                    <strong>
                      Do you want to make an appointment with{" "}
                      {selectedWorker?.user?.firstname}?
                    </strong>
                  </p>
                  <div className={styles._btnWrapperdiv}>
                    <Button
                      type="button"
                      title="Booking now"
                      onClick={() => navigate(`/create-booking/${companyId}`)}
                    />
                  </div>
                </footer>
          </div>
        </ModalCompany>
      </>)}
    </div>
  );
};  

export default CompanyDetails;