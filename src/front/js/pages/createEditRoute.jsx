import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import UploadFile from "../component/uploadFile.jsx";
import Accordion from "../component/accordion.jsx";
import { AddDay } from "../component/addDay.jsx";

export const CreateEditRoute = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  // const [formData, setFormData] = useState({
  //   title:'',
  //   descripcion:'',
  //   duracion: itinerary.length,
  //   images: [],
  //   itinerary: {dia1:[act1, act2], dia2:[], dia3:[]}

  // })

  return (
    <>
      <div className="row w-100 justify-content-center">
        <UploadFile />
        <AddDay />
      </div>
    </>
  );
};

CreateEditRoute.propTypes = {
  match: PropTypes.object,
};