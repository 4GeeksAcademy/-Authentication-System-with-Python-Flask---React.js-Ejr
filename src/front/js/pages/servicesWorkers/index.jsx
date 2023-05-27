import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../pages/servicesWorkers/styles.css";
import BigContainer from "../../components/bigContainer/index.jsx";
import { listWorkers } from "../../service/workers";
import { listServices } from "../../service/service";
import { createServiceWorker } from "../../service/service_worker";
import Toast from "../../components/toast/index.jsx";
import { toast } from "react-toastify";

const initialState = {
  worker: "",
  service: "",
};

const ServicesWorkers = () => {
  const [workersList, setWorkersList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [serviceWorker, setServiceWorker] = useState(initialState);

  const { company_id } = useParams();

  const getWorkers = async () => {
    const workers = await listWorkers(company_id);
    setWorkersList(workers);
  };

  const getServices = async () => {
    const services = await listServices(company_id);
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
    await createServiceWorker(company_id, transformData());
  };

  useEffect(() => {
    getWorkers();
    getServices();
  }, []);

  const notify = () => toast("Service Assigned Succesfully!");

  return (
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
            <button
              type="submit"
              className="loginBtn boxShadow"
              onClick={notify}
            >
              Assign Service
            </button>
          </form>
        </div>
        <Toast />
      </BigContainer>
    </main>
  );
};

export default ServicesWorkers;
