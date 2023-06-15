import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import Input from "../input/index.jsx";
import styles from "./companyForm.module.css";
import Button from "../button/index.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { companySchema } from "../../validations/companyValidation.js";
import { toast } from "react-toastify";

  const CompanyForm = ({ textBtn }) => {

    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const { register, handleSubmit, formState:{ errors } } = useForm({
      resolver: yupResolver(companySchema)
    }); 

    const onSubmit = (data) => {
      console.log(data);
      actions.saveCompanyData(data); 
      navigate("/company-register-2");
      //  need to show errors from back
    }; 

    return (
      <form className={styles._form} onSubmit={handleSubmit(onSubmit)}>
       <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Name"
        label="name"
        name="name"
        register={register}
      />
        {errors?.name && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.name?.message}
        </small>
      )}
        <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="CIF"
        label="cif"
        name="cif"
        register={register}
      />
       {errors?.cif && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.cif?.message}
        </small>
      )}
        <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Description"
        label="description"
        name="description"
        register={register}
      />
       {errors?.description && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.description?.message}
        </small>
      )}
        <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Address"
        label="address"
        name="address"
        register={register}
      />
        {errors?.address && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.address?.message}
        </small>
      )}
        <Input
        icon={<i className="fa-solid fa-circle-user"></i>}
        type="text"
        placeholder="Working Schedule"
        label="working_schedule"
        name="working_schedule"
        register={register}
      />
        {errors?.working_schedule && (
        <small className={styles._fail}>
          <i className="fa-solid fa-circle-exclamation"></i> {errors.working_schedule?.message}
        </small>
      )}
    <Button type="submit" title={textBtn}/>
  </form>
  )
}; 

export default CompanyForm; 
