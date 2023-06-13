import React, { forwardRef } from "react";
import Input from "../input/index.jsx";
import styles from "./companyForm.module.css";
import Button from "../button/index.jsx";
import { yupResolver } from '@hookform/resolvers/yup';

import { companySchema } from "../../validations/companyValidation.js";

import { useForm } from "react-hook-form";

  const CompanyForm = ({ handleSubmit, handleChange, textBtn }) => {

  const { register, formState: { errors } } = useForm( {
    resolver: yupResolver(companySchema)
  });

  console.log(errors); 

  return (
  <form
    className={styles._form}
    onChange={handleChange}
    onSubmit={handleSubmit}
  >
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="Name"
      label="name"
      ref={null}
      {...register("name")}
    />
    <p>{errors.name?.message}</p>
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="text"
      placeholder="CIF"
      label="cif"
      ref={null}
      {...register("cif")}
    />
    <Input
      icon={<i className="fa-solid fa-circle-user"></i>}
      type="textarea"
      placeholder="Description"
      label="description"
      ref={null}
      {...register("description")}
    />
    <Input
      icon={<i className="fa-solid fa-envelope"></i>}
      type="text"
      placeholder="Address"
      label="address"
      ref={null}
      {...register("address")}
    />
    <Input
      icon={<i className="fa-solid fa-calendar-days"></i>}
      type="text"
      placeholder="Working Schedule"
      label="workingSchedule"
      ref={null}
      {...register("workingSchedule")}
    />
    <Button type="submit" title={textBtn}/>
  </form>
  )
}; 

export default CompanyForm;
