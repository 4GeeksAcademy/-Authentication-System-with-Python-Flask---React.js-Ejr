import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../pages/servicesWorkers/styles.css";
import Navbar from "../../components/navbar/index.jsx";
import BigContainer from "../../components/bigContainer/index.jsx";
import { listWorkers } from "../../service/workers";
import { listServicesByCompany } from "../../service/services";
import { createServiceWorker } from "../../service/service_worker";
import { toast } from "react-toastify";

const initialState = {
  worker: "",
  service: "",
};

const ServicesWorkers = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [serviceWorker, setServiceWorker] = useState(initialState);

  const navigate = useNavigate();
  const { company_id } = useParams();

  const getWorkers = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  const getServices = async () => {
    const services = await listServicesByCompany(company_id);
    setServicesList(services);
  };

  const handleChange = ({ target }) => {
    setServiceWorker({ ...serviceWorker, [target.name]: target.value });
  };

  const transformData = () => {
    const serviceID = servicesList.filter(
      (service) => service.name === serviceWorker.service
    )[0]?.id;
    const workerID = workersList.filter(
      (worker) => worker.user.username === serviceWorker.worker
    )[0]?.id;
    return {
      worker_id: workerID,
      service_id: serviceID,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await createServiceWorker(company_id, transformData());
    resMsg.data ? toast.success(resMsg?.msg) : toast.error(resMsg?.msg);
    navigate("/admin-dashboard");
  };

  useEffect(() => {
    getWorkers();
    getServices();
  }, []);

  return (
    <>
      <Navbar />
      <main className="main-container">
        <BigContainer>
          <h1>Assign Services to Workers</h1>
          <div className="dropdownContainer">
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <select name="worker" className="boxShadow">
                {workersList.map((op) => (
                  <option key={op.id}>{op.user.username}</option>
                ))}
              </select>
              <select name="service" className="boxShadow">
                {servicesList.map((op) => (
                  <option key={op.id}>{op.name}</option>
                ))}
              </select>
              <button type="submit" className="loginBtn boxShadow">
                Assign Service
              </button>
            </form>
          </div>
        </BigContainer>
      </main>
    </>
  );
};

export default ServicesWorkers;
