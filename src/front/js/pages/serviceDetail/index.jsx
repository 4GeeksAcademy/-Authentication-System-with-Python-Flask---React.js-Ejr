import React, { useEffect, useState } from "react";
import { getSingleService } from "../../service/services.js";
import { useParams } from "react-router-dom";
import { ServiceDetailCard } from "../../components/serviceDetailCard/index.jsx";

export const ServiceDetail = () => {
  const [list, setList] = useState([]);
  const { serviceID } = useParams();

  const serviceDetailById = async () => {
    const serviceData = await getSingleService(serviceID);
    setList(serviceData);
  };
  useEffect(() => {
    serviceDetailById(serviceID);
  }, []);

  return (
    <>
      <ServiceDetailCard list={list} />
    </>
  );
};
